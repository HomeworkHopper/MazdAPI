$('#vehicleListDropdown').on('change', function () {
    $('#vehicleListDropdown').prop('hidden', !$(this).val());
    $('#statusActionButton').prop('disabled', !$(this).val());
    $('#vehicleActionDropdown').prop('disabled', !$(this).val());
}).trigger('change');

// abstracted function for sending api requests to the server
function apiRequest(url, successCallback) {

    // show a loading overlay
    show_overlay();

    // make the API request
    fetch(url)
        .then(response => {
            if(!response.ok) {
                throw new Error('server response was not OK (' + response.status + ')')
            } else {
                return response.json()
            }
        })
        .then(json => {
            successCallback(json)
        }).catch(error => {
            console.log(error)
        }).finally(() => {
            hide_overlay()
        });
}

// update vehicle list
$('#getVehiclesActionButton').on('click', () => {
    apiRequest('/api/v1/vehicles/list', json => {
        console.log(json)
        $.each(json.data, function (i, vehicle) {
            $('#vehicleListDropdown').append($('<option>', {
                value: vehicle.id,
                text: vehicle.nickname
            }));
        });
        $('#vehicleListDropdown').change()
    });
});

// update status
$('#statusActionButton').on('click', () => {
    apiRequest(`/api/v1/vehicles/${$('#vehicleListDropdown').val()}/status`, json => {
        console.log('status updated: ' + json.data)
    });
});

// start engine
$('#startEngineActionButton').on('click', () => {
    apiRequest(`/api/v1/vehicles/${$('#vehicleListDropdown').val()}/start`, json => {
        console.log('engine started')
    });
});

// lock doors
$('#lockDoorsActionButton').on('click', () => {
    apiRequest(`/api/v1/vehicles/${$('#vehicleListDropdown').val()}/lock`, json => {
        console.log('doors locked')
    });
});

// unlock doors
$('#unlockDoorsActionButton').on('click', () => {
    apiRequest(`/api/v1/vehicles/${$('#vehicleListDropdown').val()}/unlock`, json => {
        console.log('doors unlocked')
    });
});