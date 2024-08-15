/* Global Variables */
const zipcodeAPI = 'http://api.openweathermap.org/geo/1.0/zip?zip=';
const countryCode = 'AU';
const apiKey = '&appid=4e9a55ab66c338b482ac68e6bde5f838&units=imperial';

const tempAPI = 'https://api.openweathermap.org/data/2.5/weather?';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

async function zipcodeToLatLon(zipcode) {

    let url = zipcodeAPI + zipcode + ',' + countryCode + apiKey;
    const request = await fetch(url);
    try {
        const allData = await request.json();
        if ('cod' in allData && allData.cod != 200) {
            throw new Error(zipcode);
        }
        return allData;

    } catch (error) {
        console.log("error", error);
        alert('Error while getting Australian zip code: ' + zipcode);
        throw error;
    }
}
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    let zipcode = document.getElementById('zip').value;
    zipcodeToLatLon(zipcode)
        //.then(x => dump(x))
        .then(x => getTemp(x))
        //.then(x => dump(x))
        .then(x => post(x))
        //.then(x => dump(x))
        .then(() => loadData())
        //.then(x => dump(x))
        .then(x => updateUI(x))
        .catch(x => dump(x));
}

async function getTemp(latLonJson) {
    let url = tempAPI + 'lat=' + latLonJson.lat + '&lon=' + latLonJson.lon + apiKey;
    const request = await fetch(url);
    try {
        const allData = await request.json();
        return allData.main.temp;
    } catch (error) {
        console.log("error", error);
    }

}

const postData = async (url = '', data = {}) => {
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

function post(temp) {
    let content = document.getElementById('feelings').value;

    postData('/add', { date: newDate, temperature: temp, content: content })
}

function dump(x) {
    console.log(x);
    return x;
}

async function loadData() {

    const response = await fetch('/alldata', { method: 'GET', });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

const updateUI = async (allData) => {
    try {
        lastEntry = allData.entries[allData.entries.length - 1];
        document.getElementById('date').innerHTML = lastEntry.date;
        document.getElementById('temp').innerHTML = lastEntry.temperature;
        document.getElementById('content').innerHTML = lastEntry.content;

    } catch (error) {
        console.log("error", error);
    }
}