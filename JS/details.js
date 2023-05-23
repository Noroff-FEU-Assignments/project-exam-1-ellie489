const baseURL = "https://exam.squareeyes-project.no/wp-json/wp/v2/posts/";
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const fullURL = baseURL + id + "?_embed&fields=id,title,content";
const container = document.querySelector(".details-container");

// async function getBlogData() {
//     const response = await fetch(fullURL);
//     const postData = await response.json;

// }


function docTitle(title) {
    document.querySelector("#doc-title").innerText = title;
}


async function getBlogDetails() {
    const response = await fetch(fullURL);
    const postData = await response.json();
    return postData;
}


function createPost(blogPost) {
    docTitle(`Northern Vibes | ${blogPost.title.rendered}`);
    const container = document.querySelector(".details-container");
    const postContainer = document.createElement("div");
    const title = document.createElement("h1");
    const content = document.createElement("div");

    content.innerHTML = blogPost.content.rendered;
    title.innerText = blogPost.title.rendered;
    postContainer.id = blogPost.id;

    postContainer.append(title, content);
    container.append(postContainer);
    
}

async function renderBlogPost() {
    const post = await getBlogDetails();
    createPost(post);
}

renderBlogPost();
