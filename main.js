/*JS file for Restaurant Landing Page "index.html"*/

/******************************************************************************
	Table of Contents
	-----------------
	1. Global Variables
	2. Event Listeners
	3. Global Functions
        3.1 -- getPrice()
        3.2 -- processingData()
        3.3 -- revealingData()
        3.4 -- getServerTime()
        3.5 -- numberWithCommas()
        
*******************************************************************************/

/******************************************************************************
1. Global Variables
******************************************************************************/

// Global DOM variables
const body = document.querySelector("body");
const closePrivateDining = document.querySelector(".close-private-dining");
const hamburger = document.querySelector(".hamburger");
const headerMenu = document.querySelector(".header-menu");
const headerReservation = document.querySelector(".header-reservation");
const innerSliderImages = document.querySelector(".inner-slider-images");
const mainNav = document.querySelector(".main__nav");
const privateDining = document.querySelector(".private-dining-button");
const subMenuContact = document.querySelector(".sub-menu__contact");
const subMenuMenus = document.querySelector(".sub-menu__menus");

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
    hamburger.addEventListener("click", openMenu);
    privateDining.addEventListener("click", openPrivateDiningModal);
    subMenuContact.addEventListener("click", openSubMenuContact);
    subMenuMenus.addEventListener("click", openSubMenuMenus);
}

// Load all touchcancel event listeners
function allTouchCancelEventListeners() {
    subMenuContact.addEventListener("touchcancel", openSubMenuContact);
    subMenuMenus.addEventListener("touchcancel", openSubMenuMenus);
}

// Load window event listeners
function loadEventListeners() {
    window.addEventListener("DOMContentLoaded", autoSlideshow);
}

/******************************************************************************
3. Global Functions
******************************************************************************/

// Toggles the "menu-open" class for the navbar
function openMenu(event) {
    headerMenu.classList.toggle("menu-open");
    event.preventDefault();
}

// Toggles the "sub-menu-open" for the "sub-menu__menus" element to expose more links below.
function openSubMenuMenus(event) {
    event.target.parentElement.children[1].classList.toggle("sub-menu-open");
    // extended.classList.toggle("sub-menu-open");
}

// Toggles the "sub-menu-open" for the "sub-menu__contact" element to expose more links below.
function openSubMenuContact(event) {
    event.target.parentElement.children[1].classList.toggle("sub-menu-open");
}

// Automatically cycles through images within the "inner-slider-images" section
function autoSlideshow() {
    for (let i = 0; i < images.length; i++) {
        images[i].style.display = "none";
    }
    // check if current is at the end of the array and set it to the beginning if true
    current < images.length - 1 ? current++ : (current = 0);
    images[current].style.display = "block";
    innerSliderImages.style.animation = "rollDown";
    // have each image show for variable "time" amount of milliseconds
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
            <h2 class="modal-title">Just the Occasion</h2>
            <p class="modal-text">
                We at Mehr offer an intimate and vibrant setting for large private gatherings. Our private room offers its own secluded entrance, guest restrooms, and catered ambience for the perfect get together. 
            </p>
            <p class="modal-text">
                Please let us host your special event by filling in the following information.
            </p>
            <form class="modal-form">
                <label class="private-dining-name" for="private-dining-name">
                    Name
                </label>
                <input id="private-dining-name" class="private-dining-name-input reduce-input-width" type="text"/>
                <label class="private-dining-phone" for="private-dining-phone">
                    Phone No.
                </label>
                <input id="private-dining-phone" class="private-dining-phone-input reduce-input-width" type="tel"/>
                <label class="private-dining-email" for="private-dining-email">
                    Email
                </label>
                <input id="private-dining-email" class="private-dining-email-input reduce-input-width" type="email"/>
                <label class="private-dining-comments" for="private-dining-comments">
                    Comments
                </label>
                <textarea id="private-dining-comments" class="private-dining-comments-input" rows="10">
                </textarea>
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

// The map needs to have a dynamic sizing depending on the size of screen the user has.
const iFrame = document.querySelector("iframe");
let iFrameWidth = window.innerWidth; //grab the value for this elements horizontal padding (ex. 2em) and multiply it by the computed font-size . so 16 * 2 = 32. Since the padding is left and right, multiply by 2 again = 64!
const bottomSectionMap = document.querySelector(".bottom-section__map");
let mapPadding = window.getComputedStyle(bottomSectionMap).getPropertyValue(`padding-left`); //get the padding for the bottomSectionMap
iFrameWidth -= parseInt(mapPadding) * 2;
console.log(iFrameWidth);
iFrame.setAttribute("height", iFrameWidth);
iFrame.setAttribute("width", iFrameWidth);
