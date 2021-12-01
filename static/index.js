const logUd = document.querySelector('#glemnavn');
const h1 = document.querySelector('h1')
const mitLogin = document.querySelector('#mitLogin')

logUd.addEventListener('click', function(){
    localStorage.clear()
    nameDisplay()
    mitLogin.style.display = 'inline'
})

function nameDisplay() {
    if(localStorage.getItem('email')){
        let email = localStorage.getItem('email');
        h1.textContent = 'Velkommen ' + email;
        mitLogin.style.display = 'none'
        } else {
            h1.textContent = 'Velkommen til';
        }
    };


    document.body.onload = nameDisplay

