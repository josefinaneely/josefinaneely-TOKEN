from app import app
from api.models import db
import sys
import os

# Agrega la carpeta src al PYTHONPATH
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))


with app.app_context():
    db.session.execute(
        'UPDATE "user" SET username = \'default_username\' WHERE username IS NULL;')
    db.session.commit()
    print("Usernames actualizados correctamente.")
