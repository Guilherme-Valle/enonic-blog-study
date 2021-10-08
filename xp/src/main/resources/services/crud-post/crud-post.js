var portal = require('/lib/xp/portal');
var thymeleaf = require('/lib/thymeleaf');
var content = require('/lib/xp/content');
var context = require('/lib/xp/context');
var node = require('/lib/xp/node');

const createPost = data => {
    content.create({
        _name: data.title.split(' ').join('-').toLowerCase(),
        parentPath: `${data['posts-folder-path']}`,
        displayName: data.title,
        contentType: `${app.name}:post`,
        data: {
            title: data.title,
            'short-title': data['short-title'],
            html: data.html,
            category: data.category,
            author: data.author,
        }
    });
}

const updatePost = data => {
    function editor (post){
        post.data.title = data.title;
        post.data['sub-title'] = data['sub-title'];
        post.data.html = data.html;
        post.data.category = data.category;
        post.data.author = data.author;
        log.info(JSON.stringify(post, null, 4));
        return post;
    }

    const result = content.modify({
        key: data.id,
        editor: editor
    });

    log.info(JSON.stringify(result, null, 4));

    if (result){
        log.info("Content with id " + data.id + " modified with success!");
    } else {
        log.info("Error in modify!");
    }
}

const deletePost = data => {
    const result = content.delete({
        key: data.id
    });

    if (result){
        log.info("Post with id " + data.id + " deleted.");
    } else {
        log.info("Delete error");
    }
}

exports.get = req => {
    const postId = (req.params && req.params.id) || '';

    const post = content.get({key: postId}) || {};

    return {
        body: {
            status: Object.keys(post).length > 0  ? '200' : '404',
            post
        },
        contentType: 'application/json'
    };
}

exports.post = req => {
    const data = req.params;
    const action = data.action;
    log.info(JSON.stringify(req, null, 4));

    switch (action){
        case "create":
            createPost(data);
            break;
        case "update":
            updatePost(data);
            break;
        case "delete":
            deletePost(data);
            break;
    }

    return {
        redirect: data['redirect-to']
    }

};