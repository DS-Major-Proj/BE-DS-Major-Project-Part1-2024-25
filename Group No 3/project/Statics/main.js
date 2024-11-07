const editor = grapesjs.init({
    container: '#editor',
    height: '100vh',
    width: 'auto',
    fromElement: true,
    storageManager: false,
    blockManager: {
        appendTo: '#blocks',
        blocks: [
            {
                id: 'section',
                label: '<b style="color: black;">Section</b>', // Black label text
                attributes: { class: 'gjs-block-section' },
                content: `<section style="padding: 20px;">
                            <h1>Section Title</h1>
                            <p>This is a section block</p>
                          </section>`,
                category: 'Basic',
                render: ({ el }) => {
                    el.style.backgroundColor = '#FADADD'; // Pastel pink background for the whole block
                    el.style.padding = '10px';
                    el.style.borderRadius = '5px';
                },
            },
            {
                id: 'text',
                label: '<span style="color: black;">Text</span>', // Black label text
                attributes: { class: 'gjs-block-text' },
                content: '<div style="padding: 10px;">Insert your text here</div>',
                category: 'Basic',
                render: ({ el }) => {
                    el.style.backgroundColor = '#F5F5DC'; // Pastel beige background for the whole block
                    el.style.padding = '10px';
                    el.style.borderRadius = '5px';
                },
            },
            {
                id: 'image',
                label: '<span style="color: black;">Image</span>', // Black label text
                attributes: { class: 'gjs-block-image' },
                content: { type: 'image', src: 'https://via.placeholder.com/150' },
                category: 'Media',
                render: ({ el }) => {
                    el.style.backgroundColor = '#FFB6C1'; // Pastel pink background for the whole block
                    el.style.padding = '10px';
                    el.style.borderRadius = '5px';
                },
            },
            {
                id: 'video',
                label: '<span style="color: black;">Video</span>', // Black label text
                attributes: { class: 'gjs-block-video' },
                content: {
                    type: 'video',
                    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
                },
                category: 'Media',
                render: ({ el }) => {
                    el.style.backgroundColor = '#ADD8E6'; // Pastel blue background for the whole block
                    el.style.padding = '10px';
                    el.style.borderRadius = '5px';
                },
            },
            {
                id: 'button',
                label: '<span style="color: black;">Button</span>', // Black label text
                attributes: { class: 'gjs-block-button' },
                content: '<button style="padding: 10px; background: #007bff; color: #fff;">Button</button>',
                category: 'Basic',
                render: ({ el }) => {
                    el.style.backgroundColor = '#FFCCCB'; // Pastel red background for the whole block
                    el.style.padding = '10px';
                    el.style.borderRadius = '5px';
                },
            },
            {
                id: 'link',
                label: '<span style="color: black;">Link</span>', // Black label text
                attributes: { class: 'gjs-block-link' },
                content: '<a href="#" style="color: blue;">Click here</a>',
                category: 'Basic',
                render: ({ el }) => {
                    el.style.backgroundColor = '#F0E68C'; // Pastel yellow background for the whole block
                    el.style.padding = '10px';
                    el.style.borderRadius = '5px';
                },
            },
            {
                id: 'list',
                label: '<span style="color: black;">List</span>', // Black label text
                attributes: { class: 'gjs-block-list' },
                content: '<ul><li>List Item 1</li><li>List Item 2</li></ul>',
                category: 'Basic',
                render: ({ el }) => {
                    el.style.backgroundColor = '#E6E6FA'; // Pastel purple background for the whole block
                    el.style.padding = '10px';
                    el.style.borderRadius = '5px';
                },
            },
            {
                id: 'form',
                label: '<span style="color: black;">Form</span>', // Black label text
                attributes: { class: 'gjs-block-form' },
                content: '<form><input type="text" placeholder="Your Name" style="width: 100%; margin-bottom: 10px;"/><button type="submit" style="width: 100%;">Submit</button></form>',
                category: 'Basic',
                render: ({ el }) => {
                    el.style.backgroundColor = '#E0FFFF'; // Pastel cyan background for the whole block
                    el.style.padding = '10px';
                    el.style.borderRadius = '5px';
                },
            },
            {
                id: 'input',
                label: '<span style="color: black;">Input</span>',
                attributes: { class: 'gjs-block-input' },
                content: '<input type="text" placeholder="Input field">',
                category: 'Interactive',
                render: ({ el }) => {
                    el.style.backgroundColor = '#F7F7F7';
                    el.style.padding = '10px';
                    el.style.borderRadius = '5px';
                },

            },
        ],
    },
});

// Event listeners for undo/redo/preview/clear
document.getElementById('undo').addEventListener('click', () => editor.UndoManager.undo());
document.getElementById('redo').addEventListener('click', () => editor.UndoManager.redo());
document.getElementById('preview').addEventListener('click', () => editor.runCommand('sw-visibility'));
document.getElementById('clear').addEventListener('click', () => editor.DomComponents.clear());

document.getElementById('templateUpload').addEventListener('change', (event) => {
    const files = event.target.files;
    if (files.length > 0) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            editor.setComponents(content);
        };
        reader.readAsText(files[0]); // Assuming a single file upload
    }
});
