# Memecoin Website

This is a website for the Memecoin project, built with Flask, HTML, CSS, and JavaScript.

## Features
- Responsive design
- Interactive animations
- Language switcher (English and Russian)
- Background music control
- Cucumber rain animation

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/memecoin-website.git
    cd memecoin-website
    ```

2. Create and activate a virtual environment:
    ```bash
    python -m venv venv
    source venv/bin/activate  # For Unix/Mac
    .\venv\Scripts\activate  # For Windows
    ```

3. Install the dependencies:
    ```bash
    pip install -r backend/requirements.txt
    ```

4. Run the Flask application:
    ```bash
    python backend/app.py
    ```

5. Open your browser and go to `http://localhost:5001`.

## Deployment

To deploy the project on DigitalOcean App Platform:

1. Create a new app on DigitalOcean App Platform.
2. Connect your GitHub repository.
3. Set the build and run commands:
    - Build command: `pip install -r backend/requirements.txt`
    - Run command: `gunicorn -w 4 -b 0.0.0.0:8080 app:app`
4. Deploy the app.

## License

This project is licensed under the MIT License.