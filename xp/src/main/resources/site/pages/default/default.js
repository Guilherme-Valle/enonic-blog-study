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
        metaDescription: getMetaDescription()
    }

    log.info(JSON.stringify(model.menuItems, null, 4));

    return {
        body: libs.thymeleaf.render(resolve('default.html'), model)
    };
}
