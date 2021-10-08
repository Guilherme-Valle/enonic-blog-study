var portal = require('/lib/xp/portal');
var thymeleaf = require('/lib/thymeleaf');
var content = require('/lib/xp/content')


const forceArray = function (data){
    if (!Array.isArray(data)) {
        data = [data];
    }
    return data;
}

const formatCategoriesArray = function (categories){
    return categories.map((categoryId) => {
        return content.get({key: categoryId}).data
    })
}

// Handle the GET request
exports.get = function(req) {

    const getPostData = () => {
        const currentContent = portal.getContent();
        let postData = {};

        if (currentContent.type.split(':')[1] === 'post'){
            postData = currentContent.data;
            var categories = forceArray(postData.category);
            var author = content.get({key: postData.author});
            postData.image = postData.image && portal.attachmentUrl({id: postData.image}) || null;
            postData.author = author.data;
            postData.categories = formatCategoriesArray(categories)
        }

        return postData;
    }

    const post = getPostData();

    var model = {
        post,
        show: Object.keys(post).length > 0
    };


    var view = resolve('post-details.html');

    return {
        body: thymeleaf.render(view, model)
    }
};