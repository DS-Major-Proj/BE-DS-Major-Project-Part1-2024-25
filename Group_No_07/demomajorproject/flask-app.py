from flask import Flask, render_template, request
from water import AgricultureWaterFootprint

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        crop = request.form.get('crop')
        area = float(request.form.get('area'))
        cwr = float(request.form.get('cwr'))
        irrigation_efficiency = float(request.form.get('irrigation_efficiency'))
        growing_period = int(request.form.get('growing_period'))

        # Create an instance of AgricultureWaterFootprint
        water_footprint = AgricultureWaterFootprint(crop, area, cwr, irrigation_efficiency, growing_period)
        result = water_footprint.calculate_water_footprint()

        return render_template('result.html', crop=crop, area=area, footprint=result)

    return render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True)
