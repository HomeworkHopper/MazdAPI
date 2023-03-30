import os

from mapic import client
from mapic import app

if __name__ == "__main__":

    # generate a MapicConfig from config.yml
    config = client.MapicConfig.from_yaml(os.path.join(os.path.dirname(os.path.realpath(__file__)), 'config.yml'))

    # create a new MapicClient
    app.config['mapic_client'] = client.MapicClient(config)

    # run the flask application
    app.run(host="0.0.0.0", debug=False, use_reloader=False)
