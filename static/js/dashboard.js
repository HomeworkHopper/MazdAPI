$('#vehicleListDropdown').on('change', function () {
    $('#vehicleListDropdown').prop('hidden', !$(this).val());
    $('#getStatusButton').prop('disabled', !$(this).val());
    $('#vehicleActionDropdown').prop('disabled', !$(this).val());
}).trigger('change');

$('#getVehiclesActionButton').on('click', async function () {

    // show the loading animation
    show_overlay();

    // make the API request
    const response = await vehicleApiRequest(Routes.List)

    // check server response
    if(response.success) {
        $.each(response.data, function (i, vehicle) {
            $('#vehicleListDropdown').append($('<option>', {
                value: vehicle.id,
                text: vehicle.nickname
            }));
        });

        // trigger ui update
        $('#vehicleListDropdown').trigger('change');
    }
    else {
        console.log(response.error_msg)
    }

    // hide the loading animation
    hide_overlay();
});


// Update Status Button
$('#statusActionButton').on('click', async function() {

    // show the loading animation
    show_overlay();

    // get the id of the currently selected vehicle
    const selectedVehicleId = $('#vehicleListDropdown').val();

    // make the API request
    const response = await vehicleApiRequest(Routes.Status, selectedVehicleId);

    // check server response
    if(response.success) {
        console.log(response.data);
    }
    else {
        console.log(response.error_msg)
    }

    // hide the loading animation
    hide_overlay();
});

// Start Engine Button
$('#startEngineActionButton').on('click', async function() {

    // show the loading animation
    show_overlay();

    // get the id of the currently selected vehicle
    const selectedVehicleId = $('#vehicleListDropdown').val();

    // make the API request
    const response = await vehicleApiRequest(Routes.Start, selectedVehicleId);

    // check server response
    if(response.success) {
        console.log(response.data);
        alert("Engine Started");
    }
    else {
        console.log(response.error_msg)
    }

    // hide the loading animation
    hide_overlay();
});

// Lock Doors Button
$('#lockDoorsActionButton').on('click', async function() {

    // show the loading animation
    show_overlay();

    // get the id of the currently selected vehicle
    const selectedVehicleId = $('#vehicleListDropdown').val();

    // make the API request
    const response = await vehicleApiRequest(Routes.Lock, selectedVehicleId);

    // check server response
    if(response.success) {
        console.log(response.data);
        alert("Doors Locked");
    }
    else {
        console.log(response.error_msg)
    }

    // hide the loading animation
    hide_overlay();
});

// Unlock Doors Button
$('#unlockDoorsActionButton').on('click', async function() {

    // show the loading animation
    show_overlay();

    // get the id of the currently selected vehicle
    const selectedVehicleId = $('#vehicleListDropdown').val();

    // make the API request
    const response = await vehicleApiRequest(Routes.Unlock, selectedVehicleId);

    // check server response
    if(response.success) {
        console.log(response.data);
        alert("Doors Unlocked");
    }
    else {
        console.log(response.error_msg)
    }

    // hide the loading animation
    hide_overlay();
});