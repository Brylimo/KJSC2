module.exports = {
    isOwner: function(request, response) {
        if (request.user) {
            return true;
        } else {
            return false;
        }
    },
    user: function(request, response) {
        if (request.user)
            return '👑 ' + request.user.username + '님';
    }
}