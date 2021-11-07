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
subMenuMenus.addEventListener("click", openSubMenuMenus);
subMenuContact.addEventListener("click", openSubMenuContact);

// Automatic slideshow
autoSlideshow();

// Toggles the "menu-open" class for the navbar
function openMenu(event) {
    headerMenu.classList.toggle("menu-open");
    event.preventDefault();
}

// Toggles the "sub-menu-open" for some navbar elements to expose more links below. Also tries to emulate transformations on mobile displays, as hovers aren't prevalent.
// let after = document.styleSheets[0].cssRules[22];
function openSubMenuMenus(event) {
    event.target.parentElement.children[1].classList.toggle("sub-menu-open");
    // extended.classList.toggle("sub-menu-open");
}

function openSubMenuContact(event) {
    event.target.parentElement.children[1].classList.toggle("sub-menu-open");
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
    // console.log(innerSliderImages.style.animation);
    setTimeout(autoSlideshow, time);
}

// fixme: domcontentloaded??
// The map needs to have a dynamic sizing depending on the size of screen the user has.
const iFrame = document.querySelector("iframe");
let iFrameWidth = window.innerWidth; //grab the value for this elements horizontal padding (ex. 2em) and multiply it by the computed font-size . so 16 * 2 = 32. Since the padding is left and right, multiply by 2 again = 64!
const bottomSectionMap = document.querySelector(".bottom-section__map");
let mapPadding = window.getComputedStyle(bottomSectionMap).getPropertyValue(`padding-left`); //get the padding for the bottomSectionMap
iFrameWidth -= parseInt(mapPadding) * 2;
console.log(iFrameWidth);
iFrame.setAttribute("height", iFrameWidth);
iFrame.setAttribute("width", iFrameWidth);
