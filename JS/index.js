const slides = document.querySelectorAll(".slide");
const nextSlide = document.querySelector(".slider-button.next");
const prevSlide = document.querySelector(".slider-button.prev");
const url = "https://exam.squareeyes-project.no/wp-json/wp/v2/posts?_embed";

async function getBlogPosts() {

    try {
      const response = await fetch(url);
      const blogPosts = await response.json();
      return blogPosts;
    }
  
    catch(error) {
      console.log("There was an error" + error);
    }
  }


async function renderPosts() {
    const posts = await getBlogPosts();
  
    createPost(posts)
  }


  function createPost(posts) {

    posts.forEach( post => {
      const sliderContainer = document.querySelector(".slider-container");
      const slider = document.createElement("div");
      slider.className = "slider";
      const slide = document.createElement("div");
      slide.className = "slide";
      const link = document.createElement("a");
      link.href = "blog-post.html?id=" + post.id;
      link.id = post.id;
      const image = document.createElement("img");
      const title = document.createElement("h3");
  
      image.src = post._embedded["wp:featuredmedia"][0].source_url;
      image.alt = post._embedded["wp:featuredmedia"][0].alt_text;
      title.innerText = post.title.rendered;
      link.append(title, image);
      slide.append(link);
      sliderContainer.append(slide);
      }
    )
  }


let currentSlide = 0;
let maxSlide = slides.length - 1;

slides.forEach((slide, index) => {
  slide.style.transform = `translateX(${index * 100}%)`;
});

nextSlide.addEventListener("click", function () {
  if (currentSlide === maxSlide) {
    currentSlide = 0;
  } else {
    currentSlide++;
  };

slides.forEach((slide, index) => {
 slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
});
});

prevSlide.addEventListener("click", function () {
  if (currentSlide === 0) {
    currentSlide = maxSlide;
  } else {
    currentSlide--;
  }

  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
  });
});


renderPosts();