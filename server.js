const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.listen(3030, () => {
    console.log('Serveren kører på http://localhost:3030')
});

// Homepage
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

// Register page

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/login.html')
});

