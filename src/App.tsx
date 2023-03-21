import Navbar from "features/navigation/components/navbar.component";
import WeatherForecastList from "./features/weatherForecast/components/weatherForecastList.component";
import Overlay from "features/overlay/components/overlay.component";

function App() {
	return (
		<main className="h-screen w-screen p-4 flex flex-col gap-4 justify-end">
			<Overlay />
			<Navbar />
			<WeatherForecastList />
		</main>
	);
}

export default App;
