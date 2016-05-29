import Authors from '/both/collections/authors.js';

Template.bookAuthorsWithLinkForFilter.helpers({
    authorNameById: function (id) {
        var author = Authors.findOne(id);
        return author ? author.name : null;
    }
});

Template.bookAuthorsWithLinkForFilter.events({
    'click a': function (event, tmpl) {
        var authorId = event.target.id;
        FlowRouter.go('publicationsList');
        FlowRouter.setQueryParams({authorId: authorId})
    }
});