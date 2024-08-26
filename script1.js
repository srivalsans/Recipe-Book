document.getElementById('recipe-form').addEventListener('submit', addRecipe);
document.getElementById('search-box').addEventListener('input', searchRecipes);

function addRecipe(e) {
    e.preventDefault();

    const name = document.getElementById('recipe-name').value;
    const ingredients = document.getElementById('recipe-ingredients').value;
    const steps = document.getElementById('recipe-steps').value;
    const image = document.getElementById('recipe-image').files[0];

    const reader = new FileReader();
    reader.onload = function(event) {
        const recipeImage = event.target.result;

        const recipe = {
            name,
            ingredients,
            steps,
            image: recipeImage,
        };

        let recipes = localStorage.getItem('recipes') ? JSON.parse(localStorage.getItem('recipes')) : [];
        recipes.push(recipe);
        localStorage.setItem('recipes', JSON.stringify(recipes));

        displayRecipes();
        document.getElementById('recipe-form').reset();
    };

    reader.readAsDataURL(image);
}

function displayRecipes() {
    const recipesContainer = document.getElementById('recipes');
    recipesContainer.innerHTML = '';

    let recipes = localStorage.getItem('recipes') ? JSON.parse(localStorage.getItem('recipes')) : [];
    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');

        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.name}">
            <h3>${recipe.name}</h3>
            <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
            <p><strong>Steps:</strong> ${recipe.steps}</p>
            <button class="view-details">View Details</button>
        `;

        recipesContainer.appendChild(recipeCard);
    });
}

function searchRecipes(e) {
    const searchTerm = e.target.value.toLowerCase();
    const recipes = document.querySelectorAll('.recipe-card');

    recipes.forEach(recipe => {
        const name = recipe.querySelector('h3').textContent.toLowerCase();
        const ingredients = recipe.querySelector('p').textContent.toLowerCase();

        if (name.includes(searchTerm) || ingredients.includes(searchTerm)) {
            recipe.style.display = 'block';
        } else {
            recipe.style.display = 'none';
        }
    });
}

// Initial display of recipes
document.addEventListener('DOMContentLoaded', displayRecipes);
