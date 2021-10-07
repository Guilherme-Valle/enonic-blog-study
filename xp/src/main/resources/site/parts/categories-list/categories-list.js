var portal = require('/lib/xp/portal');
var thymeleaf = require('/lib/thymeleaf');
var content = require('/lib/xp/content')

// Handle the GET request
exports.get = function(req) {

    // Get the country content as a JSON object
    const getCategoriesData = () => {
        const currentContent = portal.getContent();

        var categoriesData = content.getChildren({
            key: currentContent._path,
            start: 0,
            count: -1
        })

        for (var i = 0; i < categoriesData.hits.length; i++){
            categoriesData.hits[i].href = portal.pageUrl({id: categoriesData.hits[i]._id});
        }

        log.info(JSON.stringify(categoriesData, null, 4))


        return categoriesData.hits;
    }

    // Specify the view file to use
    var view = resolve('categories-list.html');

    var model = {
        categories: getCategoriesData()
    }

    // Return the merged view and model in the response object
    return {
        body: thymeleaf.render(view, model)
    }
};