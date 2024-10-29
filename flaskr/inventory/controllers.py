from unicodedata import category
from werkzeug.utils import redirect
from flask import url_for, request
from flaskr.extensions import db
from flaskr.inventory import inventory_blueprint
from flask import render_template, flash
from flaskr.inventory.forms import CategoryForm, SubCategoryForm, DeleteCategoryForm, AddProductForm, AddProductStock
from .models import Categories, SubCategories, Products, Stock


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
    product_form = AddProductForm()
    stock_form = AddProductStock()
    selected_category = Categories.query.get_or_404(id_category)
    sub_categories = SubCategories.query.filter_by(id_category=selected_category.id_category).all()
    products = Products.query.filter(Products.id_category == id_category).all()
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
                               stock_data=stock_data)


@inventory_blueprint.route('/add_product/<int:id_category>', methods=['GET', 'POST'])
def add_product(id_category):
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