var sendJsonRequest = async (path, passedMethod, passedBody) => {
    var response;
    if (passedMethod == "POST") {
        response = await fetch(basicUrl + path, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie("token")
            },
            body: JSON.stringify({ passedBody })
        })
    } else {
        response = await fetch(basicUrl + path, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie("token")
            }
        })
    }

    if (response.status == 200) {
        return await response.text()
    } else if (response.status == 400) {
        relogin()
    } else {
        return showFailed();
    }
}

var getPage = async (path) => {
    const response = await fetch(basicUrl + path, {
        headers: {
            'Authorization': 'Bearer ' + getCookie("token")
        }
    })
    if (response.status == 200) {
        return await response.text()
    } else if (response.status == 400) {
        relogin()
    } else {
        return showFailed();
    }
}

var showFailed = () => {
    return "<h1>Failed To Fetch</h1>"
}
