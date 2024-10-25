from unicodedata import category

from werkzeug.utils import redirect
from flask import url_for
from flaskr.extensions import db
from flaskr.inventory import inventory_blueprint
from flask import render_template, flash
from flaskr.inventory.forms import CategoryForm, SubCategoryForm, DeleteCategoryForm
from .models import Categories, SubCategories


@inventory_blueprint.route('/inventory')
def inventory():
    """
    esta funcion rendiriza la pantalla de inventario y carga las categorias cargadas
    :return:
    """
    form = CategoryForm()

    # Obtener las categorias cargadas
    categories = Categories.get_all_categories()

    return render_template('inventory.html', form=form, categories=categories)


@inventory_blueprint.route('/add_category', methods=['GET', 'POST'])
def add_category():
    form = CategoryForm()  # Instancia del formulario de categoria

    if form.validate_on_submit():
        # Accede a los datos con .data
        newCategory = Categories(
            category_name=form.category_name.data,
            category_description=form.category_description.data
        )
        db.session.add(newCategory)
        db.session.commit()
        return redirect(url_for('inventory.inventory'))

    return render_template('inventory.html', form=form)

@inventory_blueprint.route('/add_subcategory/<int:id_category>', methods=['GET', 'POST'])
def add_subcategory(id_category):
    form = SubCategoryForm()

    if form.validate_on_submit():
        # Accede a los datos con .data
        newCategorySub = SubCategories(
            subcategory_name=form.subcategory_name.data,
            id_category=id_category,
            category_description=form.category_description.data
        )
        db.session.add(newCategorySub)
        db.session.commit()
        return redirect(url_for('inventory.show_products', id_category=id_category))

    return render_template('categories.html', form=form)

@inventory_blueprint.route('/delete_category', methods=['GET', 'POST'])
def delete_category():
    form = DeleteCategoryForm()
    if form.validate_on_submit():
        category_name = form.category_name.data
        category_to_delete = Categories.query.filter_by(category_name=category_name).first()
        if category_to_delete:
            db.session.delete(category_to_delete)
            db.session.commit()
            flash(f'Categoria {category_name} eliminada correctamente')
            return redirect(url_for('inventory.inventory'))
        else:
            flash(f'Categoria {category_name} no encontrada')

    return redirect(url_for('inventory.inventory', form=form))

@inventory_blueprint.route('/show_products/<int:id_category>', methods=['GET', 'POST'])
def show_products(id_category):
    form = SubCategoryForm()
    selected_category = Categories.query.get_or_404(id_category)
    sub_categories = SubCategories.query.filter_by(id_category=selected_category.id_category).all()

    if selected_category:
        return render_template('categories.html', category=selected_category,
                               id_category=selected_category.id_category ,form=form,sub_categories=sub_categories)
