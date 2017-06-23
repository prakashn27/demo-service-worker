/**
 * Created by prakashn on 22/06/2017.
 */
const express = require('express');
const app = express();
const path = require('path');

// Define the port to run on
app.set('port', 8000);

app.use(express.static(path.join(__dirname)));

// Listen for requests
var server = app.listen(app.get('port'), function() {
    var port = server.address().port;
    console.log('Magic happens on port ' + port);
});
