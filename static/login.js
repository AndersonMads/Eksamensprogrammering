const rememberDiv = document.querySelector('.loginDiv');
const form = document.querySelector('form');
const nameInput = document.querySelector('#email');
const submitBtn = document.querySelector('#skrivEmail');
const passwordInput = document.querySelector('#password');


submitBtn.addEventListener('click', function(){
    localStorage.setItem('email', nameInput.value);
})

submitBtn.addEventListener('click', function(){
    localStorage.setItem('password', passwordInput.value);
})

