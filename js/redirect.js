document.addEventListener("DOMContentLoaded", function() {
    const currentPath = window.location.pathname;

    // Check if the current path ends with .html
    if (currentPath.endsWith('.html')) {
        // Remove the .html extension
        const newPath = currentPath.slice(0, -5);
        window.location.replace(newPath);
    }

    // redirect index to /
    if (currentPath.endsWith('index') || currentPath.endsWith('home')) {
        window.location.replace('/');
    }
});
