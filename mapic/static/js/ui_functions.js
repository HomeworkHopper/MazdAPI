// show the loading overlay
function show_overlay() {
    $.LoadingOverlay('show');
}

// hide the loading overlay
function hide_overlay() {
    $.LoadingOverlay('hide');
}

// create and display a new alert of the given type with the given message
const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
function showAlert(message, type) {
    const wrapper = document.createElement('div')

    // create the alert
    wrapper.innerHTML =
        `<div class="alert alert-${type} alert-dismissible" role="alert">
           <div>${message}</div>
           <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;

    // show the alert
    alertPlaceholder.append(wrapper)
}