import * as mongoose from "mongoose";

export function establishConnection() {
    mongoose.connect('mongodb://localhost:27017/books', {}, () => {
        console.log('Connected to MongoDB');
    });
}