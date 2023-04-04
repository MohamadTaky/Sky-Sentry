export default function fromCamelCase(str: string, separator: string) {
	return str
		.replace(/([a-z\d])([A-Z])/g, "$1" + separator + "$2")
		.replace(/([A-Z]+)([A-Z][a-z\d])/, "$1" + separator + "$2");
}
