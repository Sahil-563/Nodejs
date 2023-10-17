const http = require('http')


const port = 3000
const fs = require('fs'); //For reading the files
// request and response handeler
function requestHandler(req, res) {
    console.log(req.url);

    //serving text and html as response for that:-
    res.writeHead(200, { 'content-type': 'text/html' });
    let filename;
    switch (req.url) {
        case '/':
            filename = './index.html';
            break;
        case '/about.html':
            filename='./about.html';
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