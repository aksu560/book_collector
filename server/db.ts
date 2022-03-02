import * as mongoose from "mongoose";

export const establishConnection = () => {
    mongoose.connect('mongodb://localhost:27017/books', {}, () => {
        console.log('Connected to MongoDB');
    });
}