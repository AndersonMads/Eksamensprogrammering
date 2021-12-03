const express = require('express');
const app = express();
const fs = require('fs')
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: true
}))
const cors = require('cors')
const formData = require('express-form-data')
const methodOverride = require('method-override'); // Dette gør at vi kan lave DELETE og PUT request i vores HTML Forms!
app.use(methodOverride('_method'));
app.use("/static", express.static('./static/'));
app.use('/pics', express.static('pics'));
const pictures = {
    uploadDir: './pics'
}
app.use(formData.parse(pictures))




// Gør så vi kan se vores værdier når vi registerer, dvs req.body.name fx
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.listen(3030, () => {
    console.log('Serveren kører på http://localhost:3030')
});

// Homepage - res.sendFile(__dirname) gør at vi kan render html'en
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

// Slet bruger page
app.get('/delete', (req, res) => {
    res.sendFile(__dirname + '/views/delete.html')
});

// Opdater bruger page
app.get('/update', (req, res) => {
    res.sendFile(__dirname + '/views/update.html');
});

// Opret varer
app.get('/opretVarer', (req, res) => {
    res.sendFile(__dirname + '/views/opretVarer.html')
});

// Se varer i kategori


// Se varer i kategori
app.get('/seVarer', (req, res) => {
    res.sendFile(__dirname + '/views/seVarer.html')
})




// Save user når man registrerer - vi laver først og fremmest users.json til et array så vi kan bruge array funktioner som .push
// Desuden er det nyttigt at vores users.json er et array senere hen, fordi vi så kan søge i det
app.post('/register', (req, res) => {

    let userDB = JSON.parse(fs.readFileSync('db/users.json'))
    userDB.push(req.body) // Her pusher vi req.body(i dette tilfælde inputtet i register form'en) til vores 'database' 
    fs.writeFile('db/users.json', JSON.stringify(userDB, null, 4), err => {
        if(err) res.send(err)
        res.redirect('/login') // Efter man har registreret sin bruger bliver man redirectet til login page
    })
})

// Login med de rigtige details - mangler at lave et else statement, hvis details fx ikke passer
app.post('/login', (req, res) => {
    const registeredUsers = fs.readFileSync('db/users.json');
    const authenticatedUsers = JSON.parse(registeredUsers)
    
    for (let i = 0; i < authenticatedUsers.length; i++)
        if (authenticatedUsers[i].email == req.body.email && authenticatedUsers[i].password == req.body.password){
            return res.redirect('/')      
        }
    
        
        return res.status(400).send('forkert info')
    });

// Slet bruger - basicallly præcis samme fremgangsmåde som login, bare med en splice array method som sletter vores input data
app.delete('/delete', (req, res) => {
    const registeredUsers = JSON.parse(fs.readFileSync('db/users.json'));
    
    for (let i = 0; i < registeredUsers.length; i++)
        if (registeredUsers[i].email == req.body.email){
            registeredUsers.splice(i, 1)
            fs.writeFile('db/users.json', JSON.stringify(registeredUsers, null, 4), err =>{
                if(err) res.end(err)
            })
            return res.send('Slettet')
        } 
      return res.status(400).json('ik slettet')   
        });

// Opdater bruger - her kan du enten opdatere email eller password, derfor et else if statement.
app.put('/update', (req, res) => {
    const registeredUsers = JSON.parse(fs.readFileSync('db/users.json'));

    for (let i = 0; i < registeredUsers.length; i++) {
        if(registeredUsers[i].email == req.body.email && registeredUsers[i].password == req.body.password) {
            registeredUsers[i].email = req.body.nyemail
            fs.writeFile('db/users.json', JSON.stringify(registeredUsers, null, 4), err => { // Laver en fs writefile i hvert if state ellers får man HTTP HEADER SENT fejl
                if(err) res.end(err)
            })
            return res.status(200).send('Emaillen er nu ændret, gå til http://localhost:3030 for at fortsætte')
        } else if(registeredUsers[i].password == req.body.mitpassword && registeredUsers[i].email == req.body.oldemail) {
            registeredUsers[i].password = req.body.nytpassword
            fs.writeFile('db/users.json', JSON.stringify(registeredUsers, null, 4), err => {
                if(err) res.end(err)
            })
            return res.status(200).send('Password er nu ændret, gå til http://localhost:3030 for at fortsætte')
        } 
    }
    return res.status(400).send('forkert info')
})


const varerTilSalg = JSON.parse(fs.readFileSync('db/opretVarer.json'));
// Opret varer med billede, varekategori og pris
app.post("/opretVarer", function (req,res) {
    let {email, varerNavn, pris, varerKategori} = req.body;
    let varerBillede = req.files.varerBillede.path.replace('\\', '/')
    
    varerTilSalg.push({ email, varerNavn, pris, varerKategori, varerBillede})

    fs.writeFile('db/opretVarer.json', JSON.stringify(varerTilSalg, null, 4), err => {
        if(err) res.end(err)
    })
})


app.get('/items', (req, res) => {
    res.send(varerTilSalg)
})



function allProducts(res) {
    let rawData = fs.readFileSync("db/opretVarer.json")
    const parsedData = JSON.parse(rawData)

    res.send(parsedData)
    return;
}

app.get('/items', (req, res) => {
    allProducts(res)
})

module.exports = app;


