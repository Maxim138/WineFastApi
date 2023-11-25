document.addEventListener('DOMContentLoaded', () => {
    const productId = new URLSearchParams(window.location.search).get('id');

    fetch(`http://localhost:8000/product/${productId}`)
        .then(response => response.json())
        .then(product => {
            const wineDetailsContainer = document.getElementById('wineDetails');
            const wineBlock = document.createElement('div');
            wineBlock.classList.add('wine-image');
            const image = document.createElement('img');
            image.src = product[0].image;
            image.alt = 'Вино';
            const div = document.createElement('div');
            div.classList.add('heading');
            const title = document.createElement('h2');
            title.textContent = product[0].name;
            const country = document.createElement('h4');
            country.textContent = "Страна: " + product[1].name;
            const p = document.createElement('p');
            p.textContent = product[0].description;
            wineBlock.appendChild(image);
            wineDetailsContainer.appendChild(wineBlock);
            div.appendChild(title);
            div.appendChild(country);
            wineDetailsContainer.appendChild(div);
            wineDetailsContainer.appendChild(p);
        })

    fetch("http://localhost:8000/categories")
        .then(response => response.json())
        .then(categories => {
            categories.forEach(category => {
                const categoryLink = document.createElement('a');
                categoryLink.href = `products.html?id=${category.id}`;
                categoryLink.textContent = category.name;

                categoryLink.addEventListener('click', (event) => {
                    event.preventDefault();
                    window.location.href = categoryLink.href;
                });

                const categoryItem = document.createElement('div');
                categoryItem.classList.add('category-item');
                categoryItem.appendChild(categoryLink);
                categoryList.appendChild(categoryItem);
            });
        });
});