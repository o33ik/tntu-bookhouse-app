Template.createEditPublication.onCreated(function () {
    var self = this;

    this.onSubmit = _.debounce(function (event, tmpl) {
        var getValuesFromForm = function () {
            var title = tmpl.$('#title').val().trim();
            var description = tmpl.$('#description').val().trim();
            var type = tmpl.$('#type').val();
            var year = tmpl.$('#year').val().trim();
            var pagesNumber = tmpl.$('#pages-number').val();
            var content = tmpl.$('#content').val().trim();
            var price = tmpl.$('#price').val().trim();
            var authorsIds = self.addedAuthorsIds.array();
            var isbn = tmpl.$('#isbn').val().trim();
            var udc = tmpl.$('#udc').val().trim();
            var bbk = tmpl.$('#bbk').val().trim();

            return {
                title: title,
                description: description,
                type: type,
                year: year,
                pagesNumber: pagesNumber,
                content: content,
                price: price,
                authorsIds: authorsIds,
                isbn: isbn,
                udc: udc,
                bbk: bbk
            }
        };

        var document = getValuesFromForm();
        var publicationId = self.data.publication ? self.data.publication._id : null;
        if (publicationId) {
            document._id = publicationId;
            var imageBase64 = self.isImageWasChanged ? self.imageBase64.get() : null;
            var pdfBase64 = self.isPdfWasChanged ? self.pdfBase64.get() : null;

            Meteor.call('editPublication', document, imageBase64, pdfBase64,
                function (err, res) {
                    if (err) {
                        console.log(err);
                    } else {
                        FlowRouter.go('viewPublication', {id: publicationId});
                    }
                });
        } else {
            Meteor.call('createPublication', document, self.imageBase64.get(),
                self.pdfBase64.get(), function (err, res) {
                    if (err) {
                        console.log(err);
                    } else {
                        FlowRouter.go('viewPublication', {id: res});
                    }
                });
        }
    }, 1000, true);

    this.allFieldsIsValid = new ReactiveVar(true);

    var authorsIds = this.data.publication ? this.data.publication.authorsIds : [];
    this.addedAuthorsIds = new ReactiveArray(authorsIds);

    this.isImageWasChanged = false;
    this.imageBase64 = new ReactiveVar();
    this.autorun(function () {
        if (self.data.publication && self.data.publication.imageId) {
            var image = Images.findOne(self.data.publication.imageId);
            if (image) {
                self.imageBase64.set(image.url());
            }
        }
    });

    this.isPdfWasChanged = false;
    this.pdfBase64 = new ReactiveVar();
    this.autorun(function () {
        if (self.data.publication && self.data.publication.pdfId) {
            var pdf = PublicationsPdf.findOne(self.data.publication.pdfId);
            if (pdf) {
                self.pdfBase64.set(pdf.url());
            }
        }
    });
});

Template.createEditPublication.onRendered(function () {
    var self = this;
    this.autorun(function () {
        var $invalidInputs = self.$('input.invalid');
        var allInputsIsValid = $invalidInputs.length == 0;

        var hasAtLeastOneAuthor = self.addedAuthorsIds.list().length > 0;

        self.allFieldsIsValid.set(allInputsIsValid && hasAtLeastOneAuthor);
    });

    this.autorun(function () {
        self.imageBase64.get();
        Tracker.afterFlush(function () {
            self.$('.image-preview').materialbox();
        });
    });
});

Template.createEditPublication.helpers({
    allFieldsIsValid: function () {
        return Template.instance().allFieldsIsValid.get();
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
    },

    imageBase64: function () {
        return Template.instance().imageBase64.get();
    },

    pdfDoc64: function () {
        return Template.instance().pdfBase64.get();
    }
});

Template.createEditPublication.events({
    'submit #create-edit-publication-form': function (event, tmpl) {
        event.preventDefault();
        tmpl.onSubmit(event, tmpl);
    },

    'blur input': function (event, tmpl) {
        var $invalidInputs = tmpl.$('input.invalid');
        tmpl.allFieldsIsValid.set($invalidInputs.length == 0);
    },
    'click .cancel-button': function () {
        FlowRouter.go('publicationsList');
    },

    'change #image': function (event, tmpl) {
        var reader = new FileReader();
        reader.onload = function (event) {
            tmpl.imageBase64.set(event.target.result);
            tmpl.isImageWasChanged = true;
        };

        if (event.target.files[0]) {
            reader.readAsDataURL(event.target.files[0]);
        } else {
            tmpl.imageBase64.set(null);
        }
    },

    'change #pdf': function (event, tmpl) {
        var reader = new FileReader();
        reader.onload = function (event) {
            tmpl.pdfBase64.set(event.target.result);
            tmpl.isPdfWasChanged = true;
        };

        if (event.target.files[0]) {
            reader.readAsDataURL(event.target.files[0]);
        } else {
            tmpl.pdfBase64.set(null);
        }
    }
});