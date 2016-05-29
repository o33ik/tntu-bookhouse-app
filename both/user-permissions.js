export default function (action, userId, groupId) {
    switch (action) {
        case 'createAuthor':
        case 'editAuthor':
        case 'deleteAuthor':
        case 'createPublication':
        case 'editPublication':
        case 'changePublicationStatus':
        case 'addNews':
        case 'editNews':
        case 'viewCheckoutCredentials':
        case 'addCheckoutCredentials':
        case 'editCheckoutCredentials':
            return Roles.userIsInRole(userId, 'admin', Roles.GLOBAL_GROUP);
        default:
            throw new Meteor.Error('Invalid action!');
    }
};