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

    // status div
    statusDiv: document.getElementById('statusDiv')
});

function currentVID() {
    return JSON.parse(UI.vehicleList.value).id
}

// abstracted function for sending api requests to the server
function apiRequest(url, successCallback) {

    // show a loading overlay
    show_overlay()

    // make the API request
    fetch(url)
        .then(response => {
            return response.json().then(json => {
                if (response.ok) {
                    successCallback(json.data)
                } else {
                    throw Error(json.error)
                }
            })
        })
        .catch(error => {
            showAlert(error.message, 'danger')
        })
        .finally(() => {
            hide_overlay()
        });
}

// update vehicle list
UI.getVehicles.addEventListener('click', () => {
    apiRequest('/api/v1/vehicles/list', data => {
        console.log('vehicles fetched:')

        showAlert('vehicles fetched', 'success')

        for (const vehicle of Object.values(data)) {
            UI.vehicleList.add(new Option(vehicle.nickname, JSON.stringify(vehicle)))
        }

        UI.getVehicles.hidden = true
        UI.vehicleList.hidden = false
    });
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