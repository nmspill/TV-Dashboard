import os
from http.server import BaseHTTPRequestHandler, HTTPServer
host_name = '192.168.1.14'    
host_port = 8080

class Serv(BaseHTTPRequestHandler):

    def do_GET(self):
        if self.path == '/':
            self.path = '/index.html'
        try:
            file_to_open = open(self.path[1:]).read()
            self.send_response(200)
        except:
            file_to_open = "File not found"
            self.send_response(404)
        self.end_headers()
        self.wfile.write(bytes(file_to_open, 'utf-8'))


httpd = HTTPServer((host_name, host_port), Serv)
httpd.serve_forever()
