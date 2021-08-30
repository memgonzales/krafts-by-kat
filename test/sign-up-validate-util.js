const isAdminCredential = function(value) {
    /* Provide the email address and username of the administrator account as constants */
    const adminEmail = "krafts.by.kat.webmaster@gmail.com";
    const adminUsername = "kraftsbykatadmin";

    return value == adminEmail || value == adminUsername;
}

module.exports = {
    isAdminCredential
}