import Navbar from "features/navigation/components/navbar.component";
import WeatherForecastList from "./features/weatherForecast/components/weatherForecastList.component";

function App() {
	return (
		<div className="flex flex-col h-screen bg-dark-black">
			<div className="mt-auto"></div>
			<Navbar />
			<WeatherForecastList />
		</div>
	);
}

export default App;
