"""
En __init__ definimos el app factory:
"""
from flask import Flask
from .config import Config
from .extensions import db, migrate, login_manager
"""
Importación de modelos
"""

"""
Importacion de blueprints
"""

def create_app():
    app = Flask(__name__) # Instancia de flask
    app.config.from_object(Config) # Establecemos la configuracion de flask desde la clase Config

    # Inicializamos las extensiones
    db.init_app(app)
    migrate.init_app(app, db)
    login_manager.init_app(app)

    # Funcion user_loader
    @login_manager.user_loader
    def load_user(user_id):
        return Users.query.get(int(user_id))


    """
    Registro de blueprints
    """

    return app