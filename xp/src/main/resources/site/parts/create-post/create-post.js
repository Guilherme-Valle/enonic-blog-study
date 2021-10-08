var portal = require('/lib/xp/portal');
var thymeleaf = require('/lib/thymeleaf');
var content = require('/lib/xp/content')

// Handle the GET request

const getCategories = function () {
    return content.query({
        start: 0,
        count: -1,
        contentTypes: [`${app.name}:category`]
    }).hits.map((category) => {
        return {id: category._id, title: category.data.title}
    }).sort((a, b) => a.title.localeCompare(b.title));
}

const getAuthors = function () {
    return content.query({
        start: 0,
        count: -1,
        contentTypes: [`${app.name}:author`]
    }).hits.map((author) => {
        return {id: author._id, name: author.data.name}
    }).sort((a, b) => a.name.localeCompare(b.name));
}

exports.get = function (req) {

    var currentContent = portal.getContent();
    const categories = getCategories();
    const authors = getAuthors();
    log.info(JSON.stringify(req, null, 4))

    // Specify the view file to use
    var view = resolve('create-post.html');

    var model = {
        data: {
            authors,
            categories
        },
        config: {
            postsFolderPath: '/bootstrap-starter/posts'
        },
        serviceUrl: portal.serviceUrl({
            service: 'crud-post',
            params: {
                action: 'create'
            }
        })
    }

    // Return the merged view and model in the response object
    return {
        body: thymeleaf.render(view, model)
    }
};