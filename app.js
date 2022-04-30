// Hide navbar on scroll
var prevScrollpos = window.pageYOffset;
var screenwidth;

// Constants for body, navbar and footer
const pageBody = document.body;
const pageNavbar = document.getElementById("nav-scroll");
const pageFooter = document.getElementById("id-footer");

// When the user scrolls down 20px from the top of the document, show th navbar
window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        pageNavbar.classList.remove('nav-hidden');
    } else {
        pageNavbar.classList.add('nav-hidden');
    }
    prevScrollpos = currentScrollPos;
}

// Variables to store theme preferences
const prefersDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");
const currentTheme = localStorage.getItem("theme");

// Set theme as theme
if (prefersDarkTheme.matches && currentTheme == "dark") {
    // Change CSS
    document.documentElement.setAttribute("data-theme", "dark");

    // Change class of body to lgtr-dark
    pageBody.classList.add("lgtr-dark");
    // Change class of navbar to lgtr
    pageNavbar.classList.add("lgtr");
    // Change class of footer to lgtr-black
    pageFooter.classList.add("lgtr-black");

    // Change toggle-icon class to fa-sun
    document.querySelector(".toggle-icon").classList.add("fa-sun");
    // Change color of toggle-icon to black
    document.querySelector(".toggle-icon").style.color = "black";
} else {
    // Change CSS
    document.documentElement.setAttribute("data-theme", "light");

    // Change class of body to lgtr
    pageBody.classList.add("lgtr");
    // Change class of navbar to lgtr-dark
    pageNavbar.classList.add("lgtr-dark");
    // Change class of footer to lgtr-white
    pageFooter.classList.add("lgtr-white");

    // Change toggle-icon class to fa-moon
    document.querySelector(".toggle-icon").classList.add("fa-moon");
    // Change color of toggle-icon to white
    document.querySelector(".toggle-icon").style.color = "white";
}

const toggleIcon = document.querySelector(".toggle-icon");

// Function to change the theme on toggler-click
toggleIcon.addEventListener("click", () => {
    // If the theme is dark, change it to light
    if (document.documentElement.getAttribute("data-theme") == "dark") {
        // Change data-theme to light
        document.documentElement.setAttribute("data-theme", "light");

        // Change class of body to lgtr
        pageBody.classList.remove("lgtr-dark");
        // Change class of body to lgtr
        pageBody.classList.add("lgtr");

        // Change class of navbar to lgtr-dark
        pageNavbar.classList.remove("lgtr");
        pageNavbar.classList.add("lgtr-dark");

        // Change class of footer to lgtr-white
        pageFooter.classList.remove("lgtr-black");
        pageFooter.classList.add("lgtr-white");

        // Change toggle-icon class to fa-moon
        document.querySelector(".toggle-icon").classList.remove("fa-sun");
        document.querySelector(".toggle-icon").classList.add("fa-moon");

        // Change color of toggle-icon to white
        document.querySelector(".toggle-icon").style.color = "white";

    }   // If the theme is light, change it to dark
    else {
        // Change data-theme to dark
        document.documentElement.setAttribute("data-theme", "dark");

        // Change class of body to lgtr-dark
        document.body.classList.remove("lgtr");
        // Change class of body to lgtr-dark
        document.body.classList.add("lgtr-dark");

        // Change class of navbar to lgtr-dark
        pageNavbar.classList.remove("lgtr-dark");
        pageNavbar.classList.add("lgtr");

        // Change class of footer to lgtr-black
        pageFooter.classList.remove("lgtr-white");
        pageFooter.classList.add("lgtr-black");

        // Change toggle-icon class to fa-sun
        document.querySelector(".toggle-icon").classList.remove("fa-moon");
        document.querySelector(".toggle-icon").classList.add("fa-sun");
    }
    // Set theme as theme
    theme = document.documentElement.getAttribute("data-theme");
    // Set theme as theme
    localStorage.setItem("theme", theme);
});