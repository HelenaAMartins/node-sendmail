require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')

const sendmail = require('./api/sendmail');

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/sendmail', sendmail);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));