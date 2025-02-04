import os
from flask import Flask, render_template
from flask_cors import CORS

app = Flask(__name__, 
    template_folder='../templates',
    static_folder='../static')
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.after_request
def add_header(response):
    if 'video' in response.mimetype:
        response.headers['Cache-Control'] = 'public, max-age=3600'
        response.headers['Accept-Ranges'] = 'bytes'
        response.headers.pop('Content-Disposition', None)  # Удаляем заголовок
        try:
            response.headers['Content-Length'] = str(os.path.getsize(os.path.join(app.static_folder, 'videos/cucuanimation1.mp4')))
        except:
            pass
    return response

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port)