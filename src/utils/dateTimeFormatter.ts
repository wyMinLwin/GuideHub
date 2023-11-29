export const dateTimeFormatter = (dateTime: string) => {
	const dateObject = new Date(dateTime);
	const options: Intl.DateTimeFormatOptions = {
		year: "numeric" as const,
		month: "short" as const,
		day: "numeric" as const,
		hour: "numeric" as const,
		minute: "numeric" as const,
		hour12: true as const,
	};
	const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
		dateObject
	);
	return formattedDate;
};
