if (getCookie("token") == "") {
    window.location.href = basicUrl + "login.html";
}

$(document).ready(function async() {
    initialise()
});

initialise = async () => {
    showLoader()
    setUpNavigationBar()
    setUpCurrentPath()
}

var setUpNavigationBar = () => {
    if ($.session.get("navigationBar") === 'true') {
        $("header nav").removeClass("collapsed");
        openedNav = 1
        $("header nav").addClass("pinned");
        $('main').addClass("navPinned");
    }
}

var setUpCurrentPath = async () => {
    var currentBody;
    var currentPath = $.session.get("currentPath")
    switch (currentPath) {
        case "service":
            currentBody = await getPage('service')
            break;
        default:
            currentBody = await getPage('service')
            break;
    }

    if (currentBody != undefined) {
        $("main").html(currentBody)
    }
}