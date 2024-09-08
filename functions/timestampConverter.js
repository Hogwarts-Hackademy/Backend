const convertToIST = (date) => {
	/* // Convert date to a Date object
	const utcDate = new Date(date);

	// Convert to IST
	const istOptions = {
		timeZone: "Asia/Kolkata",
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		timeZoneName: "short", // This will include the IST timezone indicator
	};
	const istString = utcDate.toLocaleString("en-IN", istOptions);

	// Format the date string in a way similar to ISO format
	const [datePart, timePart] = istString.split(", ");
	const [day, month, year] = datePart.split("/");
	const [hour, minute, second] = timePart.split(":");

	// Construct the IST timestamp string
	const formattedIST = `${year}-${month}-${day}T${hour}:${minute}:${second} IST`;

	return formattedIST; */
	return new Date(date).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
};

module.exports = {
	convertToIST,
};
