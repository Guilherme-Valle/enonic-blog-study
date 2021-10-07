var portal = require('/lib/xp/portal');
var thymeleaf = require('/lib/thymeleaf');
var content = require('/lib/xp/content')

// Handle the GET request
exports.get = function(req) {

    // Get the country content as a JSON object
    const getPostsData = () => {
        const currentContent = portal.getContent();

        var postsData = content.getChildren({
            key: currentContent._path,
            start: 0,
            count: -1,
            contentTypes: ['author']
        })

        for (var i = 0; i < postsData.hits.length; i++){
            postsData.hits[i].href = portal.pageUrl({id: postsData.hits[i]._id});
            postsData.hits[i].author = content.get({key: postsData.hits[i].data.author}).data
        }

        return postsData.hits;
    }

    // Specify the view file to use
    var view = resolve('posts-list.html');

    var model = {
        posts: getPostsData()
    }

    // Return the merged view and model in the response object
    return {
        body: thymeleaf.render(view, model)
    }
};