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

AJAX('GET', 'http://54.72.3.96:3000/techtalks', 'java');