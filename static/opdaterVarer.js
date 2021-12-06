document.addEventListener("DOMContentLoaded", function() {

let egneVarer = document.getElementById('egneVarer');
let list = document.getElementById('list')
let opdaterKnap = document.getElementById('opdaterKnap');

    
opdaterKnap.addEventListener("click", (e) => {
    e.preventDefault();

    let newName = document.getElementById("nytNavn").value;
    let newPrice = document.getElementById("nyPris").value;
    let newCategory = document.getElementById("nyKategori").value;
    let ID = document.getElementById("productID").value;

    let opdateretVare = {
        productID: ID,
        productName: newName,
        productPrice: newPrice,
        productCategory: newCategory,
    }
    fetch("http://localhost:3030/opdaterVarer", {
        method: "PUT",
        headers: {
            "content-Type": "application/json"
        },
        body: JSON.stringify(opdateretVare)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
    })
    .catch((error) => {
        console.log(error)
    })
})




egneVarer.addEventListener('click', async () => { // Dette er bare en kopi fra vores Opretvarer, hvor vi kan se alle de varer vi har til salg
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
})
