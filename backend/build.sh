#!/bin/bash
set -o errexit

# Install dependencies
pip install -r requirements.txt

# FORCE STATIC_ROOT for Django (Render specific fix)
export DJANGO_SETTINGS_MODULE="backend.settings"
export DJANGO_STATIC_ROOT="/opt/render/project/staticfiles"

# Create the directory
mkdir -p /opt/render/project/staticfiles

# Run collectstatic
python manage.py collectstatic --noinput

# Run migrations
python manage.py migrate
