from unicodedata import category
from werkzeug.utils import redirect
from flask import url_for, request
from flaskr.extensions import db
from flaskr.inventory import inventory_blueprint
from flask import render_template, flash
from flaskr.inventory.forms import (CategoryForm, SubCategoryForm, DeleteCategoryForm, AddProductForm, AddProductStock,
                                    SearchCategoryForm, SearchProductForm)
from .models import Categories, SubCategories, Products, Stock
from flask_login import current_user


@inventory_blueprint.route('/inventory', methods=['GET', 'POST'])
def inventory():
    """
    Inventory management view. Handles category search and displays inventory statistics.

    Returns:
        Renders the inventory template with categories, stock count, and missing product information.
    """
    form = CategoryForm()
    search_form = SearchCategoryForm()
    total_stock_count = Stock.count_products_in_stock()
    total_missing_products = Stock.count_missing_products()
    missing_product_names = Stock.get_missing_products()


    if search_form.validate_on_submit():
        search_term = search_form.search_term.data
        categories = Categories.query.filter(Categories.category_name.ilike(f'%{search_term}%')).all()
        if not categories:
            flash('No se encontraron categorías que coincidan con su búsqueda.', 'info')
    else:
        categories = Categories.get_all_categories()  # Carga todas las categorías si no hay búsqueda

    return render_template('inventory.html',
                           form=form,
                           search_form=search_form,
                           categories=categories,
                           total_stock_count=total_stock_count,
                           total_missing_products=total_missing_products,
                           missing_product_names=missing_product_names)



@inventory_blueprint.route('/add_category', methods=['GET', 'POST'])
def add_category():
    """
    Adds a new product category.

    Returns:
        Redirects to the inventory page after adding the category.
    """
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
    """
    Adds a new subcategory under a specific category.

    Args:
        id_category (int): The ID of the category to associate with the subcategory.

    Returns:
        Redirects to the category's product view after adding the subcategory.
    """
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
    """
    Deletes a category along with its related products, stock, and subcategories.

    Returns:
        Redirects to the inventory page after deletion.
    """
    form = DeleteCategoryForm()
    if form.validate_on_submit():
        category_name = form.category_name.data
        category_to_delete = Categories.query.filter_by(category_name=category_name).first()

        if category_to_delete:
            # Eliminar stocks asociados a productos de la categoría
            products = Products.query.filter_by(id_category=category_to_delete.id_category).all()
            for product in products:
                # Suponiendo que hay una relación con Stock
                stock_items = Stock.query.filter_by(id_product=product.id_product).all()
                for stock_item in stock_items:
                    db.session.delete(stock_item)

                # Luego eliminar el producto
                db.session.delete(product)

            # Eliminar subcategorías de la categoría
            sub_categories = SubCategories.query.filter_by(id_category=category_to_delete.id_category).all()
            for sub_category in sub_categories:
                db.session.delete(sub_category)

            # Finalmente eliminar la categoría
            db.session.delete(category_to_delete)
            db.session.commit()
            flash(
                f'Categoría "{category_name}" eliminada correctamente, junto con sus productos, stocks y subcategorías.')
            return redirect(url_for('inventory.inventory'))
        else:
            flash(f'Categoría "{category_name}" no encontrada.')

    return redirect(url_for('inventory.inventory', form=form))


@inventory_blueprint.route('/show_products/<int:id_category>', methods=['GET', 'POST'])
def show_products(id_category):
    """
    Displays products and subcategories under a specific category.

    Args:
        id_category (int): The category ID whose products are to be shown.

    Returns:
        Renders the category template displaying products and stock data.
    """
    form = SubCategoryForm()
    product_form = AddProductForm()
    stock_form = AddProductStock()
    search_form = SearchProductForm()
    selected_category = Categories.query.get_or_404(id_category)
    sub_categories = SubCategories.query.filter_by(id_category=selected_category.id_category).all()
    if search_form.validate_on_submit():
        search_term = search_form.search_term.data
        products = Products.query.filter(Products.product_name.ilike(f'%{search_term}%')).all()
        if not products:
            flash('No se encontraron productos que coincidan con su búsqueda.', 'info')
    else:
        products = Products.query.filter(Products.id_category == id_category).all()  # Carga todas los productos si no hay búsqueda

    stock_data = {product.id_product: Stock.query.filter_by(id_product=product.id_product).first() for product in
                  products}


    if selected_category:
        return render_template('categories.html',
                               category=selected_category,
                               id_category=selected_category.id_category ,
                               form=form,
                               sub_categories=sub_categories,
                               product_form=product_form,
                               stock_form=stock_form,
                               products=products,
                               stock_data=stock_data,
                               search_form=search_form)


@inventory_blueprint.route('/add_product/<int:id_category>', methods=['GET', 'POST'])
def add_product(id_category):
    """
    Adds a new product under a specific category and subcategory.

    Args:
        id_category (int): The ID of the category to associate with the category.

    Returns:
        Redirects to the product's view after adding the new product.
    """
    product_form = AddProductForm()
    stock_form = AddProductStock()

    if request.method == 'POST':
        id_subcategory = request.form.get('id_subcategory')

        # Validar ambos formularios
        if product_form.validate_on_submit() and stock_form.validate_on_submit():
            new_product = Products(
                product_name=product_form.product_name.data,
                product_price=product_form.product_price.data,
                id_category=id_category,
                id_subcategory=id_subcategory
            )
            db.session.add(new_product)
            db.session.flush()

            new_stock = Stock(
                id_product=new_product.id_product,
                cantidad=stock_form.cantidad.data,
                stock_min=stock_form.stock_min.data,
                stock_max=stock_form.stock_max.data
            )
            db.session.add(new_stock)

            try:
                db.session.commit()
                flash("Producto agregado exitosamente", "success")
                return redirect(url_for('inventory.show_products', id_category=id_category))
            except Exception as e:
                db.session.rollback()
                flash(f"Error al agregar producto y stock: {e}", "danger")
        else:
            flash("Error en la validación de los formularios.", "warning")

    # Renderizar el formulario si es GET o si hubo errores
    return render_template(
        'categories.html',
        product_form=product_form,
        stock_form=stock_form,
        id_category=id_category
    )


@inventory_blueprint.route('/edit_product', methods=['GET', 'POST'])
def edit_product():
    """
    Edits an existing product.

    Returns:
        Redirects to the product's view after editing the product.
    """
    if request.method == 'POST':
        id_product = request.form.get('id_product')
        # Obtener el producto y stock actual de la base de datos
        product = Products.query.get_or_404(id_product)
        stock = Stock.query.filter_by(id_product=id_product).first()

        # Inicializar los formularios con los datos actuales
        product_form = AddProductForm(obj=product)
        stock_form = AddProductStock(obj=stock)

        # Validar y actualizar los formularios si son válidos
        if product_form.validate_on_submit() and stock_form.validate_on_submit():
            # Actualizar campos del producto
            product.product_name = product_form.product_name.data
            product.product_price = product_form.product_price.data

            # Actualizar campos del stock
            stock.cantidad = stock_form.cantidad.data
            stock.stock_min = stock_form.stock_min.data
            stock.stock_max = stock_form.stock_max.data

            try:
                # Guardar cambios en la base de datos
                db.session.commit()
                flash("Producto actualizado exitosamente", "success")
                return redirect(url_for('inventory.show_products', id_category=product.id_category))
            except Exception as e:
                db.session.rollback()
                flash(f"Error al actualizar el producto: {e}", "danger")

    # Si es un GET, inicializar los formularios sin datos
    product_form = AddProductForm()
    stock_form = AddProductStock()
    return render_template(
        'categories.html',
        product_form=product_form,
        stock_form=stock_form
    )

@inventory_blueprint.route('/delete_product', methods=['GET', 'POST'])
def delete_product():
    """
    Deletes a product along with its related stock.

    Returns:
        Redirects to the product's view after editing the product.
    """
    if request.method == 'POST':
        id_product = request.form.get('id_product')

        # Obtener el producto de la base de datos
        product = Products.query.get_or_404(id_product)

        # Obtener el stock relacionado
        stock = Stock.query.filter_by(id_product=id_product).first()

        try:
            # Si hay stock, eliminarlo primero
            if stock:
                db.session.delete(stock)

            # Eliminar producto
            db.session.delete(product)

            # Guardar cambios en la db
            db.session.commit()
            flash("Producto eliminado exitosamente", "success")
            return redirect(url_for('inventory.show_products', id_category=product.id_category))
        except Exception as e:
            db.session.rollback()
            flash(f"Error al eliminar el producto: {e}", "danger")

    # Si es un GET, puedes redirigir a otra página o mostrar un mensaje
    return redirect(url_for('inventory.show_products'))