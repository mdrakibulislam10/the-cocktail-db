// load data
const loadCocktail = (searchText) => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`)
        .then(res => res.json())
        .then(data => displayCocktail(data.drinks))
        .catch(err => console.log(err))
};
// optional
loadCocktail("margarita");

// display cocktail
const displayCocktail = cocktails => {
    // console.log(cocktails);
    const cocktailParent = document.getElementById("cocktail-parent");
    cocktailParent.innerHTML = "";

    cocktails.forEach(cocktail => {
        // console.log(cocktail);
        const { strDrink, strDrinkThumb, idDrink } = cocktail;

        const div = document.createElement("div");

        div.innerHTML = `
        <label for="my-modal-3" onclick="cocktailDetailsLoad('${idDrink}')" class="card card-compact w-full bg-base-100 shadow-xl" style="cursor: pointer;">

        <figure><img src="${strDrinkThumb}" alt="Cocktail" /></figure>
        <div class="card-body text-center">
            <p>${strDrink}</p>
        </div>

        </label>`;

        cocktailParent.appendChild(div);

    })
};

// search
const searchBtn = () => {
    const searchText = document.getElementById("search-box").value;
    loadCocktail(searchText);
};

// cocktail details
const cocktailDetailsLoad = async (id) => {
    const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await res.json();
    displayDetails(data.drinks[0]);
};

// set innerText
const setInnerText = (elementId, text) => {
    document.getElementById(elementId).innerText = text;
};

// display details
const displayDetails = cocktail => {
    // console.log(cocktail);
    const { strDrinkThumb, strDrink, strTags } = cocktail;

    const imgDetails = document.getElementById("img-details");
    imgDetails.setAttribute("src", strDrinkThumb);

    setInnerText("drinks-name", strDrink);
    setInnerText("drinks-tag-line", strTags ? strTags : "Please order!");
};