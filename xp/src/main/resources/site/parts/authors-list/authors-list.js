var portal = require('/lib/xp/portal');
var thymeleaf = require('/lib/thymeleaf');
var content = require('/lib/xp/content')

// Handle the GET request
exports.get = function(req) {

    // Get the country content as a JSON object
    const getAuthorsData = () => {
        const currentContent = portal.getContent();

        var authorsData = content.getChildren({
            key: currentContent._path,
            start: 0,
            count: -1,
            contentTypes: ['author']
        })

        for (var i = 0; i < authorsData.hits.length; i++){
            authorsData.hits[i].href = portal.pageUrl({id: authorsData.hits[i]._id});
        }

        return authorsData.hits;
    }

    // Specify the view file to use
    var view = resolve('authors-list.html');

    var model = {
        authors: getAuthorsData()
    }

    // Return the merged view and model in the response object
    return {
        body: thymeleaf.render(view, model)
    }
};