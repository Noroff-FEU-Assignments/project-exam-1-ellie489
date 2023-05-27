const baseURL = "https://exam.squareeyes-project.no/wp-json/wp/v2/posts/";
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const fullURL = baseURL + id + "?_embed&fields=id,title,content";
const container = document.querySelector(".details-container");

function documentTitle(title) {
  document.querySelector(".document-title").innerText = title;
}

async function getBlogDetails() {
  try {
    const response = await fetch(fullURL);
    const postData = await response.json();
    return postData;
  } catch (error) {
    console.log("There was an error" + error);
  }
}

function createPost(blogPost) {
  documentTitle(`Northern Vibes | ${blogPost.title.rendered}`);
  const container = document.querySelector(".details-container");
  container.classList.remove("loader");
  const postContainer = document.createElement("div");
  const title = document.createElement("h1");
  const content = document.createElement("div");

  content.innerHTML = blogPost.content.rendered;

  title.innerText = blogPost.title.rendered;
  postContainer.id = blogPost.id;

  // Make modal

  // const images = content.querySelectorAll("img");
  // image.src = blogPost._embedded["wp:featuredmedia"][0].source_url;
  // image.alt = blogPost._embedded["wp:featuredmedia"][0].alt_text;

  // const images = content.querySelectorAll("img");
  // let imgSrc;
  // images.forEach((img) => {
  //   img.addEventListener("click", (e) => {
  //     imgSrc = e.target.src;
  //     imgModal(imgSrc);
  //   });
  // imgModal.addEventListener("click", function () {
  //   const modal = document.querySelector(".modal");
  //   modal.style.display = "none";
  // });

  //   img.addEventListener("mouseleave", () => {
  //     closeModal(imgSrc);
  //   });
  // });

  // const images = content.querySelectorAll("img");
  // let imgSrc;
  // images.forEach((img) => {
  //   img.addEventListener("click", (e) => {
  //     imgSrc = e.target.src;
  //     const modal = document.querySelector(".modal");
  //     const newImg = document.createElement("img");
  //     newImg.src = imgSrc;
  //     newImg.style.position = "absolute";
  //     modal.appendChild(newImg);

  //     modal.addEventListener("click", () => {
  //       modal.innerHTML = "";
  //     });
  //   });

  const images = content.querySelectorAll("img");
  let imgSrc;
  images.forEach((img) => {
    img.addEventListener("click", (e) => {
      imgSrc = e.target.src;
      imgAlt = e.target.alt;
      const modal = (document.querySelector(".modal").style.display = "block");
      const newImg = document.querySelector(".modal img");
      newImg.src = imgSrc;
    });
    document.querySelector(".modal", ".modal span").onclick = () => {
      document.querySelector(".modal").style.display = "none";
    };
  });
  postContainer.append(title, content);
  container.append(postContainer);
}

async function renderBlogPost() {
  const post = await getBlogDetails();
  createPost(post);
}

renderBlogPost();
