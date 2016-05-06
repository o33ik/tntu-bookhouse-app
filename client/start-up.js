Meteor.startup(function(){
    var selectedLanguage = Cookie.get('TAPi18next');
    TAPi18n.setLanguage(selectedLanguage);
});