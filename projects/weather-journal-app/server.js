// Setup empty JS object to act as endpoint for all routes
projectData = { entries: [] };

// Require Express to run server and routes
const express = require('express');
const app = express();
app.get("/alldata", (request, response) => {
    response.send(projectData);

});

// Start up an instance of app
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
const port = 8000;

// Setup Server
const server = app.listen(port, listening);
function listening() {
    console.log("server running");
    console.log(`runnig on localhost:${port}`)
};

app.post('/add', function (request, response) {
    console.log(request);
    makeData(request);
    response.send({
        message: 'New entry was added',
    });

});



function makeData(request) {
    let newData = request.body;
    let newEntry = {
        date: newData.date,
        temperature: newData.temperature,
        content: newData.content
    };
    projectData.entries.push(newEntry);
}
