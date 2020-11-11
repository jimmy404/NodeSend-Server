const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

connectDB();

const optionsCors = {
    origin: process.env.FRONTEND_URL
}
app.use(cors(optionsCors));

const port = process.env.PORT || 4000;

app.use(express.json());

app.use(express.static('uploads'));

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/links', require('./routes/links'));
app.use('/api/files', require('./routes/files'));

app.listen(port, '0.0.0.0', () => {
    console.log(`The server is running on the port ${port}`);
});
