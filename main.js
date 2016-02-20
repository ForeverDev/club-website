var http = require("http");
var fs = require("fs");
var url = require("url");
var port = 8080;

function handleServer(request, response) {
	// TODO handle various POST requests
	// we should probably have a branching system for
	// these post requests
	if (request.method == "POST") {

	} else {
		var parts = url.parse(request.url);
		var pathname = parts.pathname
		response.writeHead(200, {"Content-Type": "text/html"});
		if (pathname == "/") {
			response.end(fs.readFileSync("index.html"));	
		} else if (fs.existsSync("./" + pathname)) {
			response.end(fs.readFileSync("./" + pathname));
		} else {
			response.end("error: no such url '" + pathname + "'");
		}
	}
}

var server = http.createServer(handleServer);

server.listen(port);
