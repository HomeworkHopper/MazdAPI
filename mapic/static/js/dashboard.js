const UI = Object.freeze({

    // get vehicles button
    getVehicles: document.getElementById('getVehiclesActionButton'),

    // vehicle list dropdown
    vehicleList: document.getElementById('vehicleListDropdown'),

    // get status button
    getStatus: document.getElementById('updateStatusButton'),

    // start engine button
    startEngine: document.getElementById('startEngineActionButton'),

    // stop engine button
    stopEngine: document.getElementById('stopEngineActionButton'),

    // lock doors button
    lockDoors: document.getElementById('lockDoorsActionButton'),

    // unlock doors button
    unlockDoors: document.getElementById('unlockDoorsActionButton'),

    // turn on hazard lights button
    hazardsOn: document.getElementById('turnOnHazardsButton'),

    // turn off hazard light button
    hazardsOff: document.getElementById('turnOffHazardsButton'),

    // vehicle content div
    vehicleContentDiv: document.getElementById('vehicleContent'),

    // status div
    statusDiv: document.getElementById('statusDiv')
});

// returns the vehicle id associated with the currently selected vehicle.
// (this id is required by all vehicle-related Mazda API calls)
function currentVID() {
    return JSON.parse(UI.vehicleList.value).id;
}

// converts kilometers to a unit my American brain is accustomed to.
// result is truncated to the nearest mile
function KmToMiles(km) {
    return Math.floor(km * 0.621371);
}

// abstract function for sending api requests to the server
function apiRequest(url, successCallback) {

    // show the loading overlay
    show_overlay();

    // make the api request
    fetch(url)
        .then(response => {
            if (!response.ok) {
                // the server will always return an OK response, even if an error occurs, so
                // any non-OK response indicates an issue beyond the scope of the application
                throw new Error('Unable to contact server');
            }
            // pass the response JSON onto the next stage - the JSON itself will contain a success
            // field indicating whether the server completed the request successfully, or not
            return response.json();
        })
        .then(json => {
            if (json.success) {
                // the backend completed the request successfully - pass the resulting
                // data to a user-provided callback function for further processing
                successCallback(json.data);
            } else {
                // indicates that an error occurred on the server -error messages from the
                // server are passed to us here, where we can display them to the user
                throw new Error(`Server Error: ${json.error}`);
            }
        }).catch(error => {
        // alert the user of an error
        showAlert(error.message, 'danger');
    })
        .finally(() => {
            // hide the loading overlay
            hide_overlay();
        });
}

// populates the base info table for the currently selected vehicle.
function setBaseInfo() {
    // get the JSON data associated with the selected vehicle
    const selectedJson = JSON.parse(UI.vehicleList.value);

    // display car model
    $('#carModelInfo').html(selectedJson.carlineName);

    // display car year
    $('#carYearInfo').html(selectedJson.modelYear);

    // display car transmission type
    $('#carTransmissionInfo').html(selectedJson.automaticTransmission ? 'Automatic' : 'Manual');

    // display car type (electric/gasoline)
    $('#carElectricInfo').html(selectedJson.isElectric ? 'Electric' : 'Conventional (non-electric)');

    // display car exterior color
    $('#carExteriorColorInfo').html(selectedJson.exteriorColorName);

    // display car interior color
    $('#carInteriorColorInfo').html(selectedJson.interiorColorName);

    // display car vin
    $('#carVinInfo').html(selectedJson.vin);
}

// populates the status info tables for the currently selected vehicle
function refreshStatus() {

    const id = currentVID();

    // make an API request to fetch the most recent vehicle status
    apiRequest(`/api/v1/vehicles/${id}/status`, data => {

        // fuel and mileage
        $('#fuelRemainingPercent').html(data.fuelRemainingPercent + '%');
        $('#milesRemaining').html(KmToMiles(data.fuelDistanceRemainingKm) + ' miles');
        $('#totalMileage').html(KmToMiles(data.odometerKm) + ' miles');

        // tire pressure
        $('#driverFrontTirePressure').html(data.tirePressure.frontLeftTirePressurePsi || 'N/A');
        $('#passengerFrontTirePressure').html(data.tirePressure.frontRightTirePressurePsi || 'N/A');
        $('#driverRearTirePressure').html(data.tirePressure.rearLeftTirePressurePsi || 'N/A');
        $('#passengerRearTirePressure').html(data.tirePressure.rearRightTirePressurePsi || 'N/A');

        // door ajar status (open/closed)
        $('#driverFrontDoorOpened').html(data.doors.driverDoorOpen ? 'open' : 'closed');
        $('#passengerFrontDoorOpened').html(data.doors.passengerDoorOpen ? 'open' : 'closed');
        $('#driverRearDoorOpened').html(data.doors.rearLeftDoorOpen ? 'open' : 'closed');
        $('#passengerRearDoorOpened').html(data.doors.rearRightDoorOpen ? 'open' : 'closed');

        // door lock status (locked/unlocked)
        $('#driverFrontDoorLocked').html(data.doorLocks.driverDoorUnlocked ? 'unlocked' : 'locked');
        $('#passengerFrontDoorLocked').html(data.doorLocks.passengerDoorUnlocked ? 'unlocked' : 'locked');
        $('#driverRearDoorLocked').html(data.doorLocks.rearLeftDoorUnlocked ? 'unlocked' : 'locked');
        $('#passengerRearDoorLocked').html(data.doorLocks.rearRightDoorUnlocked ? 'unlocked' : 'locked');

        // reveal the status section
        UI.statusDiv.hidden = false

        showAlert('Status Fetched', 'success')
    });
}

// selected vehicle change
UI.vehicleList.addEventListener('change', () => setBaseInfo());

// update vehicle list ('/api/v1/vehicles/list')
UI.getVehicles.addEventListener('click', () => {
    apiRequest('/api/v1/vehicles/list', data => {

        // populate the vehicle dropdown
        for (const vehicle of Object.values(data)) {
            UI.vehicleList.add(new Option(vehicle.nickname, JSON.stringify(vehicle)))
        }

        // manually update base info
        setBaseInfo();

        // update visibility of UI components
        UI.getVehicles.hidden = true
        UI.vehicleList.hidden = false
        UI.vehicleContentDiv.hidden = false

        // indicate success
        showAlert('Vehicles Fetched', 'success')
    });
});

// get status ('/api/v1/vehicles/<vehicle_id>/status')
UI.getStatus.addEventListener('click', () => refreshStatus());

// start engine ('/api/v1/vehicles/<vehicle_id>/start')
UI.startEngine.addEventListener('click', () => {
    apiRequest(`/api/v1/vehicles/${currentVID()}/start`, data => {
        showAlert('Engine Started', 'success')
    });
});

// stop engine ('/api/v1/vehicles/<vehicle_id>/stop')
UI.stopEngine.addEventListener('click', () => {
    apiRequest(`/api/v1/vehicles/${currentVID()}/stop`, data => {
        showAlert('Engine Stopped', 'success')
    });
});

// lock doors ('/api/v1/vehicles/<vehicle_id>/lock')
UI.lockDoors.addEventListener('click', () => {
    apiRequest(`/api/v1/vehicles/${currentVID()}/lock`, data => {
        console.log(data)
        showAlert('Doors Locked', 'success')
    });
});

// unlock doors ('/api/v1/vehicles/<vehicle_id>/unlock')
UI.unlockDoors.addEventListener('click', () => {
    apiRequest(`/api/v1/vehicles/${currentVID()}/unlock`, data => {
        showAlert('Doors Unlocked', 'success')
    });
});

// turn on hazard lights ('/api/v1/vehicles/<vehicle_id>/hazardsOn')
UI.hazardsOn.addEventListener('click', () => {
    apiRequest(`/api/v1/vehicles/${currentVID()}/hazardsOn`, data => {
        showAlert('Alarm Activated', 'success')
    });
});

// turn off hazard lights ('/api/v1/vehicles/<vehicle_id>/hazardsOff')
UI.hazardsOff.addEventListener('click', () => {
    apiRequest(`/api/v1/vehicles/${currentVID()}/hazardsOff`, data => {
        showAlert('Alarm Deactivated', 'success')
    });
});