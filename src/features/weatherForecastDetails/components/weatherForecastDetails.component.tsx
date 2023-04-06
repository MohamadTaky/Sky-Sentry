import useWeatherForecastQuery from "features/weatherForecast/hooks/useWeatherForecastQuery.hook";
import useMeasure from "react-use-measure";
import { format, parseISO } from "date-fns";
import { useSearchParams } from "react-router-dom";
import LineChart from "./lineChart.compoent";
import SearchParamLink from "components/searchParamLink";
import { motion } from "framer-motion";

export default function WeatherForecastDetails() {
	const { data } = useWeatherForecastQuery();
	const [searchParams] = useSearchParams();
	const [ref, bounds] = useMeasure();
	const selectedDay = +(searchParams.get("day") ?? 0);
	const selectedChart =
		searchParams.get("chart")?.replace(/(\w+)-(\w)/, (_, b: string, c: string) => b + c.toUpperCase()) ??
		"temperature";

	return (
		<section className="bg-black-1 h-screen p-4 relative">
			<div className="relative h-full w-11/12 mx-auto flex flex-col gap-2">
				<nav className="flex justify-between gap-2">
					{data?.daily.map((day, i) => (
						<motion.div
							key={`day${i}`}
							animate={{
								color: selectedDay === i ? "#675ce4" : "#fff",
								translateY: selectedDay === i ? -7 : 0,
							}}>
							<SearchParamLink className="" param={`day=${i}`}>
								{format(parseISO(day.time), "eee")}
							</SearchParamLink>
						</motion.div>
					))}
				</nav>
				<nav className="flex justify-between gap-2 text-xs md:text-base">
					<motion.div
						animate={{
							color: selectedChart === "temperature" ? "#675ce4" : "#fff",
							translateY: selectedChart === "temperature" ? -7 : 0,
						}}>
						<SearchParamLink param="chart=temperature">temperature</SearchParamLink>
					</motion.div>
					<motion.div
						animate={{
							color: selectedChart === "cloudCover" ? "#675ce4" : "#fff",
							translateY: selectedChart === "cloudCover" ? -7 : 0,
						}}>
						<SearchParamLink param="chart=cloud-cover">cloud cover</SearchParamLink>
					</motion.div>
					<motion.div
						animate={{
							color: selectedChart === "windSpeed" ? "#675ce4" : "#fff",
							translateY: selectedChart === "windSpeed" ? -7 : 0,
						}}>
						<SearchParamLink param="chart=wind-speed">wind speed</SearchParamLink>
					</motion.div>
					<motion.div
						animate={{
							color: selectedChart === "humidity" ? "#675ce4" : "#fff",
							translateY: selectedChart === "humidity" ? -7 : 0,
						}}>
						<SearchParamLink param="chart=humidity">humidity</SearchParamLink>
					</motion.div>
				</nav>
				<figure className="grow relative" ref={ref}>
					<LineChart
						width={bounds.width > 768 ? bounds.width : 800}
						height={bounds.height}
						timezone={data?.timezone}
						data={{
							hourly: data?.hourly[selectedDay].map((hour: Record<string, any>) => ({
								value: hour[selectedChart],
								time: parseISO(hour.time),
							})) as {
								time: Date;
								value: number;
							}[],
							sunrise: parseISO(data?.daily[selectedDay].sunrise),
							sunset: parseISO(data?.daily[selectedDay].sunset),
						}}
					/>
				</figure>
			</div>
		</section>
	);
}
