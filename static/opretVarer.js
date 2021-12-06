let form = document.getElementById('varerForm');
let egneVarer = document.getElementById('egneVarer');
let list = document.getElementById('list')
let minEmail = document.getElementById('email')

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const data = new FormData(form);
    
    await fetch('http://localhost:3030/opretVarer', {
        method: 'POST',
        body: data
    })
});

let localstorageUser = localStorage.getItem("email");
let denneEmail = document.getElementById('denneEmail')

const bruger = localStorage.getItem("email");

egneVarer.addEventListener('click', async () => {
    

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

    await fetch('http://localhost:3030/alleVarer', {
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

