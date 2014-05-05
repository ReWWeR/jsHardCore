function AJAX(type, url, contentType, sendData) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();

        xhr.open(type, url);

        xhr.onload = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                resolve(xhr.response);
            } else {
                reject(Error(xhr.statusText));
            }
        }

        xhr.onerror = function () {
            reject(Error('Error on server!'));
        }

        if (contentType) {
            xhr.setRequestHeader('Content-Type', contentType);
        }

        xhr.send(sendData);
    })
}

var record = {
    "date": "04\/05\/2014",
    "title": "AJAX",
    "lector": [
        "alena_karaba"
    ],
    "location": "K1\/3",
    "description": "some description",
    "level": "D1-D5",
    "notes": "this is my brand new talk",
    "attendees": [
        "alena_karaba"
    ],
    "tags": [
        "ajax",
        "xmlhttprequest",
        "promises"
    ]
};

var jsonRecord = JSON.stringify(record);

//CHAINING OF REQUESTS TO JSON

AJAX('POST', 'http://54.72.3.96:3000/techtalks', 'application/json', jsonRecord)
    .then(function (response) {
        var lastRecord = JSON.parse(response);
        console.log('ADD NEW RECORD...');
        return lastRecord['_id'];
    })
    .then(function (techTalk) {
        AJAX('GET', 'http://54.72.3.96:3000/techtalks/' + techTalk).then(function (response) {
            console.log('READ: ', response);
        })
        return techTalk;
    })
    .then(function (techTalk) {
        var updatedString = JSON.stringify({'lector': 'vasily_pupkin'});

        AJAX('PUT', 'http://54.72.3.96:3000/techtalks/' + techTalk, 'application/json', updatedString).then(function (response) {
            console.log('UPDATE STRING LECTOR: ', response);
        })
        return techTalk;
    })
    .then(function (techTalk) {
        AJAX('DELETE', 'http://54.72.3.96:3000/techtalks/' + techTalk);
        console.log('DELETE: ', techTalk);
        return techTalk;
    })

//CREATING LIST OF LECTORS

AJAX('GET', 'http://54.72.3.96:3000/techtalks').then(function (data) {
    var techTalks = JSON.parse(data);
    var resultTechTalks = [];
    var table = document.getElementById('table');
    var tableRows = '';

    function sortJSON(array, key) {
        return array.sort(function (a, b) {
            var x = a[key];
            var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }

    techTalks = sortJSON(techTalks, 'title');

    for (var i = 0; i < techTalks.length - 1; i++) {
        if (techTalks[i].title != techTalks[i + 1].title && techTalks[i].title != 'undefined') {
            resultTechTalks.push(techTalks[i]);
        }
    }

    resultTechTalks.forEach(function (item) {
        AJAX('GET', 'http://54.72.3.96:3000/attendees/' + item.lector).then(function (response) {
            var lectorCard = JSON.parse(response);
            tableRows += "<tr><td><strong>" + item.title + "</strong></td><td>"
                + item.lector + "</td>"
                + "</td><td><a href='mailto:" + lectorCard.email + "'>" + lectorCard.email + "</a></td></tr>";
            table.innerHTML = tableRows;
        })

    })
});