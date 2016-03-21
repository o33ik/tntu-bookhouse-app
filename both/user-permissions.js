Meteor.startup(function () {
    AppTntu.canUser = function (action, userId, groupId) {
        switch (action) {
            case 'createPublication':
            case 'editPublication':
            case 'deletePublication':
                return Roles.userIsInRole(userId, 'admin', Roles.GLOBAL_GROUP);
            case 'addNews':
            case 'editNews':
                return Roles.userIsInRole(userId, 'admin', Roles.GLOBAL_GROUP);
            default: throw new Meteor.Error('Invalid action!');
        }
    };
});