fetch('api.json')
    .then(response => response.json())
    .then(data => {
        PopupEventListeners(data);
    })
    .catch(error => console.error('Error loading JSON:', error));


    function PopupEventListeners(data) {
        const PopupButtons = document.querySelectorAll('.openPopup');
        PopupButtons.forEach(button => {
            button.addEventListener('click', () => {
                const drinkName = button.previousElementSibling.textContent.trim();
                const drink = data.drinks.find(d => d.name === drinkName);
                const food = data.Pairing.find(f => f.name === drinkName);
    
                if (drink) {
                    openPopup(drink, 'drink');
                } else if (food) {
                    openPopup(food, 'pairing');
                } else {
                    console.error('Item not found in data:', drinkName);
                }
            });
        });
    }


    function openPopup(item, type) {
        let popup = document.getElementById('popup');
        let title = document.getElementById('popup-title');
        let description = document.getElementById('popup-description');
        let ingredientsContainer = document.getElementById('popup-ingredients');
    
        title.textContent = item.name;
        description.textContent = item.description;
    
        ingredientsContainer.innerHTML = ''; // Clear previous contents
    

        const heading = document.createElement('h5');
        heading.textContent = type === 'drink' ? 'Ingredients' : 'Eat it with:';
        ingredientsContainer.appendChild(heading);

        if (type === 'drink') {
            item.ingredients.forEach(ingredient => {
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = ingredient;
                checkbox.name = ingredient;
    
                const label = document.createElement('label');
                label.htmlFor = ingredient;
                label.textContent = ingredient;
    
                ingredientsContainer.appendChild(checkbox);
                ingredientsContainer.appendChild(label);
                ingredientsContainer.appendChild(document.createElement('br'));

                

            });
        } else if (type === 'pairing') {
            item.pairing.forEach(drink => {
    
                const label = document.createElement('label');
                label.htmlFor = drink;
                label.textContent = drink;
    
                ingredientsContainer.appendChild(checkbox);
                ingredientsContainer.appendChild(label);
                ingredientsContainer.appendChild(document.createElement('br')); // Line break for spacing
            });
        }
    
        popup.style.display = 'flex';
    }
    

document.addEventListener('click', event => {
    if (event.target.classList.contains('close-popup')) {
        document.getElementById('popup').style.display = 'none';
    }
});
