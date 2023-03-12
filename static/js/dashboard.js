
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
    unlockDoors: document.getElementById('unlockDoorsActionButton')
});

// abstracted function for sending api requests to the server
function apiRequest(url, successCallback) {

    // show a loading overlay
    show_overlay()

    // make the API request
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('server response was not OK (' + response.status + ')')
            } else {
                return response.json()
            }
        })
        .then(responseJson => {
            successCallback(responseJson)
        }).catch(error => {
            console.log(error)
        }).finally(() => {
            hide_overlay()
        });
}

// update vehicle list
UI.getVehicles.addEventListener('click', () => {
    apiRequest('/api/v1/vehicles/list', json => {
        console.log('vehicles fetched:')
        console.log(json.data)

        for(const vehicle of Object.values(json.data)) {
            UI.vehicleList.add(new Option(vehicle.nickname, vehicle.id))
        }

        UI.vehicleList.disabled = false
        UI.vehicleActions.disabled = false
    });
});

// get status
UI.getStatus.addEventListener('click', () => {
    apiRequest(`/api/v1/vehicles/${UI.vehicleList.value}/status`, json => {
        console.log('status updated:')
        console.log(json.data)
    });
});

// start engine
UI.startEngine.addEventListener('click', () => {
    apiRequest(`/api/v1/vehicles/${UI.vehicleList.value}/start`, json => {
        console.log('engine started:')
        console.log(json.data)
    });
});

// lock doors
UI.lockDoors.addEventListener('click', () => {
    apiRequest(`/api/v1/vehicles/${UI.vehicleList.value}/lock`, json => {
        console.log('doors locked:')
        console.log(json.data)
    });
});

// unlock doors
UI.unlockDoors.addEventListener('click', () => {
    apiRequest(`/api/v1/vehicles/${UI.vehicleList.value}/unlock`, json => {
        console.log('doors unlocked:')
        console.log(json.data)
    });
});