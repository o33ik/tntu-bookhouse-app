Meteor.startup(function () {
    AppTntu.canUser = function (action, userId, groupId) {
        switch (action) {
            case 'createPublication':
            case 'editPublication':
            case 'deletePublication':
                return Roles.userIsInRole(userId, 'editPublication');
            case 'addNews':
            case 'editNews':
                return Roles.userIsInRole(userId, 'editNews');
            default: throw new Meteor.Error('Invalid action!');
        }
    };
});