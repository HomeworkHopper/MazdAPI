import pymazda
from flask import Flask, render_template

from mapic.client import MapicClient

app = Flask(__name__)


async def mazda_api_call(api_function: callable):
    """
    Initializes a MyMazda API connection and passes it to the provided function.

    :param api_function: The API function to call
    :return: The response returned by the API function, or an error message if something went wrong
    """

    # fetch the MapicClient associated with this application
    mapic_client = app.config.get('mapic_client')

    # ensure the MapicClient has been initialized
    if mapic_client is None:
        return {'success': False, 'error': 'Credentials not set'}

    # attempt to start the client and make a request
    try:
        async with mapic_client as mazda_client:
            # call the provided api function
            api_response = await api_function(mazda_client)

            # relay the response to the client
            return {'success': True, 'data': api_response}

    except Exception as e:
        # relay the error message to the client
        return {'success': False, 'error': str(e)}


@app.route('/', methods=['GET'])
async def dashboard():
    return render_template('dashboard.html')


@app.route('/api/v1/vehicles/list', methods=['GET'])
async def api_get_vehicles():
    async def get_vehicles(mazda_client: pymazda.Client):
        return await mazda_client.get_vehicles()

    return await mazda_api_call(get_vehicles)


@app.route('/api/v1/vehicles/<vehicle_id>/status', methods=['GET'])
async def api_get_status(vehicle_id):
    async def get_status(mazda_client: pymazda.Client):
        return await mazda_client.get_vehicle_status(vehicle_id)

    return await mazda_api_call(get_status)


@app.route('/api/v1/vehicles/<vehicle_id>/start', methods=['GET'])
async def api_start_engine(vehicle_id):
    async def start_engine(mazda_client: pymazda.Client):
        return await mazda_client.start_engine(vehicle_id)

    return await mazda_api_call(start_engine)


@app.route('/api/v1/vehicles/<vehicle_id>/unlock', methods=['GET'])
async def api_unlock_doors(vehicle_id):
    async def unlock_doors(mazda_client: pymazda.Client):
        return await mazda_client.unlock_doors(vehicle_id)

    return await mazda_api_call(unlock_doors)


@app.route('/api/v1/vehicles/<vehicle_id>/lock', methods=['GET'])
async def api_lock_doors(vehicle_id):
    async def lock_doors(mazda_client: pymazda.Client):
        return await mazda_client.lock_doors(vehicle_id)

    return await mazda_api_call(lock_doors)
