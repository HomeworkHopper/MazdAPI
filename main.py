import asyncio
import pymazda

import os
from os.path import join, dirname
from dotenv import load_dotenv

from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)


@app.route('/', methods=['GET'])
def home():
    return render_template('dash.html')



@app.route('/api/v1/vehicles', methods=['GET'])
async def api_vehicles():
    return await mazda_api_call(get_vehicles)

@app.route('/api/v1/status/<vehicle_id>', methods=['GET'])
async def api_get_status(vehicle_id):
    return await get_vehicle_status(vehicle_id)


async def get_vehicles(client):
    return await client.get_vehicles()


async def mazda_api_call(api_function: callable, *function_args) -> any:
    """
    A function which initializes a MyMazda API connection 

    :param api_function: The function to call
    :param function_args: The arguments to be passed to the provided function
    :return: The value(s) returned by the provided function, if any
    """   

    client = pymazda.Client(os.environ.get("USERNAME"), os.environ.get("PASSWORD"), "MNAO")

    result = await api_function(client, *function_args)

    await client.close();

    return result


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=False, use_reloader=False)

