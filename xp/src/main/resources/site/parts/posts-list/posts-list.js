var portal = require('/lib/xp/portal');
var thymeleaf = require('/lib/thymeleaf');
var content = require('/lib/xp/content')

// Handle the GET request
exports.get = function (req) {
    const component = portal.getComponent() || {};
    const config = component.config || {};
    const formPostPath = '/bootstrap-starter/forms/form-post'

    // Get the country content as a JSON object
    const getPostsData = () => {
        var postsData = [];
        const postsFolder = config['posts-folder'] || false;

        if (postsFolder) {
            postsData = content.getChildren({
                key: postsFolder,
                start: 0,
                count: -1,
            }).hits.map(post => {
                post.author = content.get({key: post.data.author}).data;
                post.href = portal.pageUrl({id: post._id});
                return post;
            });
        }

        return postsData;
    }

    const getPagesData = () => {
        const pageUpdate = config['post-update-page'] || '';
        const pageDelete = config['redirect-to'] || '';

        return {
            pageUpdate: portal.pageUrl({id: pageUpdate}),
            redirectTo: portal.pageUrl({id: pageDelete})
        }

    }

    // Specify the view file to use
    var view = resolve('posts-list.html');

    let posts = getPostsData();
    for (var i = 0; i < posts.length; i++){
        posts[i].edit = portal.pageUrl({path: formPostPath, params: { id: posts[i]._id } })
    }

    log.info(JSON.stringify(posts, null, 4));

    var model = {
        posts,
        config: getPagesData(),
        createPost: portal.pageUrl({path: formPostPath}),
        formPostPath,
        deletePost: portal.serviceUrl({
            service: 'crud-post',
            params: {
                action: 'delete'
            }
        })
    }

    // Return the merged view and model in the response object
    return {
        body: thymeleaf.render(view, model)
    }
};