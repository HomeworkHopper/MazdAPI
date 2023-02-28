async function get_vehicles() {
    const result = await $.ajax({
        url: 'api/v1/vehicles/list',
        type: 'GET',
    });
    return result;
}

async function get_status(vehicle_id) {
    const result = await $.ajax({
        url: `/api/v1/vehicles/${vehicle_id}/status`,
        type: 'GET',
    });
    return result;
}
