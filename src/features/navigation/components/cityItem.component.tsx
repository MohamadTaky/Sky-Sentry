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
				className="group cursor-pointer transition-colors hover:bg-light-gray p-2 flex items-center gap-2"
				to={`/?city=${name}&lon=${longitude}&lat=${latitude}`}>
				<div className="text-sm w-[15ch]">{name}</div>
				<div className="text-xs max-w-[35ch] opacity-80 flex-1">{data?.countryName}</div>
				<img className="object-cover w-6 h-6 rounded" src={data?.flag} alt="" />
			</NavLink>
		</li>
	);
}
