Template.createPublicationMainView.onCreated(function () {
    var self = this;

    this.autorun(function(){
        if (!AppTntu.canUser('createPublication', Meteor.userId())) {
            //console.log('You can\'t create publications!');
            //FlowRouter.go('publicationsList');
        }
    });
});