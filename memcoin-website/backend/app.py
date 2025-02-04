import os
import re
from flask import Flask, render_template, send_file, request, make_response, Response
from flask_cors import CORS

app = Flask(__name__, 
    template_folder='../templates',
    static_folder='../static')
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/static/videos/<filename>')
def serve_video(filename):
    video_path = os.path.join(app.static_folder, 'videos', filename)
    
    if not os.path.exists(video_path):
        return "File not found", 404

    file_size = os.path.getsize(video_path)
    
    range_header = request.headers.get('Range')
    if not range_header:
        response = send_file(video_path, mimetype="video/mp4")
        response.headers["Content-Length"] = str(file_size)
        response.headers["Accept-Ranges"] = "bytes"
        return response

    byte1, byte2 = 0, None
    match = re.search(r"(\d+)-(\d*)", range_header)
    if match:
        g = match.groups()
        byte1 = int(g[0])
        if g[1]:
            byte2 = int(g[1])

    length = file_size - byte1 if byte2 is None else byte2 - byte1 + 1

    with open(video_path, "rb") as f:
        f.seek(byte1)
        data = f.read(length)

    response = Response(data, 206, mimetype="video/mp4")
    response.headers["Content-Range"] = f"bytes {byte1}-{byte2 if byte2 else file_size - 1}/{file_size}"
    response.headers["Accept-Ranges"] = "bytes"
    response.headers["Content-Length"] = str(length)

    return response

@app.after_request
def add_header(response):
    if response.mimetype.startswith("video"):
        response.headers.pop("Content-Disposition", None)
    return response

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port)