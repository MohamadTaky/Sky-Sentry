import React from "react";
import { NavLink, useSearchParams } from "react-router-dom";

interface IProps {
	param: string | string[];
	children?: React.ReactNode;
	onClick?: () => void;
	className?: string;
}

export default function SearchParamLink({ param = "", children, className }: IProps) {
	const [searchParams] = useSearchParams();

	const params: Record<string, string> = {};
	searchParams.forEach((value, key) => (params[key] = value));
	if (Array.isArray(param))
		param.forEach(el => {
			const [newKey, newValue] = el.split("=");
			if (newValue) params[newKey] = newValue;
			else delete params[newKey];
		});
	else {
		const [newKey, newValue] = param.split("=");
		if (!!newValue) params[newKey] = newValue;
		else delete params[newKey];
	}
	const newSearchParams = new URLSearchParams(params);

	return (
		<NavLink to={`?${newSearchParams}`} className={className}>
			{children}
		</NavLink>
	);
}
