FROM python:3.9-slim

# Увеличиваем лимиты на файлы
ENV NGINX_MAX_UPLOAD_SIZE=100M
ENV NGINX_PROXY_BUFFERS_NUMBER=8
ENV NGINX_PROXY_BUFFERS_SIZE=16k

# Установка рабочей директории
WORKDIR /app

# Копирование только requirements.txt сначала
COPY backend/requirements.txt .

# Установка зависимостей
RUN pip install --no-cache-dir -r requirements.txt

# Копирование остального кода
COPY . .

# Настройка переменных окружения
ENV FLASK_APP=backend/app.py
ENV FLASK_ENV=production

# Порт для Railway
ENV PORT=8080
EXPOSE 8080

# Оптимизация для больших файлов
ENV GUNICORN_CMD_ARGS="--workers=4 --timeout=120 --keep-alive=5 --max-requests=1000 --worker-connections=1000"

# Запуск через gunicorn с оптимизированными настройками
CMD ["gunicorn", "--bind", "0.0.0.0:8080", "--workers", "4", "--timeout", "120", "--keep-alive", "5", "--max-requests", "1000", "backend.app:app"]