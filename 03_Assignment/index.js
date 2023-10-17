const http = require("http");
const port =8000
const fs = require('fs'); 
function requestHandler(req, res){
    console.log(req.url);
    res.writeHead(200,{'content-type': 'text/html'})
    let filename;
    switch (req.url) {
        case '/':
            filename='./index.html'
            break;
        case '/about_us.html':
            filename='./about_us.html'
            break;
        default:
            filename='./404.html'
            break;
    }
    fs.readFile(filename, function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        return res.end(data)
    })
}
const server = http.createServer(requestHandler);
server.listen(port, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('The server is running on port', port);
})