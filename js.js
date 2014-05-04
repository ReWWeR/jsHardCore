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

AJAX('GET', 'http://54.72.3.96:3000/techtalks').then(function(data){
    var techTalks = JSON.parse(data);
    var techTalksTitles = [];
    var resultTechTalks = [];
    var test = [[],[]]

    for (var i in techTalks) {
        test[i][0] =  techTalks[i].lector;
        test[i][1] =  techTalks[i].title;
    }

    console.log(test[0][0]);

    for (var i in techTalks) {
        techTalksTitles[i] = techTalks[i].title;
    }

    for (var i = 0; i <= techTalksTitles.length; i++) {
        if (techTalksTitles[i] != techTalksTitles[i + 1]){
            resultTechTalks.push(techTalksTitles[i]);
        };
    }
});