import Authors from '/both/collections/authors.js';

Template.addAuthor.onCreated(function () {
    var self = this;

    this.autorun(function () {
        self.subscribe('authors');
    });
});

Template.addAuthor.onRendered(function () {
    this.$('#author').material_select();

    var self = this;
    this.autorun(function () {
        Template.currentData();
        Authors.find().fetch();

        setTimeout(function () {
            self.$('#author').material_select('update');
        }, 50);
    });
});

Template.addAuthor.helpers({
    addedAuthors: function () {
        return Authors.find({_id: {$in: this.addedAuthorsIds}});
    },
    allAuthors: function () {
        return Authors.find({_id: {$nin: this.addedAuthorsIds}}, {sort: {name: 1}});
    }
});

Template.addAuthor.events({
    'change #author': function (event, tmpl) {
        tmpl.data.addAuthor(event.target.value);
        tmpl.$('#author').val('def');
    },

    'click .chip i': function (event, tmpl) {
        tmpl.data.removeAuthor(event.target.id);
    },

    'click .create-new-author': function (event, tmpl) {
        Blaze.renderWithData(Template.createAuthorModal,
            {addAuthor: tmpl.data.addAuthor}, $('body')[0]);
    }
});