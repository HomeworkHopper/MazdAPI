const Routes = Object.freeze({
    List: '/api/v1/vehicles/list',
    Status: '/api/v1/vehicles/<vehicle_id>/status',
    Start: '/api/v1/vehicles/<vehicle_id>/start',
    Unlock: '/api/v1/vehicles/<vehicle_id>/unlock',
    Lock: '/api/v1/vehicles/<vehicle_id>/lock'
})

async function vehicleApiRequest(route, vehicleId) {
    if(route !== undefined) {

        let response;

        try {
            response = await fetch(route.replace('<vehicle_id>', vehicleId));
        } catch(error) {
            return {success: false, error_msg: `unable to make request: ${error}`}
        }

        if(response?.ok) {
            return response.json();
        } else {
            return {success: false, error_msg: `HTTP Response Code: ${response?.status}`}
        }
    }
}
