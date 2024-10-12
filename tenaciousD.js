const fs = require("fs");

const timeToIncrementInSeconds = 1;
const inputFilePath = "";
const outputFilePath = "";

let newArr = [];
const arr = [];
let finishedSubtitles = "";

const getTimeLine = (str) => {
	const finalArr = [];
	let word = "";
	for (let i = 0; i < str.length; i++) {
		if (str.charCodeAt(i) != 10) {
			word += str[i];
		} else {
			arr.push(word);
			word = "";
		}
	}
	newArr = arr.filter((item) => item.includes("-->"));
	for (let i = 0, j = 0; j < newArr.length; i += 2) {
		finalArr[i] = newArr[j].slice(0, 12);
		finalArr[i + 1] = newArr[j].slice(17, 29);
		j++;
	}
	return finalArr;
};

fs.readFile(`${inputFilePath}`, "utf-8", (err, content) => {
	if (err) throw new Error(`${err}`);

	const timeArr = getTimeLine(content);
	const obj = {};
	const modifiedTimes = [];
	timeArr.forEach((item) => {
		//need to add 100 because parseInt removes zeroes if in front, maybe there is an option for that on the method but I'm not aware of it
		obj["h"] = parseInt(item.slice(0, 2)) + 100;
		obj["m"] = parseInt(item.slice(3, 5)) + 100;
		obj["s"] = parseInt(item.slice(6, 8)) + 100;
		//no need to convert this one because i'm incrementing only the h,m,s part
		obj["ms"] = item.slice(9, this.length);
		obj["s"] += timeToIncrementInSeconds;
		if (obj["s"] > 159) {
			obj["s"] = 100;
			obj["m"] += 1;
		}
		if (obj["m"] > 159) {
			obj["m"] = 100;
			obj["h"] += 1;
		}

		modifiedTimes.push(
			`${obj["h"].toString().slice(1, this.lenght)}:${obj["m"].toString().slice(1, this.lenght)}:${obj["s"]
				.toString()
				.slice(1, this.lenght)},${obj["ms"]}`
		);
	});
	for (let i = 0, j = 0; i < modifiedTimes.length; i += 2) {
		modifiedTimes[j] = `${modifiedTimes[i]} --> ${modifiedTimes[i + 1]}`;
		j++;
	}
	modifiedTimes.splice(Math.floor(modifiedTimes.length / 2), modifiedTimes.length);
	for (let i = 0, j = 0; i < arr.length; i++) {
		if (arr[i].includes("-->")) {
			arr[i] = modifiedTimes[j];
			j++;
		}
		continue;
	}

	arr.forEach((item) => (finishedSubtitles += item + "\n"));

	fs.writeFile(`${outputFilePath}`, finishedSubtitles, (err) => {
		if (err) {
			console.log(err);
		} else console.log("success");
	});
});
