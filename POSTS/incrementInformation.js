module.exports = {
	enter: function(params) {
		var fs = require("fs");
		var obj = JSON.parse(fs.readFileSync("info.json", "utf8"));
		for (var i in params) {
			if (obj.hasOwnProperty(i)) {
				obj[i] = parseInt(obj[i]) + parseInt(params[i]);
			} else {
				obj[i] = parseInt(params[i]);
			}
		}
		fs.writeFile("info.json", JSON.stringify(obj));
	}
};
