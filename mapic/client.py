from dataclasses import dataclass

import pymazda
import yaml


@dataclass(frozen=True)
class MapicConfig:
    """
    Dataclass for mAPIc configuration/authentication details.
    """
    email: str
    password: str
    region: str

    @staticmethod
    def from_yaml(config_file_path: str):
        with open(config_file_path) as config_file:
            # parse the yaml
            data = yaml.safe_load(config_file)

            # select the config details
            config = data['mapic']['config']

            # parse them into a new Config object
            return MapicConfig(**config)


class MapicClient:
    """
    Thin wrapper for pymazda.Client that can be used in an async-with block.
    """

    def __init__(self, config: MapicConfig):
        """
        Construct a new MapicClient, backed by the provided MapicConfig

        :param config: the MapicConfig for creating a pymazda.Client object later
        """
        self.config = config

    async def __aenter__(self):
        """
        Runs upon entering an async-with block. Returns a new pymazda.Client object

        :return: a new pymazda.Client object
        """
        self.client = pymazda.Client(self.config.email, self.config.password, self.config.region)
        return self.client

    async def __aexit__(self, *args):
        """
        Runs upon exiting an async-with block. Closes the current pymazda.Client object

        :param args: (ignored)
        :return: None
        """
        await self.client.close()
