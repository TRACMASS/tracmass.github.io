---
---
(function() {

    // Function to get the URL parameter (omitted for brevity)
    function getUrlParam(name) {
        const params = new URLSearchParams(window.location.search);
        return params.get(name);
    }

    const searchPhrase = getUrlParam('search-phrase');
    const searchInput = document.getElementById('query-in-page');
    const resultsContainer = document.getElementById('results-container');
    
    if (!searchInput || !resultsContainer) {
        console.error("SimpleJekyllSearch: Required HTML elements not found.");
        return; 
    }

    const options = {
        searchInput: searchInput, 
        resultsContainer: resultsContainer,
        json: '{{ site.baseurl | default: "" }}/search.json', 
        searchResultTemplate: '<li><a href="{url}">{title}</a><p>{content}</p></li>',
        highlight: true,
        noResultsText: "Sorry, I couldn't find any matches :("
        // Remove initialValue from options! We will trigger it manually.
    };

    // Initialize the library
    SimpleJekyllSearch(options);

    // --- CRITICAL FIX: Delay the search execution ---
    if (searchPhrase) {
        // Set the input field's value immediately
        searchInput.value = searchPhrase;

        // Use a small delay (e.g., 200ms) to ensure the index is fully loaded 
        // before we try to trigger the search.
        setTimeout(function() {
            // Manually trigger a keyup event on the input field. 
            // SimpleJekyllSearch monitors keyup events to perform searches.
            const event = new Event('keyup');
            searchInput.dispatchEvent(event);
            console.log("Search manually triggered for: " + searchPhrase);

        }, 200); 
    }

})();