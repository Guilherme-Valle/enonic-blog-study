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

    const params = req.params;
    let post = {
        data: {}
    }

    let action = 'create';

    const categories = getCategories();
    const authors = getAuthors();

    if (params.id){
        post = content.get({ key: params.id });
        log.info(JSON.stringify(post, null, 4));
        action = 'update'
    }

    // Specify the view file to use

    var model = {
        data: {
            authors,
            categories,
            post
        },
        config: {
            postsFolderPath: '/bootstrap-starter/posts',
            redirectTo: portal.pageUrl({ id: portal.getComponent().config['redirect-to'] || '' }) || '/'
        },
        serviceUrl: portal.serviceUrl({
            service: 'crud-post',
            params: {
                action: action
            }
        })
    }

    var view = resolve('form-post.html');

    // Return the merged view and model in the response object
    return {
        body: thymeleaf.render(view, model)
    }
};