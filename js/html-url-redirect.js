window.onload = function() {
    if (window.location.pathname.endsWith(".html")) {
        // Get the current pathname
        const pathname = window.location.pathname; // e.g., "/test.html"

        // Extract the part before the file extension
        const filename = pathname.split('/').pop(); 
        const nameWithoutExtension = filename.replace('.html', ''); 

        window.location.replace(nameWithoutExtension);
    }
};