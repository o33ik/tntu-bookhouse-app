Template.createEditPublication.onCreated(function () {
    var self = this;

    this.onSubmit = _.debounce(function (event, tmpl) {
        var getValuesFromForm = function () {
            var title = tmpl.$('#title').val().trim();
            var description = tmpl.$('#description').val().trim();
            var year = tmpl.$('#year').val().trim();
            var pagesNumber = tmpl.$('#pages-number').val();
            var content = tmpl.$('#content').val().trim();
            var price = tmpl.$('#price').val().trim();
            var authorsIds = self.addedAuthorsIds.array();

            return {
                title: title,
                description: description,
                year: year,
                pagesNumber: pagesNumber,
                content: content,
                price: price,
                authorsIds: authorsIds
            }
        };

        var validateDocument = function (document) {
            if (document.authorsIds.length == 0) {
                console.log('Add at least one author!');
                return false;
            }
            return true;
        };

        var document = getValuesFromForm();
        if (validateDocument(document)) {
            var publicationId = self.data.publication._id;
            if (publicationId) {
                document._id = publicationId;
                Meteor.call('editPublication', document, function (err, res) {
                    if (err) {
                        console.log(err);
                    } else {
                        FlowRouter.go('viewPublication', {id: res});
                    }
                });
            } else {
                Meteor.call('createPublication', document, function (err, res) {
                    if (err) {
                        console.log(err);
                    } else {
                        FlowRouter.go('viewPublication', {id: res});
                    }
                });
            }
        }
    }, 1000, true);

    this.hasInvalidInput = new ReactiveVar(false);

    var authorsIds = this.data.publication ? this.data.publication.authorsIds : [];
    this.addedAuthorsIds = new ReactiveArray(authorsIds);
});

Template.createEditPublication.onRendered(function () {
});

Template.createEditPublication.helpers({
    hasInvalidInput: function () {
        return Template.instance().hasInvalidInput.get();
    },

    addedAuthorsIds: function () {
        return Template.instance().addedAuthorsIds.list().array();
    },
    onAddAuthor: function () {
        var tmpl = Template.instance();

        return function (id) {
            tmpl.addedAuthorsIds.push(id);
        }
    },
    onRemoveAuthor: function () {
        var tmpl = Template.instance();

        return function (id) {
            tmpl.addedAuthorsIds.remove(id);
        }
    }
});

Template.createEditPublication.events({
    'submit #create-edit-publication-form': function (event, tmpl) {
        event.preventDefault();
        tmpl.onSubmit(event, tmpl);
    },

    'blur input': function (event, tmpl) {
        var $invalidInputs = tmpl.$('input.invalid');
        tmpl.hasInvalidInput.set($invalidInputs.length > 0);
    },
    'click .cancel-button': function () {
        FlowRouter.go('publicationsList');
    }
});