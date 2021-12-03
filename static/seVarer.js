

function getAllProductsWithCategory() {
    const category = document.getElementById('category').value


    fetch('http://localhost:3030/items', {
        method: "GET",
    })
    .then((res) => res.json())
    .then((res) => {
        if (res) {
            var visVarer = '<ul>'

            response.forEach(function(product) {
                if(category === "all"){
                    visVarer +=

                    "<li>"
                    + " "
                    + "Produkt:" + " " + product.varerNavn + " " + "<br>"
                    + "Kategori:" + " " + product.varerKategori + " " + "<br>"
                    + "Pris:" + " " + product.pris + " " + "<br>"
                    + "Billede:" + " " + product.varerBillede + " " + "<br>"

                    "</li>";
                } else if (product.varerKategori === category) {
                    visVarer +=
                    "<li>"
                    + " "
                    + "Produkt:" + " " + product.product + " " + "<br>"
                    + "Kategori:" + " " + product.category + " " + "<br>"
                    + "Pris:" + " " + product.pris + " " + "<br>"
                    + "Billede:" + " " + product.image + " " + "<br>"

                    "</li>";
                }
            });
            visVarer += "</ul>";

            document.getElementById('productContainer').innerHTML = visVarer;
        }
    })
}