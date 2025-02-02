FROM python:3.9-slim

WORKDIR /app

# Копирование только requirements.txt сначала
COPY requirements.txt .

# Установка зависимостей
RUN pip install --no-cache-dir -r requirements.txt

# Копирование остального кода
COPY . .

# Порт для Railway
ENV PORT=8080
EXPOSE 8080

# Запуск через gunicorn с оптимизированными настройками
CMD ["gunicorn", "--bind", "0.0.0.0:8080", "--workers", "4", "--timeout", "120", "backend.app:app"]