$(document).ready(async function async() {
    var services = await sendJsonRequest("get_services")
    console.log(services)
    hideLoader()
});