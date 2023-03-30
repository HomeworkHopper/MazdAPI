import pymazda


class MapicClient(pymazda.Client):
    """
    Subclass for pymazda.Client that can be used in an async-with block.
    """

    def __init__(self, *args):
        pymazda.Client.__init__(self, *args)

    async def __aenter__(self):
        return self

    async def __aexit__(self, a, b, c):
        await self.close()
