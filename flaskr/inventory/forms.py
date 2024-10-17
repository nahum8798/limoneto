from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, TextAreaField

"""
Formulario para gestionar la carga de categorias
"""
class CategoryForm(FlaskForm):

    category_name = StringField('Nombre')
    category_description = TextAreaField('Descripción')

class SubCategoryForm(FlaskForm):

    subcategory_name = StringField('Nombre')
    category_description = TextAreaField('Descripción')