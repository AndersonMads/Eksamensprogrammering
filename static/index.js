const logUd = document.querySelector('#glemnavn');
const h1 = document.querySelector('h1')
const mitLogin = document.querySelector('#mitLogin')
const sletBruger = document.getElementById('sletBruger')
const opdaterBruger = document.getElementById('opdaterBruger')
const opretProdukt = document.getElementById('opretProdukt')
const seVarer = document.getElementById('seVarer')

logUd.addEventListener('click', function(){
    localStorage.clear()
    navnPåForside()
    mitLogin.style.display = 'inline'
})

function navnPåForside() {
    if(localStorage.getItem('email')){
        let email = localStorage.getItem('email');
        h1.textContent = 'Velkommen ' + email;
        mitLogin.style.display = 'none'
        } else {
            h1.textContent = 'Velkommen ukendte ven';
            sletBruger.style.display = 'none'
            opdaterBruger.style.display = 'none'
            opretProdukt.style.display = 'none'
            seVarer.style.display = 'none'
            sletVarer.style.display = 'none'
            opdaterVarer.style.display = 'none'
        }
    };

document.body.onload = navnPåForside

