Meteor.startup(function () {
    AppTntu.canUser = function (action, userId, groupId) {
        switch (action) {
            case 'createAuthor':
            case 'editAuthor':
            case 'deleteAuthor':
            case 'createPublication':
            case 'editPublication':
            case 'deletePublication':
            case 'addNews':
            case 'editNews':
                return Roles.userIsInRole(userId, 'admin', Roles.GLOBAL_GROUP);
            default:
                throw new Meteor.Error('Invalid action!');
        }
    };
});