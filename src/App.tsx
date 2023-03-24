import Navbar from "features/navigation/components/navbar/navbar.component";
import Landing from "features/landing/components/landing.component";
import WeatherForecastList from "./features/weatherForecast/components/weatherForecastList.component";
import WeatherForecastDetails from "features/weatherForecastDetails/components/weatherForecastDetails.component";

function App() {
	return (
		<div className="text-white-1 bg-black-3">
			<Navbar />
			<div className="h-[calc(100vh-32px)] overflow-overlay custom-scroll">
				<Landing />
				<WeatherForecastList />
				<WeatherForecastDetails />
			</div>
		</div>
	);
}

export default App;
