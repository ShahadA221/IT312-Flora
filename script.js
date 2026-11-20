/*---------------------------------------- ...................... ----------------------------------------shahad*/
// Theme switcher and persistence across all pages

const THEME_STORAGE_KEY = "flora_active_theme";
const THEME_TWO_CLASS = "theme-2";

function applySavedTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const isThemeTwo = savedTheme === "theme-2";

    document.body.classList.toggle(THEME_TWO_CLASS, isThemeTwo);
    updateThemeButtons(isThemeTwo);
}

function toggleTheme() { 
    const isThemeTwoActive = document.body.classList.contains(THEME_TWO_CLASS);
    const nextIsThemeTwo = !isThemeTwoActive;

    document.body.classList.toggle(THEME_TWO_CLASS, nextIsThemeTwo);
    localStorage.setItem(THEME_STORAGE_KEY, nextIsThemeTwo ? "theme-2" : "theme-1");
    updateThemeButtons(nextIsThemeTwo);
}

function updateThemeButtons(isThemeTwo) {
    const buttons = document.querySelectorAll("[data-theme-toggle], #themeToggleBtn");
    buttons.forEach((btn) => {
        btn.setAttribute("aria-pressed", String(isThemeTwo));
        btn.textContent = isThemeTwo ? "Theme 1" : "Theme 2";
    });
}

document.addEventListener("DOMContentLoaded", () => {
    applySavedTheme();

    const buttons = document.querySelectorAll("[data-theme-toggle], #themeToggleBtn");
    buttons.forEach((btn) => {
        btn.addEventListener("click", toggleTheme);
    });
});







/*==================================================================================================================================================*/

/*-------------------------------------------------Workshops-page---------------------------------------------------alya*/

var grid = document.getElementById("workshop-grid");
var sortMenu = document.getElementById("sort");

// make a list (array) with the name, price and html of every workshop card
function getWorkshops() {
    var cards = grid.getElementsByClassName("workshop-card");
    var list = [];

    for (var i = 0; i < cards.length; i++) {
        var workshop = {
            name: cards[i].getElementsByTagName("h2")[0].innerHTML,
            price: parseFloat(cards[i].getElementsByClassName("price")[0].innerHTML),
            html: cards[i].innerHTML
        };
        list.push(workshop);
    }
    return list;
}

// show the workshops on the page in the order of the list
function showWorkshops(list) {
    var result = "";

    for (var i = 0; i < list.length; i++) {
        result = result + '<article class="workshop-card">' + list[i].html + "</article>";
    }
    grid.innerHTML = result;
}

// random order (used when the page first opens)
function shuffleWorkshops() {
    var list = getWorkshops();

    for (var i = list.length - 1; i > 0; i--) {
        // pick a random place from 0 to i, then swap the two workshops
        var j = Math.floor(Math.random() * (i + 1));
        var temp = list[i];
        list[i] = list[j];
        list[j] = temp;
    }
    showWorkshops(list);
}

// true if the two workshops are in the wrong order for the chosen sorting
function wrongOrder(first, second, choice) {
    if (choice == "price-asc") {
        return first.price > second.price;
    } else if (choice == "price-desc") {
        return first.price < second.price;
    } else if (choice == "name-asc") {
        return first.name > second.name;
    } else if (choice == "name-desc") {
        return first.name < second.name;
    }
    return false;
}

// sort the workshops depending on what the user chose
function sortWorkshops() {
    var choice = sortMenu.value;

    if (choice == "") {
        shuffleWorkshops();
        return;
    }

    var list = getWorkshops();

    // compare neighbours and swap them if they are in the wrong order
    for (var i = 0; i < list.length - 1; i++) {
        for (var j = 0; j < list.length - 1 - i; j++) {
            if (wrongOrder(list[j], list[j + 1], choice)) {
                var temp = list[j];
                list[j] = list[j + 1];
                list[j + 1] = temp;
            }
        }
    }
    showWorkshops(list);
}

// only run on the Workshops page (the other pages have no grid)
if (grid != null) {
    shuffleWorkshops();
    sortMenu.onchange = sortWorkshops;
}


/*==================================================================================================================================================*/

/*---------------------------------------- ...................... ----------------------------------------tala*/



/*==================================================================================================================================================*/

/*---------------------------------------- ...................... ----------------------------------------norah*/

/* ==================== About Us - Norah ==================== */

var joinTeamForm = document.querySelector(".join-team-form");

if (joinTeamForm != null) {

    joinTeamForm.onsubmit = function(event) {

        event.preventDefault();

        var fields = joinTeamForm.querySelectorAll("[required]");

        // Check for empty fields
        for (var i = 0; i < fields.length; i++) {
            if (fields[i].value.trim() == "") {
                alert("Please fill in all required fields.");
                fields[i].focus();
                return;
            }
        }

        var fullName = document.getElementById("team-name").value.trim();
        var birthDate = document.getElementById("team-birth-date").value;
        var photo = document.getElementById("team-photo").files[0];

        // Name cannot start with a number
        if (/^[0-9]/.test(fullName)) {
            alert("Full Name cannot start with a number.");
            return;
        }

        // Only image files are allowed
        if (!photo || !/^image\//.test(photo.type)) {
            alert("Please upload a valid image file.");
            return;
        }

        // Birth year must be 2008 or earlier
        var birthYear = Number(birthDate.substring(0, 4));

        if (birthYear > 2008) {
            alert("Birth year must be 2008 or earlier.");
            return;
        }

        // Confirmation message
        alert("Thank you, " + fullName +
              "! Your application has been submitted successfully.");

    };

}

/* ==================== Join Workshop - Norah ==================== */

var joinWorkshopForm = document.querySelector(".join-workshop-form");

if (joinWorkshopForm != null) {

    // Use JavaScript to display specific validation alerts
    joinWorkshopForm.noValidate = true;

    joinWorkshopForm.onsubmit = function(event) {

        event.preventDefault();

        var workshop = document.getElementById("workshop");
        var fullName = document.getElementById("full-name").value.trim();
        var dateValue = document.getElementById("preferred-date").value;

        // Check workshop selection
        if (workshop.value == "") {
            alert("Please select a workshop.");
            return;
        }

        // Check full name
        if (fullName == "") {
            alert("Please enter your full name.");
            return;
        }

        // Full name must contain at least two words and letters only
        var namePattern = /^[A-Za-z\u0621-\u064A]+(\s+[A-Za-z\u0621-\u064A]+)+$/;

        if (!namePattern.test(fullName)) {
            alert("Please enter your full name using letters only, with no numbers or special characters.");
            return;
        }

        // Check preferred date
        if (dateValue == "") {
            alert("Please select your preferred date.");
            return;
        }

        var preferredDate = new Date(dateValue + "T00:00:00");
        var today = new Date();

        today.setHours(0, 0, 0, 0);

        if (isNaN(preferredDate.getTime()) || preferredDate <= today) {
            alert("Please select a future date.");
            return;
        }

        // Get selected workshop name
        var workshopName = workshop.options[workshop.selectedIndex].text.trim();

        // Ask the member whether to stay or return to the dashboard
        var leavePage = confirm(
            "Your participation request has been sent successfully!\n\n" +
            "Click OK to return to Member Dashboard.\n" +
            "Click Cancel to stay on this page."
        );

        if (leavePage) {
            window.location.href = "Member_Dashboard.html";
        } else {

            var requestsBox = document.getElementById("join-workshop-requests");

            // Add a heading when the first request is submitted
            if (requestsBox.children.length == 0) {
                var heading = document.createElement("h3");
                heading.textContent = "Your Participation Requests";
                requestsBox.appendChild(heading);
            }

            // Display each request without deleting previous requests
            var newRequest = document.createElement("p");

            newRequest.textContent =
                "Workshop: " + workshopName +
                " | Member: " + fullName +
                " | Preferred Date: " + dateValue;

            requestsBox.appendChild(newRequest);

            // Clear the form for another request
            joinWorkshopForm.reset();
        }
    };
}





