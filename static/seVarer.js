
function varerCategory() {
    const kategori = document.getElementById("kategori").value;

    fetch("http://localhost:3030/kategorier", {
        method: "GET",
    })
    .then((res) => res.json())
    .then((res) => {
        if (res) {

            var varer = 
            '<ul>'
            
            res.forEach(function(e) {
                if(kategori === "all") {

                    varer += `
                    <tr>
                        Kategori: <td>${e.varerKategori}</td> <br>
                        Pris: <td>${e.pris}</td> <br>
                        Navn: <td>${e.varerNavn}</td> <br>
                        Billede: <td><img src="${e.varerBillede}" style="height:50px;width:50px;" /></td> <br>
                        <br>
                        <br>
                    </tr>
                    `;

                } else if (e.varerKategori === kategori) {

                    varer += `
                    <tr>
                        Kategori: <td>${e.varerKategori}</td> <br>
                        Pris: <td>${e.pris}</td> <br>
                        Navn: <td>${e.varerNavn}</td> <br>
                        Billede: <td><img src="${e.varerBillede}" style="height:50px;width:50px;" /></td> <br>
                        <br>
                        <br>
                    </tr>
                    `;
                }
            }); 

            varer += 
            "</ul";

            document.getElementById("Varer").innerHTML = varer;
        }
    })
}



