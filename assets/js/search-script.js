---
title: Private script
keywords:
category: website code
url: search - script.js
---
//Search engine uses Simple-Jekyll-Search plugin, look it up on github
    (function () {

        const SEARCH_PHRASE_PARAM = 'search-phrase';
        const INPUT_ID = 'search-input-page';

        function getUrlParam(name) {
            const params = new URLSearchParams(window.location.search);
            return params.get(name);
        }

        const searchPhrase = getUrlParam(SEARCH_PHRASE_PARAM);
        const searchInput = document.getElementById(INPUT_ID);
        const resultsContainer = document.getElementById('results-container');

        if (!searchInput || !resultsContainer) {
            return;
        }
        

        const options = {
            searchInput: searchInput,
            resultsContainer: resultsContainer,
            json: '{{ site.baseurl | default: "" }}/search.json',
            // 1. Use a clear, multi-line template for aesthetics
            searchResultTemplate: `
                <li class="search-result-item">
                    <a href="{url}" class="result-link">
                    <h4 class="result-title">{title}</h4>
                    
                    </a>
                    <p class="result-snippet">
                    {content}
                    </p>
                </li>`,
            templateMiddleware: function(prop, value, template) {
                if (prop === 'bar') {
                return value.replace(/^\//, '')
                }
            },
            weights: {
                title: 2,
                tags: 10,
                content: 3
            },
            noResultsText: "I couldn't find any matches. Try a different set of keywords or check the spelling",
            fuzzy: false,
            limit: 20,
            sortMiddleware: function(a, b) {
                var astr = String(a.section) + "-" + String(a.caption);
                var bstr = String(b.section) + "-" + String(b.caption);
                return astr.localeCompare(bstr)
            }
        };

        let searchInstance = null; // Declare a variable to hold the instance

        // CRITICAL: Use the success callback to capture the instance and execute the search.
        options.success = function (data) {
            // This runs ONLY after the index is fully built.
            if (searchPhrase && searchInstance) {
                // 2. Execute the search directly using the instance's public 'search' method
                searchInstance.search(searchPhrase);
                console.log("Search executed via direct function call for: " + searchPhrase);
            }
        };

        // Initialize the library and store the returned instance
        searchInstance = SimpleJekyllSearch(options);

        // Set the input field's value immediately so the user sees it
        if (searchPhrase) {
            searchInput.value = searchPhrase;
        }

    })();