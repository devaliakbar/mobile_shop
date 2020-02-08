$(document).ready(function async() {
    deleteAllCookies()
});

$("#login").click(function async() {
    var username = $("#username").val().trim()
    var password = $("#password").val().trim()
    if (username == "" || password == "") {
        return alert("Please enter username and password")
    }
    login(username, password)
});

var login = async (username, password) => {

    const response = await fetch(basicUrl + "login", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    if (response.status == 200) {
        if ($('#keep_me_log_in').is(':checked')) {
            setCookie("keep_me_log_in", "yes")
        }
        $.session.set("logged_in", "yes")
        window.location.href = basicUrl;
    } else {
        alert("Wrong username or password")
    }
}