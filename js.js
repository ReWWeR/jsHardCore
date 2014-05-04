function AJAX(type, url, contentType, sendData) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();

        xhr.open(type, url);

        xhr.onload = function () {
            if (xhr.status == 200) {
                resolve(xhr.response);
            } else {
                reject(Error(xhr.statusText));
            }
        }

        xhr.onerror = function() {
            reject(Error('Error on server!'));
        }

        if (contentType) {
            console.log(contentType);
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

/*AJAX ('POST', 'http://54.72.3.96:3000/techtalks', 'application/json', jsonRecord)
    .then(function(response){
        var lastRecord = JSON.parse(response);
        console.log('ADD NEW RECORD...');
        console.log('ID: ' + lastRecord['_id']);
        return lastRecord['_id'];
    })
    .then(function(techTalk){
        AJAX('GET', 'http://54.72.3.96:3000/techtalks/' + techTalk).then(function(response){
            console.log('READ: ', response);
            console.log('ID: ' + techTalk)
        })
        return techTalk;
    })
    .then(function(techTalk){
        var updatedString = JSON.stringify({'lector':'vasily_pupkin'});

        AJAX('PUT', 'http://54.72.3.96:3000/techtalks/' + techTalk, '', updatedString).then(function(response){
            console.log('UPDATE STRING LECTOR: ', updatedString);
            console.log('ID: ' + techTalk)
        })
        return techTalk;
    })
    .then(function(techtalk){
        AJAX('DELETE', 'http://54.72.3.96:3000/techtalks/' + techTalk);
        console.log ('DELETE: ', techtalk);
        console.log('ID: ' + techTalk);
        return techTalk;
    })*/

AJAX('GET', 'http://54.72.3.96:3000/techtalks').then(function(data){
    var techTalks = JSON.parse(data);
    var techTalksTitles = [];
    var resultTechTalks = [];
    var table = document.getElementById('table');
    var tableRows = '';

    function sortJSON(array, key) {
        return array.sort(function(a, b) {
            var x = a[key];
            var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }
    techTalks = sortJSON(techTalks,'title');

    var techTalksResults = techTalks.filter(function(elem, pos) {
        return techTalks.indexOf(elem) == pos;
    });

    console.log(techTalksResults);

/*    for (var i = 0; i < techTalks.length; i++) {
        if (techTalks[i].title != techTalks[i+1].title) {
            resultTechTalks.push(techTalks[i].title);
        }
    }*/
    console.log('123');
    console.log(resultTechTalks);
/*
    for (var i in techTalks) {
        techTalksTitles[i] = techTalks[i].title;
    }

    techTalksTitles.sort();

    for (var i = 0; i <= techTalksTitles.length; i++) {
        if (techTalksTitles[i] != techTalksTitles[i + 1]){
            resultTechTalks.push(techTalksTitles[i]);
        };
    };

    console.log(resultTechTalks);


    resultTechTalks.forEach(function(item){
        tableRows +='<tr><td><strong>'+ item +'</strong></td></tr>'
    })
    table.innerHTML = tableRows;
 */
});