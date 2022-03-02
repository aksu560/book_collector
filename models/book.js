"use strict";
// This file ensures that typescript does correct type checking.
// Credit goes to https://medium.com/swlh/typescript-with-mongoose-and-node-express-24073d51d2ee
exports.__esModule = true;
exports.Book = void 0;
var mongoose = require("mongoose");
var bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
});
bookSchema.statics.build = function (attr) {
    return new Book(attr);
};
var Book = mongoose.model('Book', bookSchema);
exports.Book = Book;
