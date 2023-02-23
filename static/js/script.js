

$(window).load(function() {
    $('#loading').hide();
});


$("#vehiclesButton").click(function(){

    $('#loading').show();

    $.ajax({
        url: "api/v1/vehicles",
        success: function(vehicles){
            for (const vehicle of vehicles) {
                console.log(vehicle.carlineName)
            }
            $('#loading').hide();
        }
    });
});





$("#statusButton").click(function(){

    $('#loading').show();

    $.ajax({
        url: "api/v1/status",
        success: function(result){
            console.log(result);
        }
    });

    $('#loading').hide();
});
