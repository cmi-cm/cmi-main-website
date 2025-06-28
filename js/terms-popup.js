// Declare these variables in a scope accessible by all functions that need them.
// They will be assigned once the DOM elements are available.
let termsPopup;
let navBar;
let localStorageFunctionalityCheckbox;
let websiteTermsCheckbox;
let agreeBtn; // Add reference for agree button
let declineBtn; // Add reference for decline button

document.addEventListener('DOMContentLoaded', () => {
    // Get initial references to elements that are always in the main HTML
    termsPopup = document.getElementById('termsPopup');
    navBar = document.getElementById('nav');

    // Function to load content and then initialize dynamic elements
    function loadAndInitPopup() {
        return fetch('terms-popup.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                // Inject the HTML into the termsPopup div
                termsPopup.innerHTML = html;

                // IMPORTANT: Get references to the checkboxes and buttons *after* they have been injected
                localStorageFunctionalityCheckbox = document.getElementById('localStorageFunctionalityCheckbox');
                websiteTermsCheckbox = document.getElementById('websiteTermsCheckbox');
                agreeBtn = document.getElementById('agreeBtn');
                declineBtn = document.getElementById('declineBtn');

                // Attach event listeners *after* buttons are in the DOM
                if (agreeBtn) {
                    agreeBtn.addEventListener('click', saveSelectedPreferences);
                }
                if (declineBtn) {
                    declineBtn.addEventListener('click', hidePopup); 
                }

                console.log("Terms popup HTML loaded and elements initialized.");
            })
            .catch(error => {
                console.error('Error loading the HTML file:', error);
            });
    }

    // Function to show the popup
    function showPopup() {
        // Ensure content is loaded and elements are initialized before showing
        loadAndInitPopup().then(() => {
            termsPopup.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling of the background content

            if (navBar) { // Ensure navBar exists before trying to hide it
                navBar.style.display = 'none'; // hide navbar
            }
        });
    }

    // Function to check if terms have been agreed to
    function getAgreedToTerms() {
        const storedValue = localStorage.getItem('termsPreferences');

        if (storedValue) {
            try {
                // Attempt to parse the stored JSON
                const preferences = JSON.parse(storedValue);

                // You should compare the stored 'agreed-to-local-storage' with what you expect,
                // not define a new 'agreedToLocalStorage' here.
                // For example, if you require it to be true:
                const isLocalStorageAgreedInStoredPrefs = preferences["agreed-to-local-storage"];

                // Example of a 'required' state based on your application's logic.
                // This 'requiredPreferences' object should define what you *expect* to be true for a valid agreement.
                // It should *not* refer to a variable that hasn't been defined yet.
                const requiredWebsiteTermsVersion = 1.1; // Your current required version
                const requiredPrivacyPolicyVersion = 1.0; // Your current required version

                // Now, compare the stored preferences with your requirements
                const meetsRequirements =
                    preferences["website-terms-version"] >= requiredWebsiteTermsVersion &&
                    preferences["privacy-policy-version"] >= requiredPrivacyPolicyVersion;
                    // Add checks for other required fields, like agreedToLocalStorage if it's mandatory
                    // && preferences["agreed-to-local-storage"] === true; // If local storage agreement is mandatory for overall agreement

                console.log("Preferences: ", preferences);
                console.log("Is Local Storage Agreed in Stored Prefs: ", isLocalStorageAgreedInStoredPrefs);
                console.log("Meets Required Versions: ", meetsRequirements);


                // If terms are found and valid (based on your comparison logic), hide the popup
                // and show the navbar.
                if (meetsRequirements) { // Use your comparison logic here
                    console.log("Found valid terms preferences. Hiding popup.");
                    if (termsPopup) termsPopup.style.display = 'none';
                    if (navBar) navBar.style.display = 'block';
                    document.body.style.overflow = '';
                } else {
                    console.log("Stored preferences do not meet current requirements, showing popup.");
                    showPopup(); // Stored terms are outdated or insufficient
                }

            } catch (e) {
                console.error("Error parsing stored terms preferences, showing popup.", e);
                // If parsing fails, treat it as if no valid terms were found
                showPopup();
            }
        } else {
            console.log("Could not find terms value, showing terms popup.");
            showPopup();
        }
    }


    // Initial check when the DOM is ready
    getAgreedToTerms();
});

// saveSelectedPreferences function (now uses globally scoped variables)
function saveSelectedPreferences() {
    // Ensure elements are available before attempting to access them
    if (!localStorageFunctionalityCheckbox) {
        console.error("Popup elements not yet initialized. Please wait for the popup to load.");
        return; // Exit if elements aren't ready
    }

    const agreedToLocalStorage = localStorageFunctionalityCheckbox.checked;

    const preferences = {
        "website-terms-version": 1.1,
        "privacy-policy-version": 1.0,
        "agreed-to-local-storage": agreedToLocalStorage
    };
    
    if(agreedToLocalStorage){
        // Save the preferences object to local storage only if agreed to by the user
        // localStorage.setItem expects string values, so we use JSON.stringify() to convert the object

        localStorage.setItem('termsPreferences', JSON.stringify(preferences));
        console.log("Preferences saved to local storage:", preferences);
    }

    hidePopup(); // Hide the popup after successful agreement
}


// hidePopup function (now uses globally scoped variables)
function hidePopup() {
    if (termsPopup) { // Ensure termsPopup is defined
        termsPopup.style.display = 'none';
    }
    if (navBar) { // Ensure navBar is defined
        navBar.style.display = 'block';
    }
    document.body.style.overflow = ''; // Re-enable scrolling
}