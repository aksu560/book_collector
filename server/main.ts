import * as express from 'express';
import { establishConnection } from './db';
import { bookRouter } from './routes/book';

establishConnection();

const app = express();
app.use(bookRouter);

app.listen(3000, () => {
    console.log('API is running on port 3000');
});