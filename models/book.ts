// This file ensures that typescript does correct type checking.
// Credit goes to https://medium.com/swlh/typescript-with-mongoose-and-node-express-24073d51d2ee

import * as mongoose from "mongoose";

interface IBook {
    title: string;
    description?: string;
    author: string;
}

interface bookModelInterface extends mongoose.Model<BookDoc> {
    build(attr: IBook): BookDoc
}

interface BookDoc extends mongoose.Document {
    title: string;
    description: string;
    author: string
}

const bookSchema = new mongoose.Schema({
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

bookSchema.statics.build = (attr: IBook) => {
    return new BookModel(attr);
}

const BookModel = mongoose.model<BookDoc, bookModelInterface>('Book', bookSchema);

export { BookModel }