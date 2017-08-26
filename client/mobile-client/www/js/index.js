const http = (method, url, data) => {
    const headers = {
        'Content-type': 'application/json'
    };

    const options = {
        method,
        headers
    };

    if (data) {
        // tslint:disable-next-line:no-expression-statement
        options.body = JSON.stringify(data);
    }

    return fetch(url, options)
        .then(res => {
            if (!res) {
                throw new Error(`empty ${url} response`);
            }
            return res.json();
        });
};

const get = (url) => http('get', url, null);
const post = (url, data) => http('post', url, data);

var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);

        cordova.plugins.barcodeScanner.scan(
            function (result) {
                alert("We got a barcode\n" +
                    "Result: " + result.text + "\n" +
                    "Format: " + result.format + "\n" +
                    "Cancelled: " + result.cancelled);

                post("http://192.168.0.102:5000/api/barcodes/4607083213592", {}).then((res) => {
                    receivedElement.innerText = res.name;
                });
            },
            function (error) {
                alert("Scanning failed: " + error);
            }
        );



    }
};

app.initialize();