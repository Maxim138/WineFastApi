document.addEventListener('DOMContentLoaded', () => {
    const countrySelect = document.getElementById('country_id');
    const wineForm = document.getElementById('wineForm');

    fetch("http://localhost:8000/categories")
        .then(response => response.json())
        .then(countries => {
            countries.forEach(category => {
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

                const option = document.createElement('option');
                option.value = category.id;
                option.text = category.name;
                country_id.appendChild(option);
            });
        });

    wineForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(wineForm);
        const jsonData = {};

        formData.forEach((value, key) => {
            jsonData[key] = value;
        });

        fetch("http://localhost:8000/create", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData),
        })
            .then(response => {
                if (response.ok) {
                    wineForm.reset();
                    alert("Добавлено!");
                }
            })
    });
});