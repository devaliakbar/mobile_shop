var sendJsonRequest = async (path, passedMethod, passedBody, justShowOutput) => {
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

    if (response.status == 200 || response.status == 201) {
        return await response.text()
    }

    if (justShowOutput) {
        return;
    }

    if (response.status == 400) {
        relogin()
    } else {
        showFailed()
    }
}

var getPage = async (path) => {
    const response = await fetch(basicUrl + path, {
    })
    if (response.status == 200) {
        return await response.text()
    }
    if (response.status == 400) {
        relogin()
    } else {
        showFailed()

    }
}


var logOut = async () => {
    window.location.replace(basicUrl + "login.html")
}



var showFailed = () => {
    hideLoader()
    $("main").html("<h1>Failed To Fetch</h1>")
}
