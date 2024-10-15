from flaskr.inventory import inventory_blueprint
from flask import render_template

@inventory_blueprint.route('/inventory')
def inventory():
    """
    esta funcion rendiriza la pantalla de inventario y carga las categorias cargadas
    :return:
    """
    return render_template('inventory.html')

@inventory_blueprint.route('/add_categorie')
def add_category():
    pass