import { scaleLinear, extent, line, curveMonotoneX } from "d3";
import { getTime, format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { AnimatePresence, motion } from "framer-motion";

interface ILineChartProps {
	width: number;
	height: number;
	data: {
		hourly: {
			time: Date;
			value: number;
		}[];
		sunset: Date;
		sunrise: Date;
	};
	timezone: string;
}
export default function LineChart({ width, height, data, timezone }: ILineChartProps) {
	const margins = {
		left: 35,
		right: 15,
		top: 10,
		bottom: 30,
	};
	const xExtent = extent(data.hourly.map(hour => hour.time));
	const yExtent = extent(data.hourly.map(hour => hour.value));
	const time = utcToZonedTime(new Date().toISOString(), timezone);
	const xScale = scaleLinear()
		.domain(xExtent as Iterable<number>)
		.range([margins.left, width - margins.right]);
	const yScale = scaleLinear()
		.domain(yExtent as Iterable<number>)
		.range([height - margins.bottom, margins.top])
		.nice();
	const l = line()
		.x(data => xScale(data[0]))
		.y(data => yScale(data[1]))
		.curve(curveMonotoneX);
	const d = l(data.hourly.map(hour => [hour.time as unknown as number, hour.value])) ?? "";
	const chartHeight = height === 0 ? 0 : height - margins.bottom - margins.top;
	return (
		<>
			<svg width={25} height={height} className="text-[10px] absolute bg-black-1">
				<AnimatePresence mode="wait">
					<motion.g
						key={yScale.ticks().join("")}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}>
						{yScale.ticks().map((tick, i) => (
							<text className="fill-white-3" key={`ylabel${i}`} y={yScale(tick)}>
								{tick}
							</text>
						))}
					</motion.g>
				</AnimatePresence>
			</svg>
			<div style={{ height: `${height}px` }} className="w-full overflow-hidden overflow-x-auto custom-scroll">
				<svg width={width} height={height} className="text-[10px] text-white-3">
					{/* Sunrise/Sunset */}
					<g className="opacity-25" transform={`translate(0,${margins.top})`}>
						<rect
							className="fill-midnight-1"
							x={margins.left}
							width={xScale(data.sunrise) - margins.left}
							height={chartHeight}
						/>
						<rect
							className="fill-orange-1"
							x={xScale(data.sunrise)}
							width={xScale(data.sunset) - xScale(data.sunrise)}
							height={chartHeight}
						/>
						<rect
							className="fill-midnight-1"
							x={xScale(data.sunset)}
							width={width - margins.right - xScale(data.sunset)}
							height={chartHeight}
						/>
					</g>

					{/* Y ticks */}
					<AnimatePresence mode="wait">
						<motion.g
							key={yScale.ticks().join("")}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}>
							{yScale
								.ticks(10)
								.slice(1, -1)
								.map(tick => (
									<line
										key={`yline${tick}`}
										y1={yScale(tick)}
										y2={yScale(tick)}
										x1={margins.left}
										x2={width - margins.right}
										stroke="currentColor"
										strokeOpacity="0.3"
										strokeDasharray="3"
									/>
								))}
							{/* Current time */}
							<line
								x1={xScale(getTime(time))}
								x2={xScale(getTime(time))}
								y1={margins.top}
								y2={height - margins.bottom}
								className="opacity-80 stroke-accent-3"
								strokeWidth="2"
								strokeDasharray="3"
							/>
						</motion.g>
					</AnimatePresence>

					{/* X ticks */}
					{data.hourly.map((hour, i) => (
						<g key={`xtick${i}`} transform={`translate(${xScale(hour.time)})`}>
							<text textAnchor="middle" fill="currentColor" y={height - 15}>
								{format(hour.time, "ha").toLowerCase()}
							</text>
						</g>
					))}

					{/* Line */}
					<motion.path
						animate={{ d: d }}
						transition={{ type: "tween", ease: "easeOut", duration: 0.75 }}
						className="fill-none stroke-accent-2"
						strokeWidth="2"
					/>
				</svg>
			</div>
		</>
	);
}
