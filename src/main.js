/*JS file for Restaurant Landing Page "index.html"*/

/******************************************************************************
	Table of Contents
	-----------------
	1. Global Variables
	2. Event Listeners
	3. Global Functions
        
*******************************************************************************/

/******************************************************************************
1. Global Variables
******************************************************************************/

// Global DOM variables
const backToTop = document.querySelector(".back-to-top");
const body = document.querySelector("body");
const bottomSectionMap = document.querySelector(".bottom-section__map");
const closePrivateDining = document.querySelector(".close-private-dining");
const closeNewsletter = document.querySelector(".close-newsletter");
const getTime = new Intl.DateTimeFormat().format(new Date());
const hamburger = document.querySelector(".hamburger");
const headerMenu = document.querySelector(".header-menu");
const headerMenuItems = document.querySelector(".header-menu__items");
const headerReservation = document.querySelector(".header-reservation");
const iFrame = document.querySelector("iframe");
const innerWelcomeSection = document.querySelector(".inner-welcome-section");
const mainHeader = document.querySelector(".main__header");
const mainNav = document.querySelector(".main__nav");
const newsletter = document.querySelector(".newsletter");
const privateDining = document.querySelector(".private-dining-button");
const reservationDate = document.querySelector("#reservation-date");
const subMenuContact = document.querySelector(".sub-menu__contact a"); // latch onto the link element not the ul
const subMenuMenus = document.querySelector(".sub-menu__menus a"); // latch onto the link element not the ul
const resGuests = document.querySelector("#reservation-guests");
const resDate = document.querySelector("#reservation-date");
const resTime = document.querySelector("#reservation-time");
const resName = document.querySelector("#reservation-name");
const resPhone = document.querySelector("#reservation-phone");
const resSubmit = document.querySelector(".reservation-button");

// Variables that represent dynamic elements for the private dining modal, calcMapSize() function
let privateDiningModalContainer,
     privateDiningModalSection,
     privateDiningModalArticle,
     privateDiningModalTitle,
     privateDiningModalText,
     privateDiningModalForm,
     privateDiningModalButton,
     iFrameWidth,
     mapPadding,
     reservationSuccessOutput;

// Variables for the slideshow
const images = Array.from(innerWelcomeSection.children); //grab the html collection and put it into an array
images.splice(0, 1); // need to grab only the last three img elements of innerWelcomeSection to cycle throughout

let current = 0; // this must be initialized before autoSlideshow() is called in order to hoist variable in the function
let time = 9000; // declare how long slides will last in milliseconds for the automatic slideshow

// Checks if the private dining modal had already been open
let privateDiningInit = false;
let newsletterInit = false;

/******************************************************************************
2. Event Listeners
******************************************************************************/

// Call all event listeners
loadDOMContentLoadedEventListeners();
loadClickEventListeners();
loadTouchEventListeners();
loadResizeEventListeners();
loadInputEventListeners();

// Load all click events
function loadClickEventListeners() {
     body.addEventListener("click", closePrivateDiningModal); //event delegation on closePrivateDining variable needs to be handled by the body element
     body.addEventListener("click", closeOpenMenu); //event delegation to close the main__nav needs to be handled by the body element
     body.addEventListener("click", closeNewsletterModal);
     hamburger.addEventListener("click", toggleMenu);
     newsletter.addEventListener("click", openNewsletterModal);
     privateDining.addEventListener("click", openPrivateDiningModal);
     resSubmit.addEventListener("click", submitForm);
     subMenuContact.addEventListener("click", toggleSubMenu);
     subMenuMenus.addEventListener("click", toggleSubMenu);
}

// Load all touchcancel events
function loadTouchEventListeners() {
     subMenuContact.addEventListener("touch", toggleSubMenu);
     subMenuMenus.addEventListener("touch", toggleSubMenu);
}

// Load all DOMContentLoaded events
function loadDOMContentLoadedEventListeners() {
     document.addEventListener("DOMContentLoaded", autoSlideshow);
     document.addEventListener("DOMContentLoaded", calcMapSize);
     document.addEventListener("DOMContentLoaded", setCurrentTime(getTime));
}

// Loads all resize events
function loadResizeEventListeners() {
     window.addEventListener("resize", calcMapSize);
}

// Loads all input events
function loadInputEventListeners() {
     reservationDate.addEventListener("input", checkClosedDays);
}

/******************************************************************************
3. Global Functions
******************************************************************************/

// Toggles the "menu-open" class for the navbar. If the nav bar closes, make sure the sub-menus also close.
function toggleMenu() {
     if (!headerMenu.classList.contains("menu-open")) {
          headerMenu.classList.add("menu-open");
          headerMenuItems.classList.add("swoop-in-animation");
          headerMenuItems.classList.remove("swoop-out-animation");
     } else {
          headerMenuItems.classList.add("swoop-out-animation");
          headerMenuItems.classList.remove("swoop-in-animation");
          subMenuMenus.parentElement.children[1].classList.remove(
               "sub-menu-open"
          );
          subMenuContact.parentElement.children[1].classList.remove(
               "sub-menu-open"
          );
          headerMenu.addEventListener("animationend", () => {
               //||| needs a closer look with event delegation bubbling. headerMenuItems animation end is interrupting its parent animation
               // console.log("animation");
          });
          headerMenu.classList.remove("menu-open");
     }
}

// Toggles the "sub-menu-open" class for the "sub-menu__menus" and "sub-menu__contact" elements to expose more links below.
function toggleSubMenu(event) {
     if (
          event.target.textContent === "Contact Us" ||
          event.target.textContent === "Menus"
     )
          event.target.parentElement.children[1].classList.toggle(
               "sub-menu-open"
          );
}

// Automatically cycles through images within the "inner-welcome-section" section
function autoSlideshow() {
     for (let i = 0; i < images.length; i++) {
          images[i].style.display = "none";
     }
     // check if current is at the end of the array and set it to the beginning if true
     current < images.length - 1 ? current++ : (current = 0);
     images[current].style.display = "block";
     // have each image show for "time" amount of milliseconds
     setTimeout(autoSlideshow, time);
}

// This function opens the newsletter modal
function openNewsletterModal() {
     createNewsletterElements();
     setNewsletterModalContainer();
     body.appendChild(newsletterModalContainer);
     toggleBackToTop(); //hide the back-top-top button
}

// This function is called to dynamically create all the necessary elements for the newsletter modal
function createNewsletterElements() {
     newsletterModalContainer = document.createElement("div");
     newsletterModalContainer.setAttribute(
          "class",
          "newsletter-modal-container"
     );
     newsletterModalContainer.style.display = "grid";

     newsletterModalSection = document.createElement("section");
     newsletterModalSection.setAttribute("class", "newsletter-modal-section");

     newsletterModalArticle = document.createElement("article");
     newsletterModalArticle.setAttribute("class", "newsletter-modal-article");

     newsletterModalTitle = document.createElement("h2");
     newsletterModalTitle.setAttribute("class", "newsletter-modal-title");

     newsletterModalText = document.createElement("p");
     newsletterModalText.setAttribute("class", "newsletter-modal-text");

     newsletterModalButton = document.createElement("button");
     newsletterModalButton.setAttribute("class", "newsletter-modal-button");
}

function setNewsletterModalContainer() {
     newsletterModalContainer.innerHTML = `
    <section class="newsletter-modal">
        <button class="close-newsletter">
            <i class="fas fa-times"></i>
        </button>
        <h1>Want to hear more about Mehr? Read our <a href="newsletter.html">Newsletter</a>!</h1>

    </section>`;
}

// Allows the newsletter modal to be closed when the user clicks the close button
function closeNewsletterModal(event) {
     if (
          event.target.parentElement.classList.contains("newsletter-modal") ||
          event.target.parentElement.parentElement.classList.contains(
               "newsletter-modal"
          )
     ) {
          newsletterModalContainer.style.display = "none";
          toggleBackToTop(); //also, display the back-top-top button
     }
}

// This function opens the private dining modal
function openPrivateDiningModal() {
     // check if the modal has already been opened...
     if (privateDiningInit === false) {
          // ... if not, then call these functions and append the modal container to the html body
          createPrivateDiningElements();
          setPrivateDiningModalContainer();
          body.appendChild(privateDiningModalContainer);
     } else {
          // ... if it has been opened, just display the already created elements
          privateDiningModalContainer.style.display = "grid";
     }
     privateDiningInit = true; //set the global variable to true to now always skip creating new elements whenever this function is called.
     toggleBackToTop(); //regardless, hide the back-top-top button
}

// This function is called to dynamically create all the necessary elements for the private dining modal
function createPrivateDiningElements() {
     privateDiningModalContainer = document.createElement("div");
     privateDiningModalContainer.setAttribute(
          "class",
          "private-dining-modal-container"
     );
     privateDiningModalContainer.style.display = "grid";

     privateDiningModalSection = document.createElement("section");
     privateDiningModalSection.setAttribute(
          "class",
          "private-dining-modal-section"
     );

     privateDiningModalArticle = document.createElement("article");
     privateDiningModalArticle.setAttribute(
          "class",
          "private-dining-modal-article"
     );

     privateDiningModalTitle = document.createElement("h2");
     privateDiningModalTitle.setAttribute(
          "class",
          "private-dining-modal-title"
     );

     privateDiningModalText = document.createElement("p");
     privateDiningModalText.setAttribute("class", "private-dining-modal-text");

     privateDiningModalForm = document.createElement("form");
     privateDiningModalForm.setAttribute("class", "private-dining-modal-form");

     privateDiningModalButton = document.createElement("button");
     privateDiningModalButton.setAttribute(
          "class",
          "private-dining-modal-button"
     );
}

// Sets up the inner HTML for the privateDiningModalContainer
function setPrivateDiningModalContainer() {
     privateDiningModalContainer.innerHTML = `
    <section class="private-dining-modal-section">
        <button class="close-private-dining">
            <i class="fas fa-times"></i>
        </button>
        <article class="private-dining-modal-article">
            <h2 class="private-dining-modal-title">Private Events</h2>
            <p class="private-dining-modal-text">
                We at Mehr offer an intimate and vibrant setting for large private gatherings. Our private room offers its own secluded entrance, guest restrooms, and catered ambience for the perfect get together. 
            </p>
            <p class="private-dining-modal-text">
                Please let us host your special event by filling in the following information.
            </p>
            <form class="private-dining-modal-form">
                <label class="private-dining-name sr-only" for="private-dining-name">
                </label>
                <input id="private-dining-name" class="private-dining-name-input" type="text"placeholder="Name"/>
                <label class="private-dining-phone sr-only" for="private-dining-phone">
                </label>
                <input id="private-dining-phone" class="private-dining-phone-input" type="tel"placeholder="Phone No."/>
                <label class="private-dining-email sr-only" for="private-dining-email">
                </label>
                <input id="private-dining-email" class="private-dining-email-input" type="email" placeholder="Email"/>
                <label class="private-dining-message sr-only" for="private-dining-message">
                </label>
                <textarea id="private-dining-message" class="private-dining-message-input" rows="10" placeholder="Tell us about your special event!"></textarea>
            </form>
            <button class="private-dining-modal-button">
                Submit
            </button>
        </article>
    </section>`;
}

// Allows the private dining modal to be closed when the user clicks the close button
function closePrivateDiningModal(event) {
     if (
          event.target.parentElement.classList.contains("close-private-dining")
     ) {
          privateDiningModalContainer.style.display = "none";
          toggleBackToTop(); //also, display the back-top-top button
     }
}

// Opens and closes the back-to-top button
function toggleBackToTop() {
     backToTop.classList.toggle("hide");
}

// When users click outside of the header-menu element and the class "menu-open" is not active for the header-menu, it will close the menu automatically.
function closeOpenMenu(event) {
     if (
          event.target !== mainNav &&
          event.target.closest("section") !== mainNav &&
          headerMenu.classList.contains("menu-open")
     ) {
          toggleMenu();
     }
}

// The map needs to have a dynamic sizing depending on the size of screen the user has.
function calcMapSize() {
     iFrameWidth = window.innerWidth;
     mapPadding = window
          .getComputedStyle(bottomSectionMap)
          .getPropertyValue(`padding-left`); // in order to center the iframe, get the padding from its parent container...
     iFrameWidth -= parseInt(mapPadding) * 2; //... and subtract both left and right from it
     iFrame.setAttribute("height", iFrameWidth);
     iFrame.setAttribute("width", iFrameWidth);
}

// users cannot reserve a date in the past, so this function sets the min attribute of the html reservation-date element to be today
function setCurrentTime(date) {
     reservationDate.setAttribute("min", date);
}

// send an alert to the user if they pick a Monday or Tuesday for a reservation (as the restaurant is closed on those days).
function checkClosedDays(event) {
     let day = new Date(this.value).getUTCDay();
     if ([1, 2].includes(day)) {
          event.preventDefault();
          this.value = "";
          alert(
               "Sorry, we are closed on Monday and Tuesday. Please, pick another day."
          );
     }
}

// Checks that the form fields are valid before "submitting" to a fake server. Also checks for validation and uses reg exp.
function submitForm(event) {
     // convert the HTML collection into an array and filter for the proper input fileds
     const formElements = Array.from(
          event.target.parentElement.children
     ).filter((element) => {
          return (
               element.localName === "input" || element.localName === "select"
          );
     });
     // destructure filtered array
     [guests, date, time, nameField, phone] = formElements;
     //check each filed is valid, add a class if so
     if (guests.value < 0 || guests.value > 12 || guests.value === "") {
          alert("Please choose a number between 1 and 12");
          guests.classList.remove("valid");
     } else {
          guests.classList.add("valid");
     }
     if (date.value === "" || date.value === null) {
          alert("Please choose a date");
          date.classList.remove("valid");
     } else {
          date.classList.add("valid");
     }
     if (time.value === "" || time.value === null) {
          alert("Please choose a time");
          time.classList.remove("valid");
     } else {
          time.classList.add("valid");
     }
     if (nameField.value === "" || nameField.value.length < 1) {
          alert("Please fill out your name");
          nameField.classList.remove("valid");
     } else {
          nameField.classList.add("valid");
     }
     let phoneRegex = /^(\()?(\d{3})(\)|\-|\.|\s)?(\d{3})(\-|\.|\s)?(\d{4})?$/;
     if (phoneRegex.test(phone.value) === false || phone.value === "") {
          phone.classList.remove("valid");
          alert("Please enter a valid phone number");
     } else {
          phone.classList.add("valid");
     }
     //check all are valid before submission
     if (
          formElements.every((element) => {
               return element.classList.contains("valid");
          }) === true
     ) {
          reservationSuccess(nameField.value);
          // set this popup to last for
          setTimeout(removeReservationSuccess, 7000);
     }
     event.preventDefault();
}
let background = Array.from(body.children).filter((element) => {
     return !element.classList.contains("res-success");
});

function removeReservationSuccess() {
     background.forEach((element) => {
          element.style.opacity = "1";
     });
     reservationSuccessOutput.remove();
     toggleBackToTop();
     resGuests.value = "";
     resDate.value = "";
     resTime.value = "";
     resName.value = "";
     resPhone.value = "";
}

function reservationSuccess(name) {
     reservationSuccessOutput = document.createElement("div");
     reservationSuccessOutput.innerHTML = `<div><p>Thank-you ${name}!</p>
     <p>Your Reservation has been booked!</p></div>`;
     body.append(reservationSuccessOutput);
     reservationSuccessOutput.classList.add("res-success");
     background.forEach((element) => {
          element.style.opacity = "0.5";
     });
     toggleBackToTop();
}
