import * as bodyParser from 'body-parser';
import * as express from 'express';
import { Book } from '../../models/book';

const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/api/books', async (req, res) => {
    const books = await Book.find();
    res.status(200).send(books);
});

router.post('/api/books', urlencodedParser , async (req, res) => {
    const { title, description, author } = req.body;
    
    if (!(title && description && author)) {
        return res.status(400).send('Invalid Request');
    }

    const book = Book.build({ title, description, author });
    await book.save();
    res.status(201).send(book);
});

router.put('/api/books/:id', urlencodedParser, async (req, res) => {
    const { id } = req.params;
    const { title, description, author } = req.body;
    console.log(id, title, description, author);
    if (!(id && title && description && author)) {
        return res.status(400).send();
    }
    const book = await Book.findByIdAndUpdate(id, { title, description, author }, { new: true });
    res.status(200).send(book);
});

router.delete('/api/books/:id', async (req, res) => {
    const book = await Book.findByIdAndRemove(req.params.id);
    if (!book) {
        // If no book is found, we return 204 so the client knows to not refresh data.
        return res.status(204).send({});
    }
    res.status(200).send(book);
});

export { router as bookRouter }