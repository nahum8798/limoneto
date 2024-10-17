from unicodedata import category

from werkzeug.utils import redirect
from flask import url_for
from flaskr.extensions import db
from flaskr.inventory import inventory_blueprint
from flask import render_template
from .forms import CategoryForm, SubCategoryForm
from .models import Categories, SubCategories


@inventory_blueprint.route('/inventory')
def inventory():
    """
    esta funcion rendiriza la pantalla de inventario y carga las categorias cargadas
    :return:
    """
    form = CategoryForm()
    return render_template('inventory.html', form=form)

@inventory_blueprint.route('/add_categorie')
def add_category():

    form = CategoryForm() # Instancia del formulario de categoria
    if form.validate_on_submit():
        newCategory = Categories(
            category_name = form.category_name,
            category_description = form.category_description
        )
        db.session.add(newCategory)
        db.session.commit()
        return redirect(url_for('inventory.inventory'))

    return render_template('inventory.html')
