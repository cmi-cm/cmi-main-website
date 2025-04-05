window.onload = function() {
    // Remove .html extension
    if (window.location.pathname.endsWith(".html")) {
        console.log("please help");

        // Get the current pathname
        const pathname = window.location.pathname; // e.g., "/test.html"

        // Extract the part before the file extension
        const filename = pathname.split('/').pop(); 
        const nameWithoutExtension = filename.replace('.html', ''); 

        window.location.replace(nameWithoutExtension);
    }
    else{
        // check terms cookie
        if (window.location.pathname === "/home" || window.location.pathname === "/" || window.location.pathname === "/local-website-development") {
            console.log("Getting terms cookie");
            getTermsCookie("terms"); //terms-popup.js
        }
    }
};


// window.onload = function() {
//     if (window.location.pathname === "/home" || window.location.pathname === "/" || window.location.pathname === "/local-website-development") {
//         console.log("Getting terms cookie");
//         getTermsCookie("terms");
//     }
// };