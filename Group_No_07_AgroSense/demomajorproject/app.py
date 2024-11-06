from flask import Flask, render_template, request, redirect, url_for
import matplotlib.pyplot as plt
app = Flask(__name__)

class AgricultureWaterFootprint:
    def __init__(self, crop, area, blue_cwr, green_cwr, pollution_load, irrigation_efficiency, growing_period):
        """
        Initialize the water footprint calculator for agriculture.
        """
        self.crop = crop
        self.area = area  # in hectares
        self.blue_cwr = blue_cwr  # in mm/day
        self.green_cwr = green_cwr  # in mm/day
        self.pollution_load = pollution_load  # in kg/ha/day (pollutants like fertilizers)
        self.irrigation_efficiency = irrigation_efficiency  # between 0 and 1
        self.growing_period = growing_period  # in days

    def calculate_blue_water_footprint(self):
        """
        Calculate the blue water footprint (irrigation water).
        """
        blue_cwr_meters = self.blue_cwr * 0.001  # Convert from mm to meters
        daily_blue_water_requirement = blue_cwr_meters * self.area * 10000
        total_blue_water = daily_blue_water_requirement * self.growing_period
        actual_blue_water_used = total_blue_water / self.irrigation_efficiency
        return actual_blue_water_used

    def calculate_green_water_footprint(self):
        """
        Calculate the green water footprint (rainwater).
        """
        green_cwr_meters = self.green_cwr * 0.001  # Convert from mm to meters
        daily_green_water_requirement = green_cwr_meters * self.area * 10000
        total_green_water = daily_green_water_requirement * self.growing_period
        return total_green_water

    def calculate_gray_water_footprint(self):
        """
        Calculate the gray water footprint (water required to dilute pollutants).
        """
        max_acceptable_concentration = 10  # Example: standard limit (kg/m³)
        natural_concentration = 0
        dilution_factor = max_acceptable_concentration - natural_concentration
        total_pollution_load = self.pollution_load * self.area * self.growing_period
        gray_water_footprint = total_pollution_load / dilution_factor
        return gray_water_footprint


# Route for the home page
@app.route('/')
def home():
    return render_template('home.html')


# Route for the login page
@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if username == "admin" and password == "password":
            return redirect(url_for('dashboard'))
        else:
            error = "Invalid credentials. Please try again."
    return render_template('login.html', error=error)


# Route for the dashboard page
@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')


# Route for the water footprint page
@app.route('/water_footprint_page', methods=['GET', 'POST'])
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

        labels = ['Blue Water Footprint', 'Green Water Footprint', 'Gray Water Footprint']
        sizes = [
            footprint_results['Blue Water Footprint'],
            footprint_results['Green Water Footprint'],
            footprint_results['Gray Water Footprint']
        ]
        colors = ['#3498db', '#2ecc71', '#95a5a6']

        # Plot the pie chart
        fig, ax = plt.subplots()
        ax.pie(sizes, labels=labels, colors=colors, autopct='%1.1f%%', startangle=90, wedgeprops={'edgecolor': 'white'})
        ax.axis('equal')  # Equal aspect ratio ensures that pie is drawn as a circle.

        # Display pie chart
        st.pyplot(fig)
    return render_template('water_footprint_form.html')  # GET request returns the input form


@app.route('/weed_detection')
def weed_detection():
    return "Weed Detection Page"  # Placeholder for actual functionality


@app.route('/soil_moisture')
def soil_moisture():
    return "Soil Moisture Page"  # Placeholder for actual functionality


@app.route('/unwanted_plant_detection')
def unwanted_plant_detection():
    return "Soil moisture and Climate Humidity"  # Placeholder for actual functionality


if __name__ == '__main__':
    app.run(debug=True)
