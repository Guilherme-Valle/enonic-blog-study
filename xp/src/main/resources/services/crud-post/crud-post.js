var portal = require('/lib/xp/portal');
var thymeleaf = require('/lib/thymeleaf');
var content = require('/lib/xp/content')
var context = require('/lib/xp/context')
var node = require('/lib/xp/node')

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
};