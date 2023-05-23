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
      const container = document.querySelector(".main-container");
      const postContainer = document.querySelector(".container");
      const link = document.createElement("a");
      link.href = "blog-post.html?id=" + post.id;
      link.id = post.id;
      const image = document.createElement("img");
      const title = document.createElement("h3");
  
      image.src = post._embedded["wp:featuredmedia"][0].source_url;
      image.alt = post._embedded["wp:featuredmedia"][0].alt_text;
      title.innerText = post.title.rendered;
      link.append(title, image);
      postContainer.append(link);
      container.append(postContainer);
      }
    )
  }

  renderPosts();
