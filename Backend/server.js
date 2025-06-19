const express = require('express');
const app = express();
const mongoose = require('mongoose')
require('dotenv').config();
const URI = process.env.DB_URI
mongoose.connect(URI)
const cors = require('cors');
const cookieParser = require('cookie-parser');
const db = mongoose.connection
db.once('open', ()=>{
    console.log('Connected to database successfully')
})
db.error((err) => {
    console.error('Database connection error:', err);
}
);
app.use(express.json());
app.use(cors())
app.use(cookieParser());

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});