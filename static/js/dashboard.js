$('#vehicleListDropdown').on('change', function () {
    $('#vehicleListDropdown').prop('hidden', !$(this).val());
    $('#getStatusButton').prop('disabled', !$(this).val());
    $('#vehicleActionDropdown').prop('disabled', !$(this).val());
}).trigger('change');



$('#getVehiclesButton').on('click', async function () {

    show_overlay();

    const vehicles = await get_vehicles();

    $.each(vehicles, function (i, vehicle) {
        console.log(vehicle);
        $('#vehicleListDropdown').append($('<option>', {
            value: vehicle.id,
            text: vehicle.nickname
        }));
    });

    $('#vehicleListDropdown').trigger('change');

    hide_overlay();

});


$('#updateStatusButton').on('click', async function() {

    show_overlay();

    const status = await get_status($('#vehicleListDropdown').val());

    console.log(status);

    hide_overlay();

});
