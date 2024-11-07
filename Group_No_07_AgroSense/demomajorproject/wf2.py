@app.route('/water_footprint', methods=['GET', 'POST'])
def water_footprint():
    if request.method == 'POST':
        crop = request.form['crop']
        area = float(request.form['area'])
        blue_cwr = float(request.form['blue_cwr'])
        green_cwr = float(request.form['green_cwr'])
        pollution_load = float(request.form['pollution_load'])
        irrigation_efficiency = float(request.form['irrigation_efficiency'])
        growing_period = int(request.form['growing_period'])

        # Create an instance of AgricultureWaterFootprint
        water_footprint_calculator = AgricultureWaterFootprint(
            crop, area, blue_cwr, green_cwr, pollution_load, irrigation_efficiency, growing_period
        )

        # Calculate footprints
        blue_footprint = water_footprint_calculator.calculate_blue_water_footprint()
        green_footprint = water_footprint_calculator.calculate_green_water_footprint()
        gray_footprint = water_footprint_calculator.calculate_gray_water_footprint()
        total_footprint = blue_footprint + green_footprint + gray_footprint

        # Render the results on a new template
        return render_template('water_footprint_result.html',
                               crop=crop,
                               area=area,
                               blue_footprint=blue_footprint,
                               green_footprint=green_footprint,
                               gray_footprint=gray_footprint,
                               total_footprint=total_footprint)

    return render_template('water_footprint.html')  # GET request returns the input form
