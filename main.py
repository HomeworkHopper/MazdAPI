import os
import secrets
from os.path import join, dirname

import pymazda
from dotenv import load_dotenv
from flask import Flask, render_template, jsonify

app = Flask(__name__)
app.secret_key = secrets.token_hex(16)

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)


@app.route('/', methods=['GET'])
async def dashboard():
    return render_template('dashboard.html')


@app.route('/api/v1/vehicles/list', methods=['GET'])
async def api_get_vehicles():
    async def get_vehicles(client: pymazda.Client):
        vehicles = await client.get_vehicles()
        return vehicles
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


async def mazda_api_call(api_function: callable):
    """
    A function which initializes a MyMazda API connection and executes a provided API function

    :param api_function: The function to call
    :param function_args: The arguments to be passed to the provided function
    :return: The value(s) returned by the provided function, if any
    """
    try:
        # initialize the Mazda API client
        client = pymazda.Client(os.environ.get("MAZDA_USERNAME"), os.environ.get("MAZDA_PASSWORD"), "MNAO")

        # make the desired request
        result = await api_function(client)

        # close the API client connection
        await client.close()

        # return the result
        return jsonify({
            'success': True,
            'data': result
        })

    except Exception as e:
        # return the error message
        return jsonify({
            'success': False,
            'error_msg': str(e)
        })


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=False, use_reloader=False)
