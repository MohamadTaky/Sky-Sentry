import useWeatherForecastQuery from "features/weatherForecast/hooks/useWeatherForecastQuery.hook";
import useMeasure from "react-use-measure";
import * as d3 from "d3";
import { format, getTime, parseISO } from "date-fns";
import { useSearchParams } from "react-router-dom";

export default function WeatherForecastDetails() {
	const { data, isLoading } = useWeatherForecastQuery();
	const [searchParams] = useSearchParams();
	const [ref, bounds] = useMeasure();
	const selectedDay = +(searchParams.get("day") ?? 0);

	if (isLoading) return <></>;

	return (
		<div className="h-[calc(100%-2rem)] m-4 p-4 bg-black-2 rounded-md relative">
			<div className="h-full overflow-hidden overflow-x-auto custom-scroll" ref={ref}>
				<LineChart
					width={bounds.width > 768 ? bounds.width : 800}
					height={bounds.height}
					data={{
						hourly: data?.hourly[selectedDay].map(hour => ({
							...hour,
							time: parseISO(hour.time),
						})) as {
							time: Date;
							temperature: number;
						}[],
						sunrise: parseISO(data?.daily[selectedDay].sunrise),
						sunset: parseISO(data?.daily[selectedDay].sunset),
					}}
				/>
			</div>
		</div>
	);
}

interface ILineChartProps {
	width: number;
	height: number;
	data: {
		hourly: {
			time: Date;
			temperature: number;
		}[];
		sunset: Date;
		sunrise: Date;
	};
}

const LineChart = ({ width, height, data }: ILineChartProps) => {
	const margins = {
		left: 30,
		right: 10,
		top: 10,
		bottom: 40,
	};

	const xExtent = d3.extent(data.hourly.map(hour => hour.time));
	const yExtent = d3.extent(data.hourly.map(hour => hour.temperature));

	const xScale = d3
		.scaleLinear()
		.domain(xExtent as Iterable<number>)
		.range([margins.left, width - margins.right]);

	const yScale = d3
		.scaleLinear()
		.domain(yExtent as Iterable<number>)
		.range([height - margins.bottom, margins.top])
		.nice();

	const line = d3
		.line()
		.x(data => xScale(data[0]))
		.y(data => yScale(data[1]))
		.curve(d3.curveMonotoneX);

	const path = line(data.hourly.map(hour => [hour.time as unknown as number, hour.temperature])) ?? "";

	return (
		<svg width={width} height={height} className="text-[10px] text-white-3 relative">
			{/* Sunrise/Sunset */}
			<rect
				className="fill-[#000033] opacity-25"
				x={margins.left}
				y={margins.top}
				height={height - margins.top - margins.bottom}
				width={xScale(data.sunrise) - margins.left}
			/>
			<rect
				x={xScale(data.sunrise)}
				y={margins.top}
				height={height - margins.top - margins.bottom}
				width={xScale(data.sunset) - xScale(data.sunrise)}
				className="fill-[#FFA500] opacity-25"
			/>
			<rect
				x={xScale(data.sunset)}
				y={margins.top}
				height={height - margins.top - margins.bottom}
				width={width - margins.right - xScale(data.sunset)}
				className="fill-[#000033] opacity-25"
			/>

			{/* Y ticks */}
			{yScale.ticks(10).map((tick, i) => (
				<g key={tick} transform={`translate(0, ${yScale(tick)})`}>
					<text alignmentBaseline="middle" fill="currentColor">
						{tick}
					</text>
					{i !== yScale.ticks(10).length - 1 && (
						<line
							x1={margins.left}
							x2={width - margins.right}
							stroke="currentColor"
							strokeOpacity="0.3"
							strokeDasharray="3"
						/>
					)}
				</g>
			))}

			{/* X ticks */}
			{data.hourly.map((hour, i) => (
				<g key={getTime(hour.time)} transform={`translate(${xScale(hour.time)})`}>
					<text textAnchor="middle" fill="currentColor" y={height - 15}>
						{format(hour.time, "ha").toLowerCase()}
					</text>
					{i !== data.hourly.length - 1 && (
						<line
							y1={margins.top}
							y2={height - margins.bottom}
							stroke="currentColor"
							strokeDasharray="3"
							strokeOpacity="0.3"
						/>
					)}
				</g>
			))}

			{/* Current time */}
			<line
				x1={xScale(getTime(new Date()))}
				x2={xScale(getTime(new Date()))}
				y1={margins.top}
				y2={height - margins.bottom}
				className="text-accent-3 opacity-80"
				stroke="currentColor"
				strokeWidth="2"
				strokeDasharray="3"
			/>

			{/* Line */}
			<path d={path} className="text-accent-2" fill="none" stroke="currentColor" strokeWidth="2" />

			{/* Cirles */}
			{data.hourly.map(hour => (
				<circle
					key={`${xScale(hour.time)},${yScale(hour.temperature)}`}
					cx={xScale(hour.time)}
					cy={yScale(hour.temperature)}
					r="4"
					stroke="text-accent-3"
					className="text-accent-1"
					fill="currentColor"
				/>
			))}
		</svg>
	);
};
