import pandas as pd
import numpy as np
import cv2
from iou_calculation import iou_calc
import os

# Custom function to generate region proposals
def selective_search(img, mode='fast'):
    ss = cv2.ximgproc.segmentation.createSelectiveSearchSegmentation()
    ss.setBaseImage(img)
    
    # Choose between 'fast' and 'quality' modes
    if mode == 'fast':
        ss.switchToSelectiveSearchFast()
    elif mode == 'quality':
        ss.switchToSelectiveSearchQuality()
    
    # Perform selective search
    rects = ss.process()
    return rects

def iou_filter(image_path, true_bb, thresh=0.5, mode='fast'):
    '''
    arguments:
    1. image_path: path of images 
    2. true_bb: true labeled dataframe of image columns = ['filename','width','height','class','xmin','ymin','xmax','ymax']
    3. thresh: threshold value for intersection over union (iou), by default 0.5
    4. mode: 'fast' for quicker region proposals, 'quality' for higher quality proposals
    
    returns:
    filtered_selective_search: regions with iou higher than threshold value of given image and class of that object
    negative_example: regions with iou less than threshold value and not conflicting with other object regions
    '''
    
    # Get the image name from the path
    img_name = os.path.basename(image_path)
    
    # Get bounding box data for the current image
    img_bb = true_bb[true_bb['filename'] == img_name].reset_index(drop=True)
    
    # Read the image
    img = cv2.imread(image_path)
    if img is None:
        raise ValueError(f"Image at path {image_path} could not be read.")
    
    # Get the region proposals using selective search
    rects = selective_search(img, mode=mode)
    
    # Limit the number of region proposals
    ss_bb = rects[:2000]
    
    filtered_selective_search = []
    negative_examples = []
    maybe_negative = []

    # Loop through each labeled object in the image
    for label in range(len(img_bb)):
        # Unpack coordinates
        true_xmin = img_bb.loc[label, 'xmin']
        true_ymin = img_bb.loc[label, 'ymin']
        true_width = img_bb.loc[label, 'xmax'] - true_xmin
        true_height = img_bb.loc[label, 'ymax'] - true_ymin
        class_of_label = img_bb.loc[label, 'class']
        
        # Loop through selective search regions
        for rect in ss_bb:
            iou_value = iou_calc([true_xmin, true_ymin, true_width, true_height], rect)
            
            if iou_value > thresh:
                filtered_selective_search.append([list(rect), class_of_label])
            elif iou_value < 0.2:
                maybe_negative.append(list(rect))
    
    # Remove duplicate entries
    def remove_duplicates(duplicate):
        return list(set(map(tuple, duplicate)))

    maybe_negative = remove_duplicates(maybe_negative)
    filtered_selective_search = remove_duplicates(filtered_selective_search)
    
    # Extract only the bounding box part from filtered regions
    only_labels_of_filtered_selective_search = [x[0] for x in filtered_selective_search]

    # Filter out negative examples that do not overlap with any labeled object
    for lab in maybe_negative:
        condition = all(iou_calc(true_lab, lab) <= 0.2 for true_lab in only_labels_of_filtered_selective_search)
        
        if condition:
            negative_examples.append(lab)
    
    negative_examples = remove_duplicates(negative_examples)
    
    # Randomly sample negative examples to balance with the positive examples
    random_background_images_index = np.random.randint(
        low=0, 
        high=len(negative_examples), 
        size=2 * len(only_labels_of_filtered_selective_search)
    )
    random_background_images = [negative_examples[x] for x in random_background_images_index]

    return filtered_selective_search, remove_duplicates(random_background_images)
