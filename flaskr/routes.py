"""
En routes tenemos que registrar los blueprints (caminos de acceso)
a los diferentes modulos de la app
"""
from flaskr.main import main_blueprint
from flaskr.auth import auth_bp
from flaskr.inventory import inventory_blueprint
from flaskr.sales import sales_blueprint

def register_blueprint(app):
    app.register_blueprint(main_blueprint, url_prefix='/main')
    app.register_blueprint(auth_bp)
    app.register_blueprint(inventory_blueprint, url_prefix='/inventory')
    app.register_blueprint(sales_blueprint, url_prefix='/sales')