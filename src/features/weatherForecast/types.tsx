export type WeekDay = "Sat" | "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri";

export type WeatherType =
	| "clear"
	| "partlyCloudy"
	| "cloudy"
	| "foggy"
	| "lightRain"
	| "rainy"
	| "lightSnow"
	| "snowy"
	| "thunderStorm";

export const weatherCodes: Record<number, WeatherType> = {
	0: "clear",
	1: "clear",
	2: "partlyCloudy",
	3: "cloudy",
	45: "foggy",
	48: "foggy",
	51: "lightRain",
	53: "lightRain",
	55: "lightRain",
	56: "lightSnow",
	57: "lightSnow",
	61: "rainy",
	63: "rainy",
	65: "rainy",
	66: "rainy",
	67: "rainy",
	71: "snowy",
	73: "snowy",
	75: "snowy",
	77: "snowy",
	80: "rainy",
	81: "rainy",
	82: "rainy",
	85: "lightSnow",
	86: "lightSnow",
	95: "thunderStorm",
	96: "thunderStorm",
	99: "thunderStorm",
};

export interface IWeatherForecastItemProps {
	day: WeekDay;
	date: number;
	temperature: number;
	type: WeatherType;
}
