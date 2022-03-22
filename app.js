// Hide navbar on scroll
var prevScrollpos = window.pageYOffset;

window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("nav-scroll").classList.remove('nav-hidden');
    } else {
        document.getElementById("nav-scroll").classList.add('nav-hidden');
    }
    prevScrollpos = currentScrollPos;
}