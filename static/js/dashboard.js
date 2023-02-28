$('#vehicleListDropdown').on('change', function () {
    $('#vehicleListDropdown').prop('hidden', !$(this).val());
    $('#getStatusButton').prop('disabled', !$(this).val());
    $('#vehicleActionDropdown').prop('disabled', !$(this).val());
}).trigger('change');

$('#getVehiclesButton').on('click', async function () {

    // show the loading animation
    show_overlay();

    // make the API request
    const response = await get_vehicles();

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



$('#updateStatusButton').on('click', async function() {

    // show the loading animation
    show_overlay();

    // get the id of the currently selected vehicle
    const selectedVehicleId = $('#vehicleListDropdown').val();

    // make the API request
    const response = await get_status(selectedVehicleId);

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
