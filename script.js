// Ensures the script runs after the HTML file is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    
    // ---- Contact Form Validation ----
    const contactForm = document.querySelector("#contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            const email = document.querySelector("#email").value;
            const message = document.querySelector("#message").value;

            if (!email.includes("@") || message.length < 10) {
                alert("Please enter a valid email and a message with at least 10 characters.");
                event.preventDefault(); // Prevent form submission
            }
        });
    }

    // ---- Comment / Recommendation System ----
    const commentForm = document.querySelector("#commentForm");
    const commentSection = document.querySelector("#commentSection");

    // Load existing comments from local storage
    const storedComments = JSON.parse(localStorage.getItem("comments")) || [];
    storedComments.forEach(addCommentToPage);

    if (commentForm) {
        commentForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent page refresh

            const name = document.querySelector("#name").value.trim();
            const comment = document.querySelector("#comment").value.trim();

            if (name && comment.length >= 5) {
                const commentData = { name, comment };

                addCommentToPage(commentData);

                // Save comment to localStorage
                storedComments.push(commentData);
                localStorage.setItem("comments", JSON.stringify(storedComments));

                // Clear form fields
                commentForm.reset();
            } else {
                alert("Please enter your name and a comment with at least 5 characters.");
            }
        });
    }

    // Function to add a comment to the page
    function addCommentToPage(commentData) {
        const commentDiv = document.createElement("div");
        commentDiv.classList.add("comment");
        commentDiv.innerHTML = `<strong>${commentData.name}:</strong> <p>${commentData.comment}</p>`;
        commentSection.appendChild(commentDiv);
    }
});
