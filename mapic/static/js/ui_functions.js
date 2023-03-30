function show_overlay() {
    $.LoadingOverlay('show');
}

function hide_overlay() {
    $.LoadingOverlay('hide');
}


const alertPlaceholder = document.getElementById('liveAlertPlaceholder')

function showAlert(message, type) {
    const wrapper = document.createElement('div')
    wrapper.innerHTML =
        `<div class="alert alert-${type} alert-dismissible" role="alert">
           <div>${message}</div>
           <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;

    alertPlaceholder.append(wrapper)
}