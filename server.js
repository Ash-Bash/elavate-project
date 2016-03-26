////////////////////////////////////////////////////////
//Dependencies-&-Important-Allocated-Variables-Section//
////////////////////////////////////////////////////////

// Dependencies
var http = require('http');
var express = require('express');
var restful = require('node-restful');
var mongoose = restful.mongoose;
var bodyParser = require('body-parser');
var schema = mongoose.Schema;

// Connection Infomation
var port = 2000;

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
    icon: String,
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
    icon: String,
    stationid: String,
	stationname: String
});
var StaffPicks = restful.model('staffpicks', StaffPickSchema);
StaffPicks.methods(['get', 'put', 'post', 'delete']);
StaffPicks.register(app, '/api/data/staffpickslist');

// Favorites Schema (Web App)
var FavoriteSchema = schema ({
    name: String,
    icon: String,
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
    icon: String,
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

//------------------------Stations--------------------//

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

//----------------------Staff-Picks------------------//

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

//------------------------History--------------------//

// Gets The Whole HistoryList Database
app.get("/api/historylist", function(req, res) {
    console.log("I Received a GET Request");
    
    History.find(function(err, pick) {
        console.log(pick);
        res.json(pick);
    });
});

// Gets a HistoryList Item From The Database
app.get('/api/historylist/:id', function(req, res){
    var id = req.params.id;
    console.log("Pick ID: " + id);
    
    History.findOne({ _id: id}, function(err, pick){
        res.json(pick);
    });
});

//-----------------------Favorites-------------------//

// Gets The Whole FavoritesList Database
app.get("/api/favoriteslist", function(req, res) {
    console.log("I Received a GET Request");
    
    Favorites.find(function(err, pick) {
        console.log(pick);
        res.json(pick);
    });
});

// Gets a FavoritesList Item From The Database
app.get('/api/favoriteslist/:id', function(req, res){
    var id = req.params.id;
    console.log("Pick ID: " + id);
    
    Favorites.findOne({ _id: id}, function(err, pick){
        res.json(pick);
    });
});

// Put API's

//------------------------Stations--------------------//

// Updates a StationList Item To The Database
app.put('/api/stationslist/:id', function(req, res){
    var id = req.params.id;
    console.log("Station ID: " + id);
    
    var stations = new Stations();
    
    // Allocates The Station Record data.
    stations.name = req.body.name;
    stations.icon = req.body.icon;
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

//----------------------Staff-Picks------------------//

// Updates a StaffPicksList Item To The Database
app.put('/api/staffpickslist/:id', function(req, res){
    var id = req.params.id;
    console.log("Pick ID: " + id);
    
    var staffpicks = new StaffPicks();
    
    // Allocates The Staffpicks Record data.
    staffpicks.name = req.body.name;
    staffpicks.icon = req.body.icon;
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

//------------------------History--------------------//

// Updates a HistoryList Item To The Database
app.put('/api/historylist/:id', function(req, res){
    var id = req.params.id;
    console.log("History ID: " + id);
    
    var history = new History();
    
    // Allocates The History Record data.
    history.name = req.body.name;
    history.icon = req.body.icon;
    history.broadcaster = req.body.broadcaster;
    history.region = req.body.region;
    history.websiteUrl = req.body.websiteUrl;
    history.streamUrl = req.body.streamUrl;
    
    var upsertedData = history.toObject();
    
    delete upsertedData._id;
    
    History.update({ _id: id }, {$set: upsertedData }, {upsert: true}, function(err, historyitem) {
        // we have the updated user returned to us
        console.log(historyitem);
        res.json(historyitem);
    });
});

//-----------------------Favorites-------------------//

// Updates a FavoritesList Item To The Database
app.put('/api/favoriteslist/:id', function(req, res){
    var id = req.params.id;
    console.log("Favorites ID: " + id);
    
    var favorites = new Favorites();
    
    // Allocates The Favorites Record data.
    favorites.name = req.body.name;
    favorites.icon = req.body.icon;
    favorites.broadcaster = req.body.broadcaster;
    favorites.region = req.body.region;
    favorites.websiteUrl = req.body.websiteUrl;
    favorites.streamUrl = req.body.streamUrl;
    
    var upsertedData = favorites.toObject();
    
    delete upsertedData._id;
    
    Favorites.update({ _id: id }, {$set: upsertedData }, {upsert: true}, function(err, favorite) {
        // we have the updated user returned to us
        console.log(favorite);
        res.json(favorite);
    });
});

// Post API's

//------------------------Stations--------------------//

// Posts a StationsList Item
app.post('/api/stationslist', function(req, res){
    console.log(req.body);
    
    var stations = new Stations();
    
    // Allocates The Station Record data.
    stations.name = req.body.name;
    stations.icon = req.body.icon;
    stations.broadcaster = req.body.broadcaster;
    stations.region = req.body.region;
    stations.websiteUrl = req.body.websiteUrl;
    stations.streamUrl = req.body.streamUrl;
    
    stations.save(function(err, station){
        res.json(station);
    });
});

//----------------------Staff-Picks------------------//

// Posts a StaffPicksList Item
app.post('/api/staffpickslist', function(req, res){
    console.log(req.body);
    
    var staffpicks = new StaffPicks();
    
    // Allocates The Station Record data.
    staffpicks.name = req.body.name;
    staffpicks.icon = req.body.icon;
    staffpicks.stationid = req.body.stationid;
	staffpicks.stationname = req.body.stationname;
    
    staffpicks.save(function(err, pick){
        res.json(pick);
    });
});

//------------------------History--------------------//

// Posts a HistoryList Item
app.post('/api/historylist', function(req, res){
    console.log(req.body);
    
    var history = new History();
    
    // Allocates The History Record data.
    history.name = req.body.name;
    history.icon = req.body.icon;
    history.broadcaster = req.body.broadcaster;
    history.region = req.body.region;
    history.websiteUrl = req.body.websiteUrl;
    history.streamUrl = req.body.streamUrl;
    
    history.save(function(err, historyitem){
        res.json(historyitem);
    });
});

//-----------------------Favorites-------------------//

// Posts a FavoritesList Item
app.post('/api/favoriteslist', function(req, res){
    console.log(req.body);
    
    var favorites = new Favorites();
    
    // Allocates The Favorites Record data.
    favorites.name = req.body.name;
    favorites.icon = req.body.icon;
    favorites.broadcaster = req.body.broadcaster;
    favorites.region = req.body.region;
    favorites.websiteUrl = req.body.websiteUrl;
    favorites.streamUrl = req.body.streamUrl;
    
    history.save(function(err, historyitem){
        res.json(historyitem);
    });
});

// Delete API's

//------------------------Stations--------------------//

// Deletes a StationsList Item
app.delete('/api/stationslist/:id', function(req, res){
    var id = req.params.id;
    console.log("Station ID: " + id);
    
    Stations.remove({ _id: id }, function(err, station){
        res.json(station);
    });
});

//----------------------Staff-Picks------------------//

// Deletes a StaffPicksList Item
app.delete('/api/staffpickslist/:id', function(req, res){
    var id = req.params.id;
    console.log("Pick ID: " + id);
    
    StaffPicks.remove({ _id: id }, function(err, pick){
        res.json(pick);
    });
});

//------------------------History--------------------//

// Deletes a HistoryList Item
app.delete('/api/historylist/:id', function(req, res){
    var id = req.params.id;
    console.log("History ID: " + id);
    
    History.remove({ _id: id }, function(err, history){
        res.json(history);
    });
});

//-----------------------Favorites-------------------//

// Deletes a FavoritesList Item
app.delete('/api/favoriteslist/:id', function(req, res){
    var id = req.params.id;
    console.log("Favorites ID: " + id);
    
    Favorites.remove({ _id: id }, function(err, favorite){
        res.json(favorite);
    });
});

////////////////////////////////////////////////////////
//-----------------Server-Info-Section----------------//
////////////////////////////////////////////////////////

// Starts Server
app.listen(port);
console.log('Elavate API and Web App is Running on port 2000');
