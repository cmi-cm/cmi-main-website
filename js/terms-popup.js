
function createTermsCookie() {
    // Create a new terms cookie
    const date = new Date();
    date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000)); // Expires in 1 year
    const expires = "expires=" + date.toUTCString();
    document.cookie = "terms=website-terms-and-conditions-v1; path=/; " + expires;
    location.replace("home");
}

function showTermsModal() {
    // Fetch the content from terms_popup.html
    fetch("terms-popup.html")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.text();
        })
        .then((data) => {
            // Extract the content from the fetched HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, "text/html");
            const content = doc.getElementById("terms-popup-content").innerHTML;

            // Insert the fetched content into the modal body
            document.getElementById("modal-body").innerHTML = content;

            // Show the modal
            const modal = new bootstrap.Modal(document.getElementById("terms-modal"));
            modal.show();
        })
        .catch((error) => {
            console.error("There was a problem with the fetch operation:", error);
        });
}

function getTermsCookie(cname) {
    // Find terms cookie and make sure it's valid
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    console.log(decodedCookie);
    const cookieArray = decodedCookie.split(';');

    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) === 0) {
            const cookieValue = cookie.substring(name.length);
            if (cookieValue === "website-terms-and-conditions-v1") {
                // Cookie valid, so stay on the same page
                console.log("Terms Cookie Valid");
                return; // Exit the function if the cookie is valid
            } else {
                // Cookie invalid, so prompt user to agree to the agreement
                console.log("Terms Cookie Invalid");
                showTermsModal();
                return; // Exit the function after showing the modal
            }
        }
    }
    // If we reach here, the cookie was not found
    console.log("Terms Cookie Not Found, showing popup");
    showTermsModal();
}
