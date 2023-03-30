import pymazda


class MapicClient:
    """
    Thin wrapper for pymazda.Client that can be used in an async-with block.
    """

    def __init__(self, **kwargs):
        """


        :param kwargs: named arguments for creating a pymazda.Client later
        """
        self.kwargs = kwargs

    async def __aenter__(self):
        """
        Runs upon entering an async-with block. Returns a new pymazda.Client object

        :return: a new pymazda.Client object
        """
        self.client = pymazda.Client(**self.kwargs)
        return self.client

    async def __aexit__(self, *args):
        """
        Runs upon exiting an async-with block. Closes the current pymazda.Client object

        :param args: (ignored)
        :return: None
        """
        await self.client.close()
