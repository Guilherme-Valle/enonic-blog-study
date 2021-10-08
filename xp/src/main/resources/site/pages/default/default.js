var libs = {
    portal: require('/lib/xp/portal'),
    thymeleaf: require('/lib/thymeleaf'),
    content: require('/lib/xp/content'),
    menu: require('/lib/menu')
};

// Handle GET request
exports.get = function (req) {
    var site = libs.portal.getSite(); // Current site
    var content = libs.portal.getContent(); // Current content

    const basePath = '/bootstrap-starter';

    const pagesUrls = {
        posts: libs.portal.pageUrl({path: basePath + '/posts'}),
        authors: libs.portal.pageUrl({path: basePath +  '/authors'}),
        categories: libs.portal.pageUrl({path: basePath +  '/categories'})
    }

    function getPageTitle() {
        return content['displayName'] + ' - ' + site['displayName'];
    }

    function getMetaDescription() {
        var htmlMeta = getExtradata(content, 'html-meta');
        var metaDescription = htmlMeta.htmlMetaDescription || '';
        return metaDescription;
    }

    function getExtradata(content, property) {
        var appNamePropertyName = app.name.replace(/\./g,'-');
        // Short way of getting nested objects
        // http://blog.osteele.com/posts/2007/12/cheap-monads/
        var extraData = ((content.x || {})[appNamePropertyName] || {})[property] || {};
        return extraData;
    }


    var model = {
        mainRegion: content.page.regions['main'],
        pageTitle: getPageTitle(),
        pagePath: content._path.split('starter/')[1].split('/')[0],
        metaDescription: getMetaDescription(),
        pagesUrls
    }

    log.info(model.pagePath);

    return {
        body: libs.thymeleaf.render(resolve('default.html'), model)
    };
}
