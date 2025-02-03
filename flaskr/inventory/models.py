from sqlalchemy.sql import func
from flaskr.extensions import db
from flaskr.auth.models import Users


class Categories(db.Model):
    __tablename__ = 'categories'

    # Column definitions for the 'categories' table
    id_category = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    category_name = db.Column(db.String(100), nullable=False)
    category_description = db.Column(db.Text, nullable=True)
    date_create = db.Column(db.DateTime, default=func.now())  # Default to current timestamp when creating
    date_update = db.Column(db.DateTime, default=func.now(), onupdate=func.now())  # Updates automatically on modification

    # Relationships with 'Products' and 'SubCategories' tables
    products = db.relationship('Products', backref='category', cascade='all, delete-orphan')
    sub_categories = db.relationship('SubCategories', backref='category', cascade='all, delete-orphan')

    @classmethod
    def get_all_categories(cls):
        """
        Method to retrieve all categories.

        Returns:
            list: A list of all category objects from the database.
        """
        return db.session.query(cls).all()


class SubCategories(db.Model):
    __tablename__ = 'sub_categories'

    # Column definitions for the 'sub_categories' table
    id_subcategory = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    subcategory_name = db.Column(db.String(100), nullable=False)
    category_description = db.Column(db.Text, nullable=True)
    id_category = db.Column(db.Integer, db.ForeignKey('categories.id_category'), nullable=False)  # Foreign key to categories
    date_create = db.Column(db.DateTime, default=func.now())  # Default to current timestamp when creating
    date_update = db.Column(db.DateTime, default=func.now(), onupdate=func.now())  # Updates automatically on modification

    @classmethod
    def get_all_subcategories(cls):
        """
        Method to retrieve all subcategories.

        Returns:
            list: A list of all subcategory objects from the database.
        """
        return db.session.query(cls).all()


class Products(db.Model):
    __tablename__ = 'products'

    # Column definitions for the 'products' table
    id_product = db.Column(db.Integer, primary_key=True, nullable=False)
    product_name = db.Column(db.String(100), nullable=False)
    product_price = db.Column(db.Float, nullable=False)
    id_category = db.Column(db.Integer, db.ForeignKey('categories.id_category'), nullable=False)  # Foreign key to categories
    id_subcategory = db.Column(db.Integer, db.ForeignKey('sub_categories.id_subcategory'), nullable=False)  # Foreign key to sub_categories
    stock = db.relationship('Stock', backref='product', cascade='all, delete-orphan')  # Relationship with 'Stock' table

class Stock(db.Model):
    __tablename__ = 'stock'

    # Column definitions for the 'stock' table
    id_stock = db.Column(db.Integer, primary_key=True, nullable=False)
    id_product = db.Column(db.Integer, db.ForeignKey('products.id_product'), nullable=False)  # Foreign key to products
    cantidad = db.Column(db.Integer, nullable=False)  # Quantity of the product in stock
    stock_min = db.Column(db.Integer, nullable=True)  # Minimum stock threshold
    stock_max = db.Column(db.Integer, nullable=True)  # Maximum stock threshold

    # Relationship with 'Products' table with a renamed backref to avoid conflicts
    product_stock = db.relationship('Products', backref=db.backref('stocks', uselist=True), foreign_keys=[id_product])

    @staticmethod
    def count_products_in_stock():
        """
        Method to count the total number of products in stock.

        Returns:
            int: Total quantity of products in stock.
        """
        return db.session.query(db.func.sum(Stock.cantidad)).scalar() or 0

    @staticmethod
    def count_missing_products():
        """
        Method to count the number of products with stock below the minimum threshold.

        Returns:
            int: The count of products that have less quantity than their minimum stock.
        """
        return db.session.query(
            db.func.count(Stock.id_product)
        ).filter(Stock.cantidad < Stock.stock_min).scalar()

    @staticmethod
    def get_missing_products():
        """
        Method to retrieve the names of products that have stock below the minimum threshold.

        Returns:
            list: A list of product names that are below the minimum stock level.
        """
        missing_products = db.session.query(Products.product_name). \
            join(Stock, Products.id_product == Stock.id_product). \
            filter(Stock.cantidad < Stock.stock_min). \
            all()
        # Extract product names from the query result
        return [product.product_name for product in missing_products]
