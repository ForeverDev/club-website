var http = require("http");
var fs = require("fs");
var url = require("url");
var vm = require("vm");
var qs = require("querystring");
var port = 8080;

function handleServer(request, response) {
	// TODO handle various POST requests
	// we should probably have a branching system for
	// these post requests
	if (request.method == "POST") {
		var body = "";
		request.on("data", function(data) {
			body += data;
		});
		request.on("end", function() {
			var data = qs.parse(body);
			request.url = request.url.substring(request.url.lastIndexOf("/"));
			if (fs.existsSync("./POSTS/" + request.url)) {
				require("./POSTS/" + request.url).enter(data);
			}
		});
	} else {
		var parts = url.parse(request.url);
		var pathname = parts.pathname
		response.writeHead(200, {"Content-Type": "text/html"});
		if (pathname == "/") {
			response.write("<style> body { background-color: lightblue; } </style> ");
			response.end(fs.readFileSync("index.html"));	
		} else if (fs.existsSync("./" + pathname)) {
			if (pathname.substring(pathname.length - 4) == "html") {
				response.write("<style> body { background-color: lightblue; } </style> ");
			}
			response.end(fs.readFileSync("./" + pathname));
		} else {
			response.end("error: no such url '" + pathname + "'");
		}
	}
}

var server = http.createServer(handleServer);

server.listen(port);
