"use strict";
exports.__esModule = true;
exports.establishConnection = void 0;
var mongoose = require("mongoose");
var establishConnection = function () {
    mongoose.connect('mongodb://localhost:27017/books', {}, function () {
        console.log('Connected to MongoDB');
    });
};
exports.establishConnection = establishConnection;
