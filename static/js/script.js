
// Query the server for a list of vehicle IDs
function get_vehicles(){
    $.ajax('/api/v1/vehicles/list', {
        type: 'GET',
        success: function(vehicles){
            $.each(vehicles, function (i, vehicle) {
                $('#carList').append($('<option>', { 
                    value: vehicle.id,
                    text : vehicle.nickname
                }));
            });
        },
    });
}

// Get the status of a vehicle by ID
function get_status(id){
    $.ajax(`/api/v1/vehicles/${id}/status`, {
        type: 'GET',
        success: function(result){
            $('html').append('<pre>' + JSON.stringify(result, null, 2) + '</pre>')
        },
    });
}





// Show/hide loading message
$.ajaxPrefilter(function(options, _, jqXHR) {
    
    $('#loading').show();

    jqXHR.complete(function() {
        $('#loading').hide();
    });
});


// Load car data
$('#carList').change(function() {
    get_status($(this).val());
});


// Load vehicles at startup
$( document ).ready(function() {
    get_vehicles();
});


