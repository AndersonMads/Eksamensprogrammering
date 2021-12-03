let form = document.getElementById('varerForm');
let refresh = document.getElementById('refresh');
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

refresh.addEventListener('click', async () => {
    

    list.innerHTML = `
    <tr>
        <th>Title</th>
        <th>Price</th>
        <th>Kategori</th>
        <th>Image</th>
    </tr>
    `;

    await fetch('http://localhost:3030/items', {
        method: 'GET'
    })
    .then((res) => res.json())
    .then((res) => {
        console.log(res)

        res.forEach((e) => {
            list.innerHTML += `
            <tr>
                <td>${e.email}</td> 
                <td>${e.pris}</td>       
                <td>${e.varerKategori}</td>       
                <td><img src="${e.varerBillede}" style='height:50px;width:50px;' /></td>             
            </tr>
            `;
        })
    })
})

