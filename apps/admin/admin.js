const pathConfig = {
collection: '../collection/collection.html',
user: '../user/user.html',
};

const $navBar = $('#nav-bar');
const $main = $('#main');
const $sidebarMenuLinks = $('#sidebarMenu .nav-link');

const calculateMainHeight = () => {
const height = $(window).height() - $navBar.height();
$main.height(height);
};

calculateMainHeight();

$(window).resize(() => {
calculateMainHeight();
});

const redirectPath = (link, url) => {
$sidebarMenuLinks.removeClass('active');
$(link).addClass('active');
$main.find('iframe').attr('src', url);
};

// Example usage:
// redirectPath('#sidebarMenu .nav-link', pathConfig.collection);
