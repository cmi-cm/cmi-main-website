document.addEventListener("DOMContentLoaded", function() {
    const currentPath = window.location.pathname;

    // Check if the current path ends with .html
    if (currentPath.endsWith('.html')) {
        // Remove the .html extension
        const newPath = currentPath.slice(0, -5);
        window.location.replace(newPath);
    }

    // Check if the current path ends with .html
    if (currentPath.endsWith('index')) {
        // Remove the .html extension
        window.location.replace('/');
    }
});
