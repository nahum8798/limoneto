"""
En extensions:
 -instanciamos SQLAlchemy() para hacer la conexion a la db
    y para tener acceso a las consultas SQL
 - Instanciamos LoginManager()
 - Instanciamos Migrate()

 Esto se hace para evitar redundancias e importaciones circulares
"""
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager

db = SQLAlchemy() # Instancia de SQLAlchemy
migrate = Migrate() # Instancia de Migrate
login_manager = LoginManager() # Instancia de LoginManger