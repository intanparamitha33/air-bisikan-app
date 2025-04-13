# server.py
import http.server
import socketserver

PORT = 8080

class CORSHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        http.server.SimpleHTTPRequestHandler.end_headers(self)

Handler = CORSHTTPRequestHandler
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("Server running at port", PORT)
    httpd.serve_forever()

# untuk enable CORS supaya WebView bisa fetch model - bisa dijalankan di powershell
# cd BisikanApp
# python server.py