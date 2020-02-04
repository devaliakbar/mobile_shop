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
        const content = await response.json();
        setCookie("token", content.token)
        setCookie("username", content.user.username)
        window.location.href = basicUrl;
    }
}