/*---------------------------------------- ...................... ----------------------------------------shahad*/

//-----------------------------------------------------------------------HOME-page

// -------------------- Theme Switcher --------------------
var THEME_KEY = "flora_theme";

function applyTheme() {
    var savedTheme = localStorage.getItem(THEME_KEY);
    var btn = document.getElementById("themeToggleBtn");

    if (savedTheme == "theme-2") {
       document.body.classList.add("theme-2");
        if (btn != null) {
            btn.innerHTML = "🎨 Theme 1";}
    } else {
        document.body.classList.remove("theme-2");
        if (btn != null) {
            btn.innerHTML = "🎨 Theme 2";}}}


function switchTheme() {
    var currentTheme = localStorage.getItem(THEME_KEY);

    if (currentTheme == "theme-2") {
        localStorage.setItem(THEME_KEY, "theme-1");
    } else {
        localStorage.setItem(THEME_KEY, "theme-2");}

    applyTheme();}

function startPage() {
    applyTheme();
    initBackToTop();
    initEvaluationForm();

    var btn = document.getElementById("themeToggleBtn");
    if (btn != null) {
        btn.onclick = switchTheme;}}

window.onload = startPage ;


// -------------------- Back to Top Button --------------------
function initBackToTop() {
    var backToTop = document.getElementById("back-to-top");

    if (backToTop != null) {
        window.onscroll = function () {
            if (window.scrollY > 200) {
                backToTop.style.visibility = "visible";
                backToTop.style.pointerEvents = "auto";
            } else {
                backToTop.style.visibility = "hidden";
                backToTop.style.pointerEvents = "none";}};

        backToTop.onclick = function () {
            window.scrollTo(0, 0);};}}


// -------------------- Live Clock --------------------
function showClock() {
    var clock = document.getElementById("live-clock");
    if (clock != null) {
        var now = new Date();
        var h = now.getHours();
        var m = now.getMinutes();
        var s = now.getSeconds();

        if (h < 10) {h = "0" + h;}
        if (m < 10) {m = "0" + m;}
        if (s < 10) {s = "0" + s;}

        clock.innerHTML = h + ":" + m + ":" + s;}}

showClock();
setInterval(showClock, 1000);


//-----------------------------------------------------------------------Workshop Evaluation-page


/* -------------------- Workshop Evaluation -------------------- */
function initEvaluationForm() {
    var workshopSelect = document.getElementById("Workshop-Selection");
    var commentInput = document.getElementById("comment");

    if (workshopSelect == null || commentInput == null) {
        return;}

    var form = workshopSelect.form;

    form.onsubmit = function () {
        var selectedWorkshop = workshopSelect.value;
        var commentText = commentInput.value;

        // Check workshop selection
        if (selectedWorkshop == "") {
            alert("Please select a workshop.");
            workshopSelect.style.borderColor = "red";
            return false;
        } else {
            workshopSelect.style.borderColor = "";}

        // Check selected rating (radio buttons)
        var stars = document.getElementsByName("rating");
        var ratingValue = 0;

        for (var i = 0; i < stars.length; i++) {
            if (stars[i].checked) {
                ratingValue = parseInt(stars[i].value);}}

        if (ratingValue == 0) {
            alert("Please select a rating.");
            return false;}

        // Check feedback / comment
        if (commentText.trim() == "") {
            alert("Please enter your comment.");
            commentInput.style.borderColor = "red";
            return false;
        } else {
            commentInput.style.borderColor = "";}

        // Good rating vs apology message (4 or 5 stars = good rating)
        if (ratingValue >= 4) {
            alert("Thank you for your evaluation!");
        } else {
            alert("We apologize for your experience and appreciate your feedback.");}

        // Redirect to Club Member Dashboard
        window.location.href = "Member_Dashboard.html";
        return false;};

    var cancelButtons = document.getElementsByClassName("btn-cancel");
    if (cancelButtons.length > 0) {
    cancelButtons[0].onclick = function () {
        workshopSelect.value = "";
        workshopSelect.style.borderColor = "";

        commentInput.value = "";
        commentInput.style.borderColor = ""; 

        var stars = document.getElementsByName("rating");
        for (var i = 0; i < stars.length; i++) {
            stars[i].checked = false;}};}}


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

/*---------------------------------------- Manager pages ----------------------------------------tala*/

// The key used to save the manager's workshops in localStorage
var WORKSHOPS_KEY = "flora_manager_workshops";

// Get the saved workshops from localStorage (an array of objects)
function getSavedWorkshops() {
    var saved = localStorage.getItem(WORKSHOPS_KEY);

    if (saved == null) {
        return [];
    }
    return JSON.parse(saved);
}


/* ==================== Manager Dashboard - tala ==================== */

var myWorkshopsBody = document.getElementById("my-workshops-body");

if (myWorkshopsBody != null) {

    var newWorkshops = getSavedWorkshops();

    // Add one row to the table for every workshop saved in localStorage
    for (var i = 0; i < newWorkshops.length; i++) {
        myWorkshopsBody.innerHTML = myWorkshopsBody.innerHTML +
            "<tr>" +
                "<td><img src='" + newWorkshops[i].image + "' alt='" + newWorkshops[i].name +
                " workshop' width='80' height='60'></td>" +
                "<td>" + newWorkshops[i].name + "</td>" +
            "</tr>";
    }
}


/* ==================== Add New Workshop - tala ==================== */

var newWorkshopForm = document.getElementById("new-workshop-form");

if (newWorkshopForm != null) {

    newWorkshopForm.onsubmit = async function (event) {
    event.preventDefault();
        var nameInput = document.getElementById("workshop-name");
        var descriptionInput = document.getElementById("workshop-description");
        var priceInput = document.getElementById("workshop-price");
        var imageInput = document.getElementById("workshop-image");

        var name = nameInput.value;
        var description = descriptionInput.value;
        var price = priceInput.value;
        var image = imageInput.value;

        // 1) Check for empty fields
        if (name.search(/\S/) == -1) {
            alert("Please enter the workshop name.");
            nameInput.focus();
            return false;
        }

        if (description.search(/\S/) == -1) {
            alert("Please enter the workshop description.");
            descriptionInput.focus();
            return false;
        }

        if (price == "") {
            alert("Please enter the workshop price (numbers only).");
            priceInput.focus();
            return false;
        }

        if (image == "") {
            alert("Please choose an image for the workshop.");
            imageInput.focus();
            return false;
        }

        // 2) Check the type of each input
        // The workshop name cannot start with a number
        if (name.search(/^\s*\d/) != -1) {
            alert("The workshop name cannot start with a number.");
            nameInput.focus();
            return false;
        }

        // The price must be a number
        if (price.search(/^\d+(\.\d+)?$/) == -1 || parseFloat(price) <= 0) {
            alert("The price must be a number greater than 0.");
            priceInput.focus();
            return false;
        }

        // The image must be an image file
        if (image.search(/\.(jpg|jpeg|png|gif)$/i) == -1) {
            alert("The image must be a picture file (jpg, jpeg, png or gif).");
            imageInput.focus();
            return false;
        }

        // 3) The form is valid: save the workshop in localStorage
        var workshop = {
            name: name,
            description: description,
            price: parseFloat(price),
            image: await new Promise(function (resolve) {
                   var reader = new FileReader();
                   reader.onload = function () {
                   resolve(reader.result); };

                 
         reader.readAsDataURL(imageInput.files[0]);
        })
        };

        var allWorkshops = getSavedWorkshops();   // the old workshops
        allWorkshops.push(workshop);              // add the new one at the end
        localStorage.setItem(WORKSHOPS_KEY, JSON.stringify(allWorkshops));

        alert("The workshop \"" + name + "\" has been added successfully!");

        // 4) Clear the form
        nameInput.value = "";
        descriptionInput.value = "";
        priceInput.value = "";
        imageInput.value = "";

        return false;   // stay on the page (do not send the form)
    };
}


/* ==================== Manage Activity Leaders & Instructors - tala ==================== */

// All available activity leaders and instructors (array of objects)
var teamMembers = [
    { name: "Sara Khalid",      photo: "photos/instructor-1.jpeg", role: "Instructor" },
    { name: "Noura Abdullah",   photo: "photos/instructor-2.jpeg", role: "Instructor" },
    { name: "Lina Abdulrahman", photo: "photos/instructor-3.jpeg", role: "Instructor" }
];

var teamList = document.getElementById("team-list");
var deleteTeamForm = document.getElementById("delete-team-form");
var addTeamForm = document.getElementById("add-team-form");

// Show every person in the table with a checkbox
function showTeam() {
    var rows = "";

    for (var i = 0; i < teamMembers.length; i++) {
        rows = rows +
            "<tr>" +
                "<td><input type='checkbox' id='member-" + i + "' name='selected-instructors' value='" + i + "'></td>" +
                "<td><img src='" + teamMembers[i].photo + "' alt='" + teamMembers[i].name + "' width='40' height='40'></td>" +
                "<td><label for='member-" + i + "'>" + teamMembers[i].name + "</label></td>" +
            "</tr>";
    }

    teamList.innerHTML = rows;
}

if (teamList != null) {

    showTeam();

    // ---------- Delete selected people ----------
    deleteTeamForm.onsubmit = function () {

        var boxes = document.getElementsByName("selected-instructors");
        var selectedCount = 0;

        for (var i = 0; i < boxes.length; i++) {
            if (boxes[i].checked) {
                selectedCount++;
            }
        }

        if (selectedCount == 0) {
            alert("Please select at least one activity leader or instructor to delete.");
            return false;
        }

        var sure = confirm("Are you sure you want to delete the selected " +
                           selectedCount + " person(s)?");

        if (sure) {
            // keep only the people that were NOT checked
            var remaining = [];

            for (var j = 0; j < boxes.length; j++) {
                if (!boxes[j].checked) {
                    remaining.push(teamMembers[j]);
                }
            }

            teamMembers = remaining;
            showTeam();
        }

        return false;
    };

    // ---------- Add a new leader / instructor ----------
    addTeamForm.onsubmit = function () {

        var nameInput = document.getElementById("instructor-name");
        var photoInput = document.getElementById("instructor-photo");
        var birthInput = document.getElementById("birth-date");
        var emailInput = document.getElementById("instructor-email");
        var expertiseInput = document.getElementById("expertise");
        var skillsInput = document.getElementById("skills");
        var educationInput = document.getElementById("education");
        var roles = document.getElementsByName("role");

        // 1) Check for empty fields
        if (nameInput.value.search(/\S/) == -1) {
            alert("Please enter the name.");
            nameInput.focus();
            return false;
        }

        if (photoInput.value == "") {
            alert("Please choose a photo.");
            photoInput.focus();
            return false;
        }

        if (birthInput.value == "") {
            alert("Please select the date of birth.");
            birthInput.focus();
            return false;
        }

        var role = "";
        for (var i = 0; i < roles.length; i++) {
            if (roles[i].checked) {
                role = roles[i].value;
            }
        }

        if (role == "") {
            alert("Please choose a role (Activity Leader or Instructor).");
            return false;
        }

        if (emailInput.value.search(/\S/) == -1) {
            alert("Please enter the email.");
            emailInput.focus();
            return false;
        }

        if (expertiseInput.value.search(/\S/) == -1) {
            alert("Please enter the area of expertise.");
            expertiseInput.focus();
            return false;
        }

        if (skillsInput.value.search(/\S/) == -1) {
            alert("Please enter the skills.");
            skillsInput.focus();
            return false;
        }

        if (educationInput.value.search(/\S/) == -1) {
            alert("Please enter the education.");
            educationInput.focus();
            return false;
        }

        // 2) Check the type of each input
        // Name: letters and spaces only
        if (nameInput.value.search(/^[A-Za-z ]+$/) == -1) {
            alert("The name must contain letters only (no numbers or symbols).");
            nameInput.focus();
            return false;
        }

        // Photo: image files only
        if (photoInput.value.search(/\.(jpg|jpeg|png|gif)$/i) == -1) {
            alert("The photo must be an image file (jpg, jpeg, png or gif).");
            photoInput.focus();
            return false;
        }

        // Date of birth: must be in the past
        var birthDate = new Date(birthInput.value);
        var today = new Date();

        if (birthDate >= today) {
            alert("The date of birth must be in the past.");
            birthInput.focus();
            return false;
        }

        // Email: something@something.something
        if (emailInput.value.search(/^[\w.\-]+@[\w\-]+(\.[A-Za-z]+)+$/) == -1) {
            alert("Please enter a valid email (example: name@flora.com).");
            emailInput.focus();
            return false;
        }

        // Expertise, skills and education: must start with a letter
        if (expertiseInput.value.search(/^[A-Za-z][A-Za-z .,&\-]*$/) == -1) {
            alert("The area of expertise must contain letters only.");
            expertiseInput.focus();
            return false;
        }

        if (skillsInput.value.search(/^[A-Za-z][A-Za-z .,&\-]*$/) == -1) {
            alert("The skills must contain letters only.");
            skillsInput.focus();
            return false;
        }

        if (educationInput.value.search(/^[A-Za-z][A-Za-z .,&\-]*$/) == -1) {
            alert("The education must contain letters only.");
            educationInput.focus();
            return false;
        }

        // 3) The form is valid: add the new person to the list
        var newMember = {
            name: nameInput.value,
            photo: URL.createObjectURL(photoInput.files[0]),
            role: role
        };

        teamMembers.push(newMember);
        showTeam();

        alert(newMember.name + " has been added successfully!");

        // 4) Clear the form
        nameInput.value = "";
        photoInput.value = "";
        birthInput.value = "";
        emailInput.value = "";
        expertiseInput.value = "";
        skillsInput.value = "";
        educationInput.value = "";
        for (var k = 0; k < roles.length; k++) {
            roles[k].checked = false;
        }

        return false;
    };
}



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





