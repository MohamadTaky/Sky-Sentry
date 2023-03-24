import { Link } from "react-router-dom";
import useCountryFlagQuery from "./useCountryFlagQuery";

interface IProps {
	city: string;
	countryCode: string;
	resetInput: () => void;
}

export function CitySearchItem({ city, countryCode, resetInput }: IProps) {
	const { data, isLoading } = useCountryFlagQuery(countryCode);
	const searchParams = new URLSearchParams({ city });

	if (isLoading) return <></>;
	return (
		<li>
			<Link
				onClick={resetInput}
				to={`?${searchParams}`}
				className="group cursor-pointer transition-colors hover:bg-black-1 p-2 flex items-center gap-2 w-full">
				<div className="text-sm w-[15ch]">{city}</div>
				<div className="text-xs max-w-[35ch] text-white-3 flex-1">{data?.countryName}</div>
				<img className="object-cover w-6 h-6 rounded ml-auto" src={data?.flag} alt="" />
			</Link>
		</li>
	);
}

