import pymazda
from flask import Flask, render_template
from flask_api import status

from mapic.client import MapicClient
from mapic.config import MapicConfig

app = Flask(__name__)

default_config = MapicConfig.from_yaml('config.yml')


async def mazda_api_call(api_function: callable, config=default_config):
    """
    Initializes a MyMazda API connection and passes it to the provided function.

    :param config: The configuration (email, password, region) to use in the API request
    :param api_function: The API function to call
    :return: The response returned by the API function, or an error if something went wrong
    """

    try:
        # initiate a new mAPIc client from the provided config
        async with MapicClient(config.email, config.password, config.region) as client:
            # call the provided api function
            api_response = await api_function(client)

            # relay the response to the client
            return {'data': api_response}, status.HTTP_200_OK

    except Exception as e:
        # relay the error message to the client
        return {'error': str(e)}, status.HTTP_502_BAD_GATEWAY


########################################################################################################################
# Webapp landing and API routes
########################################################################################################################

@app.route('/', methods=['GET'])
async def dashboard():
    return render_template('dashboard.html')


@app.route('/api/v1/vehicles/list', methods=['GET'])
async def api_get_vehicles():
    async def get_vehicles(client: pymazda.Client):
        return await client.get_vehicles()

    return await mazda_api_call(get_vehicles)


@app.route('/api/v1/vehicles/<vehicle_id>/status', methods=['GET'])
async def api_get_status(vehicle_id):
    async def get_status(client: pymazda.Client):
        return await client.get_vehicle_status(vehicle_id)

    return await mazda_api_call(get_status)


@app.route('/api/v1/vehicles/<vehicle_id>/start', methods=['GET'])
async def api_start_engine(vehicle_id):
    async def start_engine(client: pymazda.Client):
        return await client.start_engine(vehicle_id)

    return await mazda_api_call(start_engine)


@app.route('/api/v1/vehicles/<vehicle_id>/unlock', methods=['GET'])
async def api_unlock_doors(vehicle_id):
    async def unlock_doors(client: pymazda.Client):
        return await client.unlock_doors(vehicle_id)

    return await mazda_api_call(unlock_doors)


@app.route('/api/v1/vehicles/<vehicle_id>/lock', methods=['GET'])
async def api_lock_doors(vehicle_id):
    async def lock_doors(client: pymazda.Client):
        return await client.lock_doors(vehicle_id)

    return await mazda_api_call(lock_doors)
