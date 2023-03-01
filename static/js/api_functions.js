const Routes = Object.freeze({
    List: '/api/v1/vehicles/list',
    Status: '/api/v1/vehicles/<vehicle_id>/status',
    Start: '/api/v1/vehicles/<vehicle_id>/start',
    Unlock: '/api/v1/vehicles/<vehicle_id>/unlock',
    Lock: '/api/v1/vehicles/<vehicle_id>/lock'
})

async function vehicleApiRequest(route, vehicleId) {
    if(route !== undefined) {
        const result = await $.ajax({
            url: route.replace('<vehicle_id>', vehicleId),
            type: 'GET',
        });
        return result
    }
}
