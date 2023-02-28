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

async function start_engine() {
    const result = await $.ajax({
        url: `/api/v1/vehicles/${vehicle_id}/start`,
        type: 'GET',
    });
    return result;
}

async function unlock_doors() {
    const result = await $.ajax({
        url: `/api/v1/vehicles/${vehicle_id}/unlock`,
        type: 'GET',
    });
    return result;
}

async function lock_doors() {
    const result = await $.ajax({
        url: `/api/v1/vehicles/${vehicle_id}/lock`,
        type: 'GET',
    });
    return result;
}