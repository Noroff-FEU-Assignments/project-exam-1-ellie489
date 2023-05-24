// const baseUrl = "https://exam.squareeyes-project.no/wp-json/wp/v2/posts?_embed&?per_page=50";
// let baseUrl = "https://exam.squareeyes-project.no/wp-json/wp/v2/posts?_embed&per_page=10";
let baseUrl = "https://exam.squareeyes-project.no/wp-json/wp/v2/posts?_embed&page=1";
const mediaUrl = "https://exam.squareeyes-project.no/wp-json/wp/v2/media";
// const fullUrl = baseUrl + "?_embed";

const showMore = document.querySelector(".show-more");

showMore.addEventListener ("click", () => {
    showMore.className = "loader";
    baseUrl = "https://exam.squareeyes-project.no/wp-json/wp/v2/posts?_embed&page=2";
    renderPosts();
    showMore.style.display = "none";
}) 

async function getMedia() {
    try {
        const response = await fetch(mediaUrl);
        const images = await response.json();
        return images;
    }
    catch(error) {
        console.log("There was an error" + error);
    }
}

async function getBlogPosts() {

    try {
      const response = await fetch(baseUrl);
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
      const container = document.querySelector(".main-container");
      container.classList.remove("loader");
      const postContainer = document.querySelector(".container");
      const link = document.createElement("a");
      link.href = "blog-post.html?id=" + post.id;
      link.id = post.id;
      const image = document.createElement("img");
      const title = document.createElement("h3");
  
      image.src = post._embedded["wp:featuredmedia"][0].source_url;
      image.alt = post._embedded["wp:featuredmedia"][0].alt_text;
      title.innerText = post.title.rendered;
      link.append(image, title);
      postContainer.append(link);
      container.append(postContainer);
      }
    )
  }

  renderPosts();
