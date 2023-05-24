const url = "https://exam.squareeyes-project.no/wp-json/wp/v2/posts?_embed";
const slidesContainer = document.getElementById("slides-container");
const slide = document.querySelector(".slide");
const prevButton = document.getElementById("slide-arrow-prev");
const nextButton = document.getElementById("slide-arrow-next");
const factText = document.querySelector(".fact.text");


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
      const slider = document.querySelector(".slides-container");
      const loader = document.querySelector(".loader");
      loader.style.display = "none";
      const slide = document.createElement("li");
      slide.className = "slide";
      const link = document.createElement("a");
      link.href = "blog-post.html?id=" + post.id;
      link.id = post.id;
      const image = document.createElement("img");
      const title = document.createElement("h3");
  
      image.src = post._embedded["wp:featuredmedia"][0].source_url;
      image.alt = post._embedded["wp:featuredmedia"][0].alt_text;
      title.innerText = post.title.rendered;
      link.append(image, title);
      slide.append(link);
      slider.append(slide);

      }
    )
  }


  nextButton.addEventListener("click", () => {
    const slideWidth = slide.clientWidth;

    slidesContainer.scrollLeft += slideWidth;
  
  });

  prevButton.addEventListener("click", () => {

    const slideWidth = slide.clientWidth;
  
    slidesContainer.scrollLeft -= slideWidth;
  
  });

renderPosts();