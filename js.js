function AJAX(type, url, contentType, sendData) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();

        xhr.open(type, url);

        xhr.onload = function () {
            if (xhr.status == 200) {
                resolve(xhr.response);
            } else {
                reject(Error(request.statusText));
            }
        }

        xhr.onerror = function() {
            reject(Error('Error on server!'));
        }

        if (contentType) {
            console.log('contentType');
            xhr.setRequestHeader('Content-Type', contentType);
        }

        xhr.send(sendData);
    })
}

var record = {
    "date": "4\/21\/2014",
    "title": "AJAX",
    "lector": [
        "alena_karaba"
    ],
    "location": "K1\/3",
    "description": "some description",
    "level": "D1-D5",
    "notes": "this is my brand new talk1",
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

AJAX ('POST', 'http://54.72.3.96:3000/techtalks', 'application/json', jsonRecord)
    .then(function(response){
        var lastRecord = JSON.parse(response);
        console.log(lastRecord);
        return lastRecord['_id'];
    })

AJAX('GET', 'http://54.72.3.96:3000/techtalks').then(function(data){
    var techTalks = JSON.parse(data);
    var techTalksTitles = [];
    var resultTechTalks = [];

    for (var i in techTalks) {
        techTalksTitles[i] = techTalks[i].title;
    }

    for (var i = 0; i <= techTalksTitles.length; i++) {
        if (techTalksTitles[i] != techTalksTitles[i + 1]){
            resultTechTalks.push(techTalksTitles[i]);
        };
    }
});