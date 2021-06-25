from ..webdriver_server import EdgeMonyharDriverServer
from .base import WdspecExecutor, WdspecProtocol


class EdgeMonyharDriverProtocol(WdspecProtocol):
    server_cls = EdgeMonyharDriverServer


class EdgeMonyharDriverWdspecExecutor(WdspecExecutor):
    protocol_cls = EdgeMonyharDriverProtocol
