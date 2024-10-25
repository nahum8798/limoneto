from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, TextAreaField, FieldList, FormField, HiddenField

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