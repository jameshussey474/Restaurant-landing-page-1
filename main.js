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
const body = document.querySelector("body");
const closePrivateDining = document.querySelector(".close-private-dining");
const hamburger = document.querySelector(".hamburger");
const headerMenu = document.querySelector(".header-menu");
const headerMenuItems = document.querySelector(".header-menu__items");
const headerReservation = document.querySelector(".header-reservation");
const innerSliderImages = document.querySelector(".inner-slider-images");
const mainHeader = document.querySelector(".main__header");
const mainNav = document.querySelector(".main__nav");
const privateDining = document.querySelector(".private-dining-button");
const subMenuContact = document.querySelector(".sub-menu__contact a"); // latch onto the link element not the ul
const subMenuMenus = document.querySelector(".sub-menu__menus a"); // latch onto the link element not the ul

// Variables that represent dynamic elements for the private dining modal
let modalContainer, modalSection, modalArticle, modalTitle, modalText, modalForm, modalButton;

// Variables for the slideshow
const images = Array.from(innerSliderImages.children); //grab the html collection and put it into an array
let current = 0; // this must be initialized before autoSlideshow() is called in order to hoist variable in the function
let time = 9000; // declare how long slides will last in milliseconds for the automatic slideshow

// Checks if the private dining modal had already been open
let privateDiningInit = false;

/******************************************************************************
2. Event Listeners
******************************************************************************/

// Call all event listeners
loadEventListeners();
allClickEventListeners();
allTouchCancelEventListeners();

// Load all click event listeners
function allClickEventListeners() {
    body.addEventListener("click", closePrivateDiningModal); //event delegation on closePrivateDining variable needs to be handled by the body element
    body.addEventListener("click", closeOpenMenu); //event delegation to close the main__nav needs to be handled by the body element
    hamburger.addEventListener("click", toggleMenu);
    privateDining.addEventListener("click", openPrivateDiningModal);
    subMenuContact.addEventListener("click", toggleSubMenuContact);
    subMenuMenus.addEventListener("click", toggleSubMenuMenus);
}

// Load all touchcancel event listeners
function allTouchCancelEventListeners() {
    subMenuContact.addEventListener("touchcancel", toggleSubMenuContact);
    subMenuMenus.addEventListener("touchcancel", toggleSubMenuMenus);
}

// Load window event listeners
function loadEventListeners() {
    window.addEventListener("DOMContentLoaded", autoSlideshow);
}

/******************************************************************************
3. Global Functions
******************************************************************************/

// Toggles the "menu-open" class for the navbar. If the nav bar closes, make sure the sub-menus also close.
function toggleMenu() {
    if (!headerMenu.classList.contains("menu-open")) {
        headerMenu.classList.add("menu-open");
        // headerMenuItems.classList.remove("add-backup");
    } else {
        // headerMenuItems.classList.add("add-backup");
        subMenuMenus.parentElement.children[1].classList.remove("sub-menu-open");
        subMenuContact.parentElement.children[1].classList.remove("sub-menu-open");
        // headerMenu.addEventListener("animationend", () => {
        //||| needs a closer look with event delegation bubbling. headerMenuItems animation end is interrupting its parent animation
        headerMenu.classList.remove("menu-open");
        // });
    }

    // headerMenu.classList.toggle("menu-open");
    // if (headerMenu.classList.contains("menu-open")) {
    // if (!headerMenu.classList.contains("menu-open")) {
    // headerMenuItems.animationend("c");
    // console.log("closed");
    // }
    // headerMenuItems.classList.remove("add-backup");
}

// Toggles the "sub-menu-open" for the "sub-menu__menus" element to expose more links below.
function toggleSubMenuMenus() {
    subMenuMenus.parentElement.children[1].classList.toggle("sub-menu-open");
}

// Toggles the "sub-menu-open" for the "sub-menu__contact" element to expose more links below.
function toggleSubMenuContact() {
    subMenuContact.parentElement.children[1].classList.toggle("sub-menu-open");
}

// Automatically cycles through images within the "inner-slider-images" section
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

// This function opens the private dining modal
function openPrivateDiningModal() {
    // check if the modal has already been opened...
    if (privateDiningInit === false) {
        // ... if not, then call these functions and append the modal container to the html body
        createPrivateDiningElements();
        setModalContainerHTML();
        body.appendChild(modalContainer);
    } else {
        // ... if it has been opened, just display the already created elements
        modalContainer.style.display = "grid";
    }
    privateDiningInit = true; //set the global variable to true to now always skip creating new elements whenever this function is called.
}

// This function is called to dynamically create all the necessary elements for the private dining modal
function createPrivateDiningElements() {
    modalContainer = document.createElement("div");
    modalContainer.setAttribute("class", "modal-container");
    modalContainer.style.display = "grid";

    modalSection = document.createElement("section");
    modalSection.setAttribute("class", "modal-section");

    modalArticle = document.createElement("article");
    modalArticle.setAttribute("class", "modal-article");

    modalTitle = document.createElement("h2");
    modalTitle.setAttribute("class", "modal-title");

    modalText = document.createElement("p");
    modalText.setAttribute("class", "modal-text");

    modalForm = document.createElement("form");
    modalForm.setAttribute("class", "modal-form");

    modalButton = document.createElement("button");
    modalButton.setAttribute("class", "modal-button");
}

// Sets up the inner HTML for the modalContainer
function setModalContainerHTML() {
    modalContainer.innerHTML = `
    <section class="modal-section">
        <button class="close-private-dining">
            <i class="fas fa-times"></i>
        </button>
        <article class="modal-article">
            <h2 class="modal-title">Private Events</h2>
            <p class="modal-text">
                We at Mehr offer an intimate and vibrant setting for large private gatherings. Our private room offers its own secluded entrance, guest restrooms, and catered ambience for the perfect get together. 
            </p>
            <p class="modal-text">
                Please let us host your special event by filling in the following information.
            </p>
            <form class="modal-form">
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
            <button class="modal-button">
                Submit
            </button>
        </article>
    </section>`;
}

// Allows the private dining modal to be closed when the user clicks the close button
function closePrivateDiningModal(event) {
    if (event.target.parentElement.classList.contains("close-private-dining")) {
        modalContainer.style.display = "none";
    }
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
