/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */
const sections = document.querySelectorAll("section");
const nav = document.getElementById("navbar__list");
const header = document.querySelector(".page__header");
/**
 * End Global Variables
 * Start Helper Functions
 *
 */
// remove active class from all links
const removeActiveClasses = function () {
  const allLinks = document.querySelectorAll(".menu__link");
  allLinks.forEach(function (link) {
    link.classList.remove("active");
  });
};
//add active class to the target link
const addActiveClass = function (id) {
  const Link = `a[href="#${id}"]`;
  const selectedLink = document.querySelector(Link);
  selectedLink.classList.add("active");
};
// scroll to top button hide and show
const btn = document.querySelector(".btn");
const scrolToTop = function () {
  if (window.scrollY >= 200) {
    btn.classList.add("show");
  } else {
    btn.classList.remove("show");
  }
};
/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
const buildNav = function () {
  nav.innerHTML = "";
  document.querySelectorAll("section").forEach(function (section) {
    const links = `<li><a href = "#${section.id}" data-nav="${section.id}" class="menu__link">${section.dataset.nav}</a></li>`;
    nav.insertAdjacentHTML("beforeend", links);
  });
};
buildNav();

// Add class 'active' to section when near top of viewport
window.onscroll = function () {
  sections.forEach(function (sec) {
    const size = sec.getBoundingClientRect();
    if (size.top >= -400 && size.top <= 150) {
      sec.classList.add("your-active-class");
      const currentId = sec.attributes.id.value;
      removeActiveClasses();
      addActiveClass(currentId);
    } else {
      sec.classList.remove("your-active-class");
    }
  });
  scrolToTop();
};

// Scroll to Top using scrollTO event
btn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
// hide nav when stop scrolling
let scrol;
document.onscroll = function () {
  header.style.display = "block";
  clearTimeout(scrol);
  scrol = setTimeout(function () {
    header.style.display = "none";
  }, 2000);
};
/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

// Scroll to section on link click
nav.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.dataset.nav) {
    document.getElementById(`${e.target.dataset.nav}`).scrollIntoView({ behavior: "smooth" });
  }
});
// Set sections as active
