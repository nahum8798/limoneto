from flask_wtf import FlaskForm
from wtforms import (StringField, PasswordField, SubmitField, TextAreaField, FieldList, FormField, HiddenField,
                     FloatField, IntegerField)

"""
Formulario para gestionar la carga de categorias
"""
class SubCategoryForm(FlaskForm):

    subcategory_name = StringField('Nombre')
    id_category = HiddenField('ID Categoria')
    category_description = TextAreaField('Descripción')

class CategoryForm(FlaskForm):

    category_name = StringField('Nombre')
    category_description = TextAreaField('Descripción')


class DeleteCategoryForm(FlaskForm):
    category_name = StringField('Nombre de la categoria')
    #submit = SubmitField('Eiminar')


class AddProductForm(FlaskForm):
    product_name = StringField('Nombre del producto')
    product_price = FloatField('Precio del producto')


class AddProductStock(FlaskForm):
    cantidad = IntegerField('Cantidad')
    stock_min = IntegerField('Cantidad minima')
    stock_max = IntegerField('Cantidad maxima')

class SearchCategoryForm(FlaskForm):
    search_term = StringField('Buscar Categoría')
    submit = SubmitField('Buscar')

class SearchProductForm(FlaskForm):
    search_term = StringField('Buscar Producto')
    submit = SubmitField('Buscar')