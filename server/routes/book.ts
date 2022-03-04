import * as bodyParser from 'body-parser';
import * as express from 'express';
import { BookModel } from '../../models/book';
import * as cors from 'cors';

const router = express.Router();
const jsonParser = bodyParser.json();

// Cors terribleness. We have to do it here, because typescripts definitions are weird.
// I guess a valid benefit is that we can specify cors separately for each route if we want to.
// See thread: https://stackoverflow.com/questions/59167258/no-overload-matches-this-call-in-cors-typescript
const corsOptions = cors({ origin: 'http://localhost:8080' });
router.use(corsOptions);
router.options('/api/books', corsOptions)

router.get('/api/books', async (req, res) => {
    const books = await BookModel.find();
    res.status(200).send(books);
});

router.post('/api/books', jsonParser , async (req, res) => {
    const { title, description, author } = req.body;
    
    if (title === undefined || description === undefined || author === undefined) {
        return res.status(400).send('Invalid Request');
    }

    const book = BookModel.build({ title, description, author });
    await book.save();
    res.status(201).send(book);
});

router.put('/api/books/:id', jsonParser, async (req, res) => {
    const { id } = req.params;
    const { title, description, author } = req.body;
    if (!(id && title && description && author)) {
        return res.status(400).send();
    }
    const book = await BookModel.findByIdAndUpdate(id, { title, description, author }, { new: true });
    res.status(200).send(book);
});

router.delete('/api/books/:id', async (req, res) => {
    const book = await BookModel.findByIdAndRemove(req.params.id);
    if (!book) {
        return res.status(200).send({});
    }
    res.status(200).send(book);
});

export { router as bookRouter }