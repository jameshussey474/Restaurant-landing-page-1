// Global variables
const hamburger = document.querySelector(".hamburger");
const headerMenu = document.querySelector(".header-menu");
const headerReservation = document.querySelector(".header-reservation");
const mainNav = document.querySelector(".main__nav");
const subMenuMenus = document.querySelector(".sub-menu__menus");
const subMenuContact = document.querySelector(".sub-menu__contact");
const innerSliderImages = document.querySelector(".inner-slider-images");
const images = Array.from(innerSliderImages.children); //grab the html collection and put it into an array
let current = 0; // this must be initialized before autoSlideshow() is called in order to hoist variable in function
let time = 9000; // declare how long slides will last in milliseconds for the automatic slideshow

// Event Listeners
hamburger.addEventListener("click", openMenu);
subMenuMenus.addEventListener("click", openSubMenu);
subMenuContact.addEventListener("click", openSubMenu);

// Automatic slideshow
autoSlideshow();

// Toggles the "menu-open" class for the navbar
function openMenu(event) {
    headerMenu.classList.toggle("menu-open");
    event.preventDefault();
}

// Toggles the "sub-menu-open" for some navbar elements to expose more links below. Also tries to emulate transformations on mobile displays, as hovers aren't prevalent.
// let after = document.styleSheets[0].cssRules[22];
function openSubMenu(event) {
    let extended = event.target.parentElement.children[1];
    extended.classList.toggle("sub-menu-open");
}

// Automatically cycles through images within the inner-slider-images html section
function autoSlideshow() {
    for (let i = 0; i < images.length; i++) {
        images[i].style.display = "none";
    }
    // check if current is at the end of the array and set it to the beginning if true
    current < images.length - 1 ? current++ : (current = 0);
    images[current].style.display = "block";
    innerSliderImages.style.animation = "rollDown";
    console.log(innerSliderImages.style.animation);
    setTimeout(autoSlideshow, time);
}

// The map needs to have a dynamic sizing depending on the size of screen the user has
const iFrame = document.querySelector("iframe");
let iFrameWidth = window.innerWidth;
iFrame.setAttribute("height", iFrameWidth);
iFrame.setAttribute("width", iFrameWidth);
