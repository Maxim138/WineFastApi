document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:8000/categories")
    .then(response => response.json())
    .then(categories => {
        console.log(categories);
    })

    fetch(`http://localhost:8000/products?category_id=${1}`)
        .then(response => response.json())
        .then(products => {
            console.log(products);
    })
});
