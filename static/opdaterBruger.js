let opdater = document.getElementById("updateKnap")
let newEmail = document.getElementById('nyemail');



opdater.addEventListener('click', function(){
    localStorage.setItem('email', newEmail.value)
})

