fetch('api.json')
    .then(response => response.json())
    .then(data => {
        PopupEventListeners(data); 
    })
    .catch(error => console.error('Error loading JSON:', error));


function PopupEventListeners(data) {
    let PopupButtons = document.querySelectorAll('.openPopup');

    PopupButtons.forEach(button => {
        button.addEventListener('click', () => {
            let drinkName = button.previousElementSibling.textContent.trim(); 
            let drink = data.drinks.find(d => d.name === drinkName);

            if (drink) {
                openPopup(drink); 
            } else {
                console.error('Drink not found in data');
            }
        });
    });
}

function openPopup(drink) {
    let popup = document.getElementById('popup');
    let title = document.getElementById('popup-title');
    let description = document.getElementById('popup-description');
    let ingredientsList = document.getElementById('popup-ingredients');

    
    title.textContent = drink.name;
    description.textContent = drink.description;

    ingredientsList.innerHTML = '';
    drink.ingredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.textContent = ingredient;
        ingredientsList.appendChild(li);
    });

    popup.style.display = 'flex';
}

document.addEventListener('click', event => {
    if (event.target.classList.contains('close-popup')) {
        document.getElementById('popup').style.display = 'none';
    }
});


