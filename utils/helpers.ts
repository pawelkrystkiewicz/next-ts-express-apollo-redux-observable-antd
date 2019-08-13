export const timeDiff = (startDTime, endDtime) => {
	const startTime = new Date(startDTime);
	const endTime = new Date(endDtime);
	const diff = endTime.getTime() - startTime.getTime();
	let msec = diff;
	const minutes = Math.floor(msec / 1000 / 60);
	msec -= minutes * 1000 * 60;
	const ss = Math.floor(msec / 1000);
	msec -= ss * 1000;
	return minutes;
};
export const isCheckpoint = (data, key, property) =>
	data[key][`${property}`].length > 0 || key == 0 || key == data.length - 1;

export const makeArrayUnique = (array, key) =>
	array.reduce((prev, curr) => (prev.find((a) => a[key] === curr[key]) ? prev : prev.push(curr) && prev), []);

export const partitionArray = (data, finalSize) => {
	let outcome = [];
	data.forEach((item) => {
		if (!outcome.length || outcome[outcome.length - 1].length === finalSize) outcome.push([]);

		outcome[outcome.length - 1].push(item);
	});
	return outcome;
};

export const timeConversion = (minutes) => {
	let hours = Math.floor(minutes / 60);
	let days = Math.floor(hours / 24);
	if (minutes < 60) {
		return `${minutes} min`;
	} else if (hours < 24) {
		return `${hours}h ${minutes % 60} min`;
	} else {
		return `${days}d ${hours % 24}h ${minutes % 60} min`;
	}
};

export const timeDiff1900 = (endDtime) => {
	let startDTime = '1900-01-01 00:00:00.000';
	const startTime = new Date(startDTime);
	const endTime = new Date(endDtime);
	const diff = endTime.getTime() - startTime.getTime();
	let msec = diff;
	// const hh = Math.floor(msec / 1000 / 60 / 60);
	// msec -= hh * 1000 * 60 * 60;
	const minutes = Math.floor(msec / 1000 / 60);
	msec -= minutes * 1000 * 60;
	const ss = Math.floor(msec / 1000);
	msec -= ss * 1000;
	// return hh + ':' + mm + ':' + ss;
	return timeConversion(minutes);
};
export const getRouteBounds = (waypoints) => {
	const north = Math.max(...waypoints.map((x) => x.lat));
	const south = Math.min(...waypoints.map((x) => x.lat));

	const east = Math.max(...waypoints.map((x) => x.lng));
	const west = Math.min(...waypoints.map((x) => x.lng));

	let bounds = {
		north: north + 0.5,
		south: south - 0.5,
		east: east,
		west: west - 1
	};
	return bounds;
};
export const sumArrayByProperty = (property, array) => array.reduce((a, b) => a + (b[property] || 0), 0);
export const sumArray = (array = [ 0, 0 ]) => array.reduce((a, b) => a + b, 0);
export const reactElementKeygen = (a, b) => Math.floor(Number(a * Math.pow(b, 2 / b)));

// export const sortBy = (arr:Array<any>, comparer:Date) =>
// 	arr.sort(
// 		(a, b) => typeof a[comparer] === Date
// 				? new Date(a[comparer]).getTime() - new Date(b[comparer]).getTime()
// 				: a[comparer] - b[comparer]
// 	);
