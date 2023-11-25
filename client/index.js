document.addEventListener("DOMContentLoaded", function () {
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

    fetch(`http://localhost:8000/recent_products`)
        .then(response => response.json())
        .then(products => {
            const wineBlocksContainer = document.querySelector('.wine-blocks');

            products.forEach(product => {
                const wineBlock = document.createElement('div');
                wineBlock.classList.add('wine-block');

                const image = document.createElement('img');
                image.src = product.image;
                image.alt = 'Вино';

                wineBlock.addEventListener('click', () => {
                    window.location.href = `detail.html?id=${product.id}`;
                });

                const paragraph = document.createElement('p');
                paragraph.textContent = product.name;

                wineBlock.appendChild(image);
                wineBlock.appendChild(paragraph);

                wineBlocksContainer.appendChild(wineBlock);
            });
        });
});
