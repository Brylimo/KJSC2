module.exports = {
    isOwner: function(request, response) {
        if (request.user) {
            return true;
        } else {
            return false;
        }
    },
    user: function(request, response) {
        return request.user;
    }
}