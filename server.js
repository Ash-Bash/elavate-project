////////////////////////////////////////////////////////
//Dependencies-&-Important-Allocated-Variables-Section//
////////////////////////////////////////////////////////

// Dependencies
var express = require('express');
var restful = require('node-restful');
var mongoose = restful.mongoose;
var bodyParser = require('body-parser');
var schema = mongoose.Schema;

// MongoDB
mongoose.connect('mongodb://b00240396:admin@ds011389.mlab.com:11389/elavate_db');

// Express
var app = express();
// BodyParser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

// Routes, Database Schema's and API's

////////////////////////////////////////////////////////
//--------------------Routes-Section------------------//
////////////////////////////////////////////////////////

// Routes
app.use(express.static(__dirname + "/public"));

////////////////////////////////////////////////////////
//---------------Database-Schema-Section--------------//
////////////////////////////////////////////////////////

// Database Schema's
// Stations Schema
var StationsSchema = schema ({
    name: String,
    broadcaster: String,
    region: String,
    websiteUrl: String,
    streamUrl:String
});
var Stations = restful.model('stations', StationsSchema);
Stations.methods(['get', 'put', 'post', 'delete']);
Stations.register(app, '/api/data/stationslist');

// Staff Picks Schema
var StaffPickSchema = schema ({
    name: String,
    stationid: String,
	stationname: String
});
var StaffPicks = restful.model('staffpicks', StaffPickSchema);
StaffPicks.methods(['get', 'put', 'post', 'delete']);
StaffPicks.register(app, '/api/data/staffpickslist');

// Favorites Schema (Web App)
var FavoriteSchema = schema ({
    name: String,
    broadcaster: String,
    region: String,
    websiteUrl: String,
    streamUrl:String
});
var Favorites = restful.model('favorites', FavoriteSchema);
Favorites.methods(['get', 'put', 'post', 'delete']);
Favorites.register(app, '/api/data/favorites');

// History Schema (Web App)
var HistorySchema = schema ({
    name: String,
    broadcaster: String,
    region: String,
    websiteUrl: String,
    streamUrl:String
});
var History = restful.model('history', HistorySchema);
History.methods(['get', 'put', 'post', 'delete']);
History.register(app, '/api/data/history');

////////////////////////////////////////////////////////
//-----------------------API-Section------------------//
////////////////////////////////////////////////////////

// Get API's
// Gets The Whole StationsList Database
app.get("/api/stationslist", function(req, res) {
    console.log("I Received a GET Request");
    
    Stations.find(function(err, stations) {
        console.log(stations);
        res.json(stations);
    });
});

// Gets a StationsList Item From The Database.
app.get('/api/stationslist/:id', function(req, res){
    var id = req.params.id;
    console.log("Station ID: " + id);
    
    Stations.findOne({ _id: id}, function(err, station){
        res.json(station);
    });
});

// Gets The Whole StaffPicksList Database
app.get("/api/staffpickslist", function(req, res) {
    console.log("I Received a GET Request");
    
    StaffPicks.find(function(err, pick) {
        console.log(pick);
        res.json(pick);
    });
});

// Gets a StaffPicksList Item From The Database
app.get('/api/staffpickslist/:id', function(req, res){
    var id = req.params.id;
    console.log("Pick ID: " + id);
    
    StaffPicks.findOne({ _id: id}, function(err, pick){
        res.json(pick);
    });
});

// Put API's
// Updates a StationList Item To The Database
app.put('/api/stationslist/:id', function(req, res){
    var id = req.params.id;
    console.log("Station ID: " + id);
    
    var stations = new Stations();
    
    // Allocates The Station Record data.
    stations.name = req.body.name;
    stations.broadcaster = req.body.broadcaster;
    stations.region = req.body.region;
    stations.websiteUrl = req.body.websiteUrl;
    stations.streamUrl = req.body.streamUrl;
    
    var upsertedData = stations.toObject();
    
    delete upsertedData._id;
    
    Stations.update({ _id: id }, {$set: upsertedData }, {upsert: true}, function(err, station) {
        // we have the updated user returned to us
        console.log(station);
        res.json(station);
    });
});

// Updates a StaffPicksList Item To The Database
app.put('/api/staffpickslist/:id', function(req, res){
    var id = req.params.id;
    console.log("Pick ID: " + id);
    
    var staffpicks = new StaffPicks();
    
    // Allocates The Station Record data.
    staffpicks.name = req.body.name;
    staffpicks.stationid = req.body.stationid;
	staffpicks.stationname = req.body.stationname;
    
    var upsertedData = staffpicks.toObject();
    
    delete upsertedData._id;
    
    StaffPicks.update({ _id: id }, {$set: upsertedData }, {upsert: true}, function(err, pick) {
        // we have the updated user returned to us
        console.log(pick);
        res.json(pick);
    });
});

// Post API's
// Posts a StationsList Item
app.post('/api/stationslist', function(req, res){
    console.log(req.body);
    
    var stations = new Stations();
    
    // Allocates The Station Record data.
    stations.name = req.body.name;
    stations.broadcaster = req.body.broadcaster;
    stations.region = req.body.region;
    stations.websiteUrl = req.body.websiteUrl;
    stations.streamUrl = req.body.streamUrl;
    
    stations.save(function(err, station){
        res.json(station);
    });
});

// Posts a StaffPicksList Item
app.post('/api/staffpickslist', function(req, res){
    console.log(req.body);
    
    var staffpicks = new StaffPicks();
    
    // Allocates The Station Record data.
    staffpicks.name = req.body.name;
    staffpicks.stationid = req.body.stationid;
	staffpicks.stationname = req.body.stationname;
    
    staffpicks.save(function(err, pick){
        res.json(pick);
    });
});

// Delete API's
// Deletes a StationsList Item
app.delete('/api/stationslist/:id', function(req, res){
    var id = req.params.id;
    console.log("Station ID: " + id);
    
    Stations.remove({ _id: id }, function(err, station){
        res.json(station);
    });
});

// Deletes a StaffPicksList Item
app.delete('/api/staffpickslist/:id', function(req, res){
    var id = req.params.id;
    console.log("Pick ID: " + id);
    
    StaffPicks.remove({ _id: id }, function(err, pick){
        res.json(pick);
    });
});

////////////////////////////////////////////////////////
//-----------------Server-Info-Section----------------//
////////////////////////////////////////////////////////

// Starts Server
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

server.listen(server_port, server_ip_address, function(){
  console.log("Listening on " + server_ip_address + ", server_port " + server_port)
});
console.log('Elavate API and Web App is Running on port 2000');
