let refresh = document.getElementById('refresh');
let sletForm = document.getElementById('sletForm')
let sletKnap = document.getElementById('sletKnap')

sletKnap.addEventListener('click', (e) => {
    e.preventDefault();
    
    let slet = document.getElementById('sletDinVarer').value;

    

    fetch('http://localhost:3030/sletVarer/' + slet, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
    }) .then(res => res.json())
    .then(data => {
        console.log(data)
        alert('Succes' + data.msg)
    })
    .catch((error) => {
        console.log('Error:', error)
    })
});




refresh.addEventListener('click', async () => { // Dette er bare en kopi fra vores Opretvarer, hvor vi kan se alle de varer vi har til salg
    const bruger = localStorage.getItem("email");

    list.innerHTML = `
    <tr>
        <th>Email</th>
        <th>ID</th>
        <th>Varernavn</th>
        <th>Pris</th>
        <th>Kategori</th>
        <th>Billede</th>
    </tr>
    `;

    await fetch('http://localhost:3030/items', {
        method: 'GET'
    })
    .then((res) => res.json())
    .then((res) => {
        console.log(res)

        res.forEach((e) => {
            if(e.email === bruger){ // Dette gør at man kun kan se sine egne varer, da den email du har skrevet skal være = localstorage email'en
            list.innerHTML += `
            <tr>
                <td>${e.email}</td> 
                <td>${e.varerID}</td> 
                <td>${e.varerNavn}</td> 
                <td>${e.pris}</td>       
                <td>${e.varerKategori}</td>       
                <td><img src="${e.varerBillede}" style='height:60px;width:60px;' /></td>             
            </tr>
            `;
        } 
        })
    })
    
})

