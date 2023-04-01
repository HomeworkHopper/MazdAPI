const UI = Object.freeze({

    // get vehicles button
    getVehicles: document.getElementById('getVehiclesActionButton'),

    // vehicle list dropdown
    vehicleList: document.getElementById('vehicleListDropdown'),

    // vehicle action dropdown
    vehicleActions: document.getElementById('vehicleActionDropdown'),

    // get status button
    getStatus: document.getElementById('statusActionButton'),

    // start engine button
    startEngine: document.getElementById('startEngineActionButton'),

    // lock doors button
    lockDoors: document.getElementById('lockDoorsActionButton'),

    // unlock doors button
    unlockDoors: document.getElementById('unlockDoorsActionButton'),

    // vehicle content div
    vehicleContentDiv: document.getElementById('vehicleContent'),

    // status div
    statusDiv: document.getElementById('statusDiv')
});

function currentVID() {
    return JSON.parse(UI.vehicleList.value).id;
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

// update vehicle list
UI.getVehicles.addEventListener('click', () => {
    apiRequest('/api/v1/vehicles/list', data => {
        // vehicle list update callback

        // indicate success
        showAlert('vehicles fetched', 'success')

        // populate the vehicle dropdown
        for (const vehicle of Object.values(data)) {
            UI.vehicleList.add(new Option(vehicle.nickname, JSON.stringify(vehicle)))
        }

        // manually trigger vehicle change event
        UI.vehicleList.dispatchEvent(new Event('change'))

        // update visibility of UI components
        UI.getVehicles.hidden = true
        UI.vehicleList.hidden = false
        UI.vehicleContentDiv.hidden = false
    });
});

// selected vehicle change
UI.vehicleList.addEventListener('change', () => {

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
});

// get status
UI.getStatus.addEventListener('click', () => {
    apiRequest(`/api/v1/vehicles/${currentVID()}/status`, data => {

        showAlert('status fetched', 'success')

        document.getElementById('remainingFuelProgressBar').style.width = data.fuelRemainingPercent + '%'
        UI.statusDiv.hidden = false
    });
});

// start engine
UI.startEngine.addEventListener('click', () => {
    apiRequest(`/api/v1/vehicles/${currentVID()}/start`, data => {
        showAlert('engine started', 'success')
    });
});

// lock doors
UI.lockDoors.addEventListener('click', () => {
    apiRequest(`/api/v1/vehicles/${currentVID()}/lock`, data => {
        showAlert('doors locked', 'success')
    });
});

// unlock doors
UI.unlockDoors.addEventListener('click', () => {
    apiRequest(`/api/v1/vehicles/${currentVID()}/unlock`, data => {
        showAlert('doors unlocked', 'success')
    });
});