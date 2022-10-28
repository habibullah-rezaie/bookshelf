/**
 *
 * @param inputDateString string in format yyyy-mm-dd
 *
 * However it can cantain month and year or just only year.
 *
 * @returns an string in format Aug 20th, 2021 or Aug 2021 or 2021
 */
export function getCardDateText(inputDateString: String): string {
	let dateParts: number[] = inputDateString
		.split("-")
		.map((str) => Number.parseInt(str, 10));

	if (dateParts.length === 0) {
		return "";
	}

	let dateString = dateParts[0].toString();

	let publishMonth = dateParts[1] ?? 0;
	let publishDay = dateParts[2] ?? 0;

	// First a valid month should be given to specify the day
	if (publishMonth > 0 && publishMonth < 12) {
		if (publishDay >= 1 && publishDay <= 31) {
			let dayString = "";
			// 11th, 12th, 13th
			if (11 <= publishDay && publishDay <= 12) {
				dayString = publishDay + "th";
			} else if (publishDay.toString()[1] === "1") {
				dayString = publishDay + "st";
			} else if (publishDay.toString()[1] === "2") {
				dayString = publishDay + "nd";
			} else if (publishDay.toString()[1] === "3") {
				dayString = publishDay + "rd";
			} else {
				dayString = publishDay + "th";
			}
			dateString = dayString + ", " + dateString;
		}
		const months = [
			"" /* empty element index 0 */,
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];
		const monthString = months[publishMonth];
		if (monthString?.length > 0) {
			dateString = monthString.slice(0, 3) + " " + dateString;
		}
	}
	return dateString;
}
