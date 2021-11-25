const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const fs = require('fs')


// Gør så vi kan se vores værdier når vi registerer, dvs req.body.name fx
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.listen(3030, () => {
    console.log('Serveren kører på http://localhost:3030')
});



// Homepage
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

// Login page

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/login.html');
});

// Register page
app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/views/register.html');
});


// Save user - vi bruger appendfile så den ikke overwriter hver gang, hvilket den gør med fs.writefile
app.post('/register', (req, res) => {
    
    fs.appendFile('db/users.json', JSON.stringify(req.body, null, 4), err => {
        if(err) res.send(err)
        res.redirect('/login')
        
    })
})

// Login med rigtige details



    
