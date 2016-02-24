module.exports = {
	enter: function(params) {
		var fs = require("fs");
		if (params.source) {
			fs.writeFileSync("./tmp/spyresrc.spys", params.source);
			require("child_process").exec("./spyre ./tmp/spyresrc.spys");
		}
	}
};
