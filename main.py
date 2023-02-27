import os
from os.path import join, dirname
from dotenv import load_dotenv

import asyncio
import pymazda

from flask import Flask, request, jsonify, render_template

from flask_bootstrap import Bootstrap

app = Flask(__name__)
Bootstrap(app)

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

##### Static routes #####
@app.route('/', methods=['GET'])
def app_home():
    return render_template('dashboard.html')


##### API routes #####
@app.route('/api/v1/vehicles/list', methods=['GET'])
async def api_vehicles():
    return await mazda_api_call(get_vehicles)

@app.route('/api/v1/vehicles/<id>/status', methods=['GET'])
async def api_get_status(id):
    return await mazda_api_call(get_status, id)


##### MyMazda API functions #####
async def get_vehicles(client):
    return await client.get_vehicles()

async def get_status(client, vehicle_id):
    return await client.get_vehicle_status(vehicle_id)

async def mazda_api_call(api_function: callable, *function_args) -> any:
    """
    A function which initializes a MyMazda API connection and executes a provided API function

    :param api_function: The function to call
    :param function_args: The arguments to be passed to the provided function
    :return: The value(s) returned by the provided function, if any
    """   

    client = pymazda.Client(os.environ.get("USERNAME"), os.environ.get("PASSWORD"), "MNAO")
    result = await api_function(client, *function_args)

    await client.close();

    return result


##### Main #####
if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=False, use_reloader=False)

