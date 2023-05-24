const form = document.querySelector(".form-container");
const firstName = document.querySelector(".name-input");
const email = document.querySelector(".email-input");
const subject = document.querySelector(".subject-input");
const message = document.querySelector(".message-input");
const formField = document.querySelector(".contact-form");



function validateEmail(email) {

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    // The Regex is copied from: https://www.simplilearn.com/tutorials/javascript-tutorial/email-validation-in-javascript
    const patternMatch = emailRegex.test(String(email).toLowerCase());

    return patternMatch;
}

const displayError = (input, error) => {

    input.nextElementSibling.classList.add("form-error");
    input.nextElementSibling.innerText = error;
}

const removeError = (input) => {

    input.nextElementSibling.innerText = "";
    input.nextElementSibling.classList.remove("form-error");

}

const validateInputs = () => {

    const nameValue = firstName.value.trim();
    const emailValue = email.value.trim();
    const subjectValue = subject.value.trim();
    const messageValue = message.value.trim();
    const success = document.querySelector("#form-message");


        if (nameValue.length <5) {
            displayError(firstName, "* Your name must be minimum 5 characters");
            
           } 
            else {
                removeError(firstName);
                success.innerHTML = "";
            }
        
        if (!validateEmail(emailValue)) {

            displayError(email, "* Please provide your email so we can get back to you");
        }
        else {
            removeError(email)
        }

        if (subjectValue.length <15) {
            displayError(subject, "* Please tell us what we can help you with (minimum 15 characters)");
        }
        else {
            removeError(subject);
            success.innerHTML = "";
        }
        if (messageValue.length <25) {
            displayError(message, "* Please tell us more (minimum 25 characters)");
        }
        else {
            removeError(message);
            success.innerHTML = "";
        }

        // Success validation

        if (validateEmail(emailValue) && nameValue.length >= 5 && subjectValue.length >= 15 && messageValue.length >= 25) {
            success.innerHTML = `<div class="success">Thank you! We have received your message and will get back to you as soon as possible (Usually within 24 hours)
            
            <a href="all-posts.html"><h3 class="cta-button">Go to all blogs</h3></a></div>`;
            success.style.color="var(--blue)";
            formField.style["display"] = "none";
        }
        else {
            success.innerHTML = "";
        }

}


form.addEventListener("submit", (event) => {

    event.preventDefault();

    validateInputs();

});