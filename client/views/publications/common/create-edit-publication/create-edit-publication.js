Template.createEditPublication.onCreated(function () {
    var self = this;

    this.onSubmit = _.debounce(function (event, tmpl) {
        var getValuesFromForm = function () {
            var title = tmpl.$('#title').val();
            var description = tmpl.$('#description').val();
            var year = tmpl.$('#year').val();
            var pagesCount = tmpl.$('#pages-count').val();
            var content = tmpl.$('#content').val();
            var price = tmpl.$('#pages-price').val();

            return {
                title: title,
                description: description,
                year: year,
                pagesCount: pagesCount,
                content: content,
                price: price
            }
        };

        console.log(getValuesFromForm());
    }, 1000, true);

    this.hasInvalidInput = new ReactiveVar(false);

    this.addedAuthorsIds = new ReactiveArray([]);
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