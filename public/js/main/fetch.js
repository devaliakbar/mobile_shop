var sendJsonRequest = async (path, passedMethod, passedBody) => {
    var response;
    if (passedMethod == "POST") {
        response = await fetch(basicUrl + path, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ passedBody })
        })
    } else {
        response = await fetch(basicUrl + path, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
    }

    if (response.status == 200) {
        return await response.text()
    } else if (response.status == 400) {
        relogin()
    } else {
        showFailed()
        return
    }
}

var getPage = async (path) => {
    const response = await fetch(basicUrl + path, {
    })
    if (response.status == 200) {
        return await response.text()
    } else if (response.status == 400) {
        relogin()
    } else {
        showFailed()
        return
    }
}


var logOut = async () => {
    // const response = await fetch(basicUrl + "/logout", {})
    deleteAllCookies()
    window.location.replace(basicUrl + "login.html")
}



var showFailed = () => {
    hideLoader()
    $("main").html("<h1>Failed To Fetch</h1>")
}
