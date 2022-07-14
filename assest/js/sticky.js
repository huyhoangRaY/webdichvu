window.addEventListener("scroll", function() {
    var header = document.querySelector(".header__navbar");
    header.classList.toggle("sticky", window.scrollY > 0);
})