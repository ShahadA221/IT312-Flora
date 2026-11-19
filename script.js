/*---------------------------------------- ...................... ----------------------------------------shahad*/








/*==================================================================================================================================================*/

/*-------------------------------------------------Workshops-page---------------------------------------------------alya*/

var grid = document.querySelector(".workshop-grid");
var sortMenu = document.getElementById("sort");

// get all the workshop cards as a list
function getCards() {
    return Array.from(grid.querySelectorAll(".workshop-card"));
}

// read the number from the price text
function getPrice(card) {
    return parseFloat(card.querySelector(".price").textContent);
}

// read the workshop name from the card title
function getName(card) {
    return card.querySelector("h2").textContent;
}

// put the cards back on the page in the new order
function showCards(cards) {
    for (var i = 0; i < cards.length; i++) {
        grid.appendChild(cards[i]);
    }
}

// random order (used when the page first opens)
function shuffleCards() {
    var cards = getCards();
    cards.sort(function () { return Math.random() - 0.5; });
    showCards(cards);
}

// sort the cards depending on what the user chose
function sortCards() {
    var choice = sortMenu.value;
    var cards = getCards();

    if (choice === "price-asc") {
        cards.sort(function (a, b) { return getPrice(a) - getPrice(b); });
    } else if (choice === "price-desc") {
        cards.sort(function (a, b) { return getPrice(b) - getPrice(a); });
    } else if (choice === "name-asc") {
        cards.sort(function (a, b) { return getName(a).localeCompare(getName(b)); });
    } else if (choice === "name-desc") {
        cards.sort(function (a, b) { return getName(b).localeCompare(getName(a)); });
    } else {
        shuffleCards();
        return;
    }
    showCards(cards);
}

// only run on the Workshops page (the other pages have no grid)
if (grid && sortMenu) {
    shuffleCards();
    sortMenu.addEventListener("change", sortCards);
}


/*==================================================================================================================================================*/

/*---------------------------------------- ...................... ----------------------------------------tala*/



/*==================================================================================================================================================*/

/*---------------------------------------- ...................... ----------------------------------------norah*/





