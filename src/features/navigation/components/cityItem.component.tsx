import { NavLink } from "react-router-dom";
import useCountryFlag from "../hooks/useCountryFlag";

interface IProps {
	name: string;
	countryCode: string;
	longitude: number;
	latitude: number;
	resetInput: () => void;
}

export function CityListItem({ name, countryCode, longitude, latitude, resetInput }: IProps) {
	const { data, isLoading } = useCountryFlag(countryCode);

	if (isLoading) return <></>;
	return (
		<li>
			<NavLink
				onClick={resetInput}
				className="group cursor-pointer transition-colors hover:bg-light-gray p-2 flex justify-between gap-2"
				to={`/?city=${name}&lon=${longitude}&lat=${latitude}`}>
				<div className="text-sm w-[15ch]">{name}</div>
				<div className="text-xs flex-1 max-w-[35ch] overflow-hidden relative opacity-80">
					<div className="absolute h-full w-4 right-0 top-0 transition-opacity opacity-100 group-hover:opacity-0 from-white to-transparent bg-gradient-to-l" />
					<div className="absolute h-full w-4 right-0 top-0 transition-opacity opacity-0 group-hover:opacity-100 from-light-gray to-transparent bg-gradient-to-l" />
					{data?.countryName}
				</div>
				<img className="object-cover w-6 h-6 rounded" src={data?.flag} alt="" />
			</NavLink>
		</li>
	);
}
