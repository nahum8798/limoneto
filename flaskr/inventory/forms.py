from flask_wtf import FlaskForm
from wtforms import (StringField, PasswordField, SubmitField, TextAreaField, FieldList, FormField, HiddenField,
                     FloatField, IntegerField)

"""
Forms for managing categories, products, and stock in the inventory system.
"""


class SubCategoryForm(FlaskForm):
    """
    Form for adding or editing a subcategory.

    Fields:
        subcategory_name (StringField): Name of the subcategory.
        id_category (HiddenField): ID of the associated category.
        category_description (TextAreaField): Description of the category.
    """
    subcategory_name = StringField('Subcategory Name')
    id_category = HiddenField('Category ID')
    category_description = TextAreaField('Description')


class CategoryForm(FlaskForm):
    """
    Form for adding or editing a category.

    Fields:
        category_name (StringField): Name of the category.
        category_description (TextAreaField): Description of the category.
    """
    category_name = StringField('Category Name')
    category_description = TextAreaField('Description')


class DeleteCategoryForm(FlaskForm):
    """
    Form for deleting a category.

    Fields:
        category_name (StringField): Name of the category to delete.
    """
    category_name = StringField('Category Name')
    # submit = SubmitField('Delete')


class AddProductForm(FlaskForm):
    """
    Form for adding a new product.

    Fields:
        product_name (StringField): Name of the product.
        product_price (FloatField): Price of the product.
    """
    product_name = StringField('Product Name')
    product_price = FloatField('Product Price')


class AddProductStock(FlaskForm):
    """
    Form for adding stock information for a product.

    Fields:
        cantidad (IntegerField): Quantity of the product in stock.
        stock_min (IntegerField): Minimum stock threshold.
        stock_max (IntegerField): Maximum stock threshold.
    """
    cantidad = IntegerField('Quantity')
    stock_min = IntegerField('Minimum Stock')
    stock_max = IntegerField('Maximum Stock')


class SearchCategoryForm(FlaskForm):
    """
    Form for searching categories.

    Fields:
        search_term (StringField): Search input for category name.
        submit (SubmitField): Button to submit the search query.
    """
    search_term = StringField('Search Category')
    submit = SubmitField('Search')


class SearchProductForm(FlaskForm):
    """
    Form for searching products.

    Fields:
        search_term (StringField): Search input for product name.
        submit (SubmitField): Button to submit the search query.
    """
    search_term = StringField('Search Product')
    submit = SubmitField('Search')
