import Landing from "features/landing/components/landing.component";
import WeatherForecastList from "./features/weatherForecast/components/weatherForecastList.component";
import WeatherForecastDetails from "features/weatherForecastDetails/components/weatherForecastDetails.component";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import CitiesSearchList from "features/navigation/components/citySearchList/citiesSearchList.component";

function App() {
	const [searchParams] = useSearchParams();
	return (
		<div style={{ WebkitTapHighlightColor: "transparent" }}>
			<AnimatePresence>{searchParams.get("searching") === "true" && <CitiesSearchList />}</AnimatePresence>
			<Landing />
			<WeatherForecastList />
			<WeatherForecastDetails />
		</div>
	);
}

export default App;
