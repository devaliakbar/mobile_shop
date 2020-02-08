$(document).ready(function async() {
    initialise()
});

initialise = async () => {
    showLoader()

    if (getCookie("keep_me_log_in") != "yes" && $.session.get("logged_in") != "yes") {
        logOut()
    } else {
        setUpNavigationBar()
        setUpCurrentPath()
    }
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
            currentBody = await getPage('service_page')
            break;
        default:
            currentBody = await getPage('service_page')
            break;
    }

    if (currentBody != undefined) {
        $("main").html(currentBody)
    }
}