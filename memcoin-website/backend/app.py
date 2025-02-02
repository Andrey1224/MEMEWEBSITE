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
    # Кэширование видео на 1 час
    if 'video' in response.mimetype:
        response.headers['Cache-Control'] = 'public, max-age=3600'
    return response

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)