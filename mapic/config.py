from dataclasses import dataclass

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
