$(document).ready(async function async() {
    var services = await sendJsonRequest("get_services?skip=0")
    if (services != undefined) {
        fillTable(JSON.parse(services))
        hideLoader()
    }
});

var fillTable = (services) => {
    $(".tbody").empty();
    for (var i = 0; i < services.length; i++) {
        var serviceItem = '<a href="" class="tr">'

        serviceItem += '<div class="td">' + (i + 1) + '</div>'
        serviceItem += '<div class="td">' + services[i].serviceId + '</div>'
        serviceItem += '<div class="td">' + services[i].type + '</div>'
        serviceItem += '<div class="td">' + services[i].complaints[0].complaint + '</div>'
        serviceItem += '<div class="td">' + services[i].currentStatus + '</div>'
        serviceItem += '<div class="td">' + services[i].quickService + '</div>'

        serviceItem += '</a>'

        $(".tbody").append(serviceItem);
    }
}

var showAddService = async function () {
    var currentBody = await getPage('add_service_page')
    if (currentBody != undefined) {
        $("main").html(currentBody)
        $.session.set("currentPath", "add_service")
    }
}