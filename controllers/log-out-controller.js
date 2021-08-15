/* Controller for logging a user out of the web application */
const logOutController = {

    /* Log an active user out of the web application */
    getLogOut: function (req, res) {
        
        /* Destroy the current session and redirect to the landing page */
        req.session.destroy(function(err) {
            if(err) throw err;
            res.redirect('/');
        });
    }
}

module.exports = logOutController;