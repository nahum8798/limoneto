"""
En config declaramos las variables de entorno, secret_key, file loaders
y establecemos la conexion a la base de datos
"""
import os

class Config:

    """
    Configuracion de acceso y conexion a base de datos
    """
    # la secret_key asegura que el programa y la base de datos esten fuera de peligro
    # por ahora la trabajamos por aca, despues se carga en el enviroment template
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'this_is_my_secret_key'
    # database_uri es el uniform resource identifier y lo usamos para acceder a la db
    # por ahora lo trabajamos aca,  despues se carga en el enviroment template
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URI') or 'mysql+pymysql://root:nM1258menMa@localhost/db_limoneto'
    # no trackeamos modificaciones para ahorrar procesos
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    """
    Aca configuramos file loader
    """