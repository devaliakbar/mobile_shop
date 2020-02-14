$(document).ready(function async() {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
        window.history.pushState(null, "", window.location.href);
    };
    initialise()
});

initialise = async () => {
    showLoader()
    if (getCookie("keep_me_log_in") != "yes" && getCookie("logged_in") != "yes") {
        logOut()
    } else {
        setUpNavigationBar()
        setUpCurrentPath()
    }
}

var setUpNavigationBar = () => {
    if (getCookie("navigationBar") === 'true') {
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
            currentBody = await getPage('service_page')
            break;
        case "add_service":
            currentBody = await getPage('add_service_page')
            break;
        default:
            currentBody = await getPage('home')
            break;
    }

    if (currentBody != undefined) {
        $("main").html(currentBody)
    }
}

var showService = async function () {
    var currentBody = await getPage('service_page')
    if (currentBody != undefined) {
        $("main").html(currentBody)
        $.session.set("currentPath", "service")
    }
}

var showHome = async function () {
    var currentBody = await getPage('home')
    if (currentBody != undefined) {
        $("main").html(currentBody)
        $.session.set("currentPath", "home")
    }
}