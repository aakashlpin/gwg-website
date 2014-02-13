var BaseView = require('./base');

module.exports = BaseView.extend({
    events: {
        'click a': 'actionOnGoToLink'
    },
    postRender: function () {
        var currentFragment = this.app.router.currentFragment;
        this.toggleActiveState('/'+ currentFragment);

    },
    actionOnGoToLink: function (e) {
        e.preventDefault();
        var target = $(e.target);
        this.app.router.redirectTo(target.attr('href'));
        this.toggleActiveState(target.attr('href'));

    },
    toggleActiveState: function (href) {
        var activeClass = 'active';
        this.$el.find('li').removeClass(activeClass);
        this.$el.find('a[href="' + href + '"]').parent().addClass(activeClass);

    }
});

module.exports.id = 'logged_in_navigation';