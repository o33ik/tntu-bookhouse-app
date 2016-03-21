Template.createPublicationMainView.onCreated(function () {
    var self = this;

    this.redirect = _.after(function () {
        console.log('You can\'t create publications!');
        FlowRouter.go('publicationsList');
    }, 1);
    this.autorun(function () {
        if (!AppTntu.canUser('createPublication', Meteor.userId())) {
            self.redirect();
        }
    });
});