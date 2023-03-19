import { ReactComponent as ClearDay } from "assets/weahter icons/clear-day.svg";
import { ReactComponent as Shower } from "assets/weahter icons/rainy-shower.svg";
import { ReactComponent as Rain } from "assets/weahter icons/rainy.svg";
import { ReactComponent as Snow } from "assets/weahter icons/snowy.svg";
import { ReactComponent as PartlyCloudyDay } from "assets/weahter icons/partly-cloudy-day.svg";
import { ReactComponent as Cloud } from "assets/weahter icons/cloudy.svg";
import { ReactComponent as Fog } from "assets/weahter icons/foggy.svg";
import { ReactComponent as Storm } from "assets/weahter icons/stormy.svg";

import { WeatherType } from "../types";
import React from "react";

const sharedIconProps: React.SVGProps<SVGSVGElement> = {
	className: "w-full h-full drop-shadow-[0_0px_20px_rgba(255,255,255,0.35)]",
};

const weatherIcons: Record<WeatherType, JSX.Element> = {
	clear: <ClearDay {...sharedIconProps} />,
	lightRain: <Shower {...sharedIconProps} />,
	rainy: <Rain {...sharedIconProps} />,
	lightSnow: <Snow {...sharedIconProps} />,
	snowy: <Snow {...sharedIconProps} />,
	partlyCloudy: <PartlyCloudyDay {...sharedIconProps} />,
	cloudy: <Cloud {...sharedIconProps} />,
	foggy: <Fog {...sharedIconProps} />,
	thunderStorm: <Storm {...sharedIconProps} />,
};

export default function WeatherIcon({ type }: { type: WeatherType }) {
	return weatherIcons[type];
}
