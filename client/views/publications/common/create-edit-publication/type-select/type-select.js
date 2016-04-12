Template.typeSelect.onRendered(function(){
    this.$('#type').material_select();
});

Template.typeSelect.helpers({
    types: function () {
        return ['monographs', 'conferenceMaterials', 'studiesPublications',
            'socioPoliticalPublications', 'literaryAndArtPublication', 'other'];
    }
});