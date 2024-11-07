import streamlit as st

def load_css():
    with open("style.css") as f:
        st.markdown(f"<style>{f.read()}</style>", unsafe_allow_html=True)
class AgricultureWaterFootprint:
    def __init__(self, crop, area, blue_cwr, green_cwr, pollution_load, irrigation_efficiency, growing_period):
        """
        Initialize the water footprint calculator for agriculture.

        :param crop: Name of the crop (string)
        :param area: Area of land (in hectares)
        :param blue_cwr: Blue Water Requirement (mm/day)
        :param green_cwr: Green Water Requirement (mm/day)
        :param pollution_load: Pollution load for gray water footprint (kg/ha/day)
        :param irrigation_efficiency: Irrigation Efficiency (between 0 and 1)
        :param growing_period: Growing period in days (int)
        """
        self.crop = crop
        self.area = area  # in hectares
        self.blue_cwr = blue_cwr  # in mm/day
        self.green_cwr = green_cwr  # in mm/day
        self.pollution_load = pollution_load  # in kg/ha/day (pollutants like fertilizers)
        self.irrigation_efficiency = irrigation_efficiency  # between 0 and 1
        self.growing_period = growing_period  # in days

    def calculate_blue_water_footprint(self):
        """Calculate the blue water footprint (irrigation water)."""
        blue_cwr_meters = self.blue_cwr * 0.001  # Convert from mm to meters
        daily_blue_water_requirement = blue_cwr_meters * self.area * 10000
        total_blue_water = daily_blue_water_requirement * self.growing_period
        actual_blue_water_used = total_blue_water / self.irrigation_efficiency
        return actual_blue_water_used

    def calculate_green_water_footprint(self):
        """Calculate the green water footprint (rainwater)."""
        green_cwr_meters = self.green_cwr * 0.001  # Convert from mm to meters
        daily_green_water_requirement = green_cwr_meters * self.area * 10000
        total_green_water = daily_green_water_requirement * self.growing_period
        return total_green_water

    def calculate_gray_water_footprint(self):
        """Calculate the gray water footprint (water required to dilute pollutants)."""
        max_acceptable_concentration = 10  # Example: standard limit (kg/m³)
        natural_concentration = 0  # Assume natural concentration is 0 for simplicity
        dilution_factor = max_acceptable_concentration - natural_concentration

        total_pollution_load = self.pollution_load * self.area * self.growing_period
        gray_water_footprint = total_pollution_load / dilution_factor
        return gray_water_footprint

    def display_footprint(self):
        """Display the water footprint for the crop (blue, green, and gray)."""
        blue_footprint = self.calculate_blue_water_footprint()
        green_footprint = self.calculate_green_water_footprint()
        gray_footprint = self.calculate_gray_water_footprint()

        total_footprint = blue_footprint + green_footprint + gray_footprint

        return {
            "Blue Water Footprint": blue_footprint,
            "Green Water Footprint": green_footprint,
            "Gray Water Footprint": gray_footprint,
            "Total Water Footprint": total_footprint
        }


# Streamlit interface
def main():
    st.title("Water Footprint Calculator")

    # Collect inputs
    crop = st.text_input("Enter the name of the crop:")
    area = st.number_input("Enter the area of land in hectares:", min_value=0.0, step=0.1)
    blue_cwr = st.number_input("Enter the blue water requirement (CWR) in mm/day:", min_value=0.0, step=0.1)
    green_cwr = st.number_input("Enter the green water requirement (CWR) in mm/day:", min_value=0.0, step=0.1)
    pollution_load = st.number_input("Enter the pollution load (kg/ha/day):", min_value=0.0, step=0.1)
    irrigation_efficiency = st.number_input("Enter the irrigation efficiency (between 0 and 1):", min_value=0.0,
                                            max_value=1.0, step=0.01)
    growing_period = st.number_input("Enter the growing period in days:", min_value=1, step=1)

    if st.button("Calculate Water Footprint"):
        # Create an instance of AgricultureWaterFootprint
        water_footprint = AgricultureWaterFootprint(crop, area, blue_cwr, green_cwr, pollution_load,
                                                    irrigation_efficiency, growing_period)

        # Calculate and display the results
        footprint_results = water_footprint.display_footprint()

        st.markdown(f"### Water footprint for **{crop}** on **{area}** hectares of land:")
        st.markdown(f"- **Blue Water Footprint**: {footprint_results['Blue Water Footprint']:.2f} cubic meters")
        st.markdown(f"- **Green Water Footprint**: {footprint_results['Green Water Footprint']:.2f} cubic meters")
        st.markdown(f"- **Gray Water Footprint**: {footprint_results['Gray Water Footprint']:.2f} cubic meters")
        st.markdown(f"- **Total Water Footprint**: {footprint_results['Total Water Footprint']:.2f} cubic meters")


if __name__ == "__main__":
    main()
