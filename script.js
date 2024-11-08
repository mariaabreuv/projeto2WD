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
            let food = data.Pairing.find(f => f.name === drinkName);

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
    let title = document.getElementById('popupTitle');
    let description = document.getElementById('popupDescription');
    let ingredientsContainer = document.getElementById('popupIngredients');
    let stepsContainer = document.getElementById('popupSteps');
    let pair = document.getElementById('popupPair');

    title.textContent = item.name;
    description.textContent = item.description;

    ingredientsContainer.innerHTML = '';
    stepsContainer.innerHTML = '';

    let heading = document.createElement('h5');
    heading.textContent = type === 'drink' ? 'Ingredients' : 'Eat it with:';
    ingredientsContainer.appendChild(heading);

    if (type === 'drink') {
        item.ingredients.forEach(ingredient => {
            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = ingredient;
            checkbox.name = ingredient;

            let label = document.createElement('label');
            label.htmlFor = ingredient;
            label.textContent = ingredient;

            ingredientsContainer.appendChild(checkbox);
            ingredientsContainer.appendChild(label);
            ingredientsContainer.appendChild(document.createElement('br'));
        });

        let instructions = document.createElement('h5');
        instructions.textContent = 'Step by step:';
        stepsContainer.appendChild(instructions);

        let ol = document.createElement('ol');
        item.steps.forEach(step => {
            let li = document.createElement('li');
            li.textContent = step;
            ol.appendChild(li);
        });
        stepsContainer.appendChild(ol);

        pair.textContent = 'Perfect with: ' + item.pairing;
        
    } else if (type === 'pairing') {
        item.pairing.forEach(drink => {
            let label = document.createElement('label');
            label.textContent = drink;
            ingredientsContainer.appendChild(label);
            ingredientsContainer.appendChild(document.createElement('br'));
        });
    }

    popup.style.display = 'flex';
}




document.addEventListener('click', event => {
    if (event.target.classList.contains('closePopup')) {
        document.getElementById('popup').style.display = 'none';
    }
});


if (window.innerWidth <= 768) {
    // Mobile-only swipe functionality
    let currentIndex = 0;
    const cards = document.querySelectorAll('.cards');

    function showCard(index) {
        cards.forEach((card, i) => {
            card.style.transform = `translateX(${100 * (i - index)}%)`;
        });
    }

    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);

    let xDown = null;

    function handleTouchStart(evt) {
        xDown = evt.touches[0].clientX;
    }

    function handleTouchMove(evt) {
        if (!xDown) return;

        let xUp = evt.touches[0].clientX;
        let xDiff = xDown - xUp;

        if (xDiff > 0) {
            currentIndex = (currentIndex + 1) % cards.length;  // Swipe left
        } else {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;  // Swipe right
        }

        showCard(currentIndex);
        xDown = null;
    }
}
