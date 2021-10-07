var portal = require('/lib/xp/portal');
var thymeleaf = require('/lib/thymeleaf');
var content = require('/lib/xp/content')


const forceArray = function (data){
    if (!Array.isArray(data)) {
        data = [data];
    }
    return data;
}

// Handle the GET request
exports.get = function(req) {

    const getAuthorData = () => {
        const currentContent = portal.getContent();
        let authorData = {};

        if (currentContent.type.split(':')[1] === 'author'){
            authorData = currentContent.data;
            authorData.role = forceArray(authorData.role);
            authorData.image = authorData.image && portal.attachmentUrl({id: authorData.image}) || null;
        }

        return authorData;
    }

    const author = getAuthorData()
    var model = {
        author,
        show: Object.keys(author).length > 0
    };


    var view = resolve('author-details.html');

    return {
        body: thymeleaf.render(view, model)
    }
};