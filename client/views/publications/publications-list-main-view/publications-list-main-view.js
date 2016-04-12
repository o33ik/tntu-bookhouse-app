Template.publicationsListMainView.onCreated(function () {
    this.query = new ReactiveVar({});
    var self = this;

    this.autorun(function () {
        var query = {};
        var authorId = FlowRouter.getQueryParam('authorId');
        if (authorId) {
            query.authorsIds = authorId;
        }
        var type = FlowRouter.getQueryParam('type');
        if (type) {
            query.type = type;
        }

        self.query.set(query);
        self.subscribe('publications', _.clone(query));
    });
});

Template.publicationsListMainView.helpers({
    publications: function () {
        var query = Template.instance().query.get();
        return Publications.find(query);
    }
});