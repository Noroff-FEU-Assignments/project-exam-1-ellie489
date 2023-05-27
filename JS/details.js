const baseURL = "https://exam.squareeyes-project.no/wp-json/wp/v2/posts/";
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const fullURL = baseURL + id + "?_embed&fields=id,title,content";
const container = document.querySelector(".details-container");

// function openModal(image) {
//   const modal = document.querySelector(".modal");
//   const img = document.createElement("img");
//   img.src = image;

//   modal.append(img);

//   modal.style.display = "block";
// }

// function closeModal() {
//   const modal = document.querySelector(".modal");
//   modal.style.display = "none";
// }

// async function getBlogData() {
//     const response = await fetch(fullURL);
//     const postData = await response.json;

// }

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

  // Make modal

  // const images = content.querySelectorAll("img");
  // image.src = blogPost._embedded["wp:featuredmedia"][0].source_url;
  // image.alt = blogPost._embedded["wp:featuredmedia"][0].alt_text;

  content.innerHTML = blogPost.content.rendered;

  title.innerText = blogPost.title.rendered;
  postContainer.id = blogPost.id;

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
      img.classList.add("scale");

      img.addEventListener("mouseleave", () => {
        img.classList.remove("scale");
      });
    });

    // imgModal.addEventListener("click", function () {
    //   const modal = document.querySelector(".modal");
    //   modal.style.display = "none";
    // });
  });
  // let imgModal = (src) => {
  //   const modal = document.querySelector(".modal");
  //   const newImage = document.createElement("img");
  //   newImage.setAttribute("src", src);
  //   modal.append(newImage);
  // };
  let imgModal = (src) => {
    const modal = document.querySelector(".modal");
    const newImage = document.createElement("img");
    newImage.setAttribute("src", src);
    modal.classList.add("zoom");
    modal.append(newImage);

    // modal.addEventListener("mouseleave", () => {
    //   modal.style.display = "none";
    // });
  };

  let closeModal = (src) => {
    const modal = document.querySelector(".modal");
    modal.style.display = "none";
  };

  // document.onclick = () => {
  //   const modal = document.querySelector(".modal");
  //   modal.style.display = "none";
  // };

  // images.forEach(function (image) {
  //   image.addEvc;
  // });
  // if (images) {
  //   images.onclick = function () {
  //     openModal(images.src);
  //   };
  // }

  // images.forEach(function (image) {
  //   image.addEventListener("click", function () {
  //     openModal(image);
  //   });
  // });
  // if (images.classList == "zoom") {
  //   document.onclick = () => {
  //     const modal = document.querySelector(".modal");
  //     modal.style.display = "none";
  //   };
  // }
  postContainer.append(title, content);
  container.append(postContainer);
}

async function renderBlogPost() {
  const post = await getBlogDetails();
  createPost(post);
}

renderBlogPost();
