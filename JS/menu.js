const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".menu");
const scrollToTopBtn = document.querySelector(".top");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  })
  
  document.querySelectorAll(".menu-item").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  }))

  scrollToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  })
