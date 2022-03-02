"use strict";
exports.__esModule = true;
var express = require("express");
var db_1 = require("./db");
var book_1 = require("./routes/book");
db_1.establishConnection();
var app = express();
app.use(book_1.bookRouter);
app.listen(3000, function () {
    console.log('API is running on port 3000');
});
