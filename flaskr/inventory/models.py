from sqlalchemy.sql import func
from flaskr.extensions import db
from flaskr.auth.models import Users


class Categories(db.Model):
    __tablename__ = 'categories'

    id_category = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    category_name = db.Column(db.String(100), nullable=False)
    category_description = db.Column(db.Text, nullable=True)
    date_create = db.Column(db.DateTime, default=func.now())
    date_update = db.Column(db.DateTime, default=func.now(), onupdate=func.now())

    products = db.relationship('Products', backref='category', cascade='all, delete-orphan')
    sub_categories = db.relationship('SubCategories', backref='category', cascade='all, delete-orphan')

    @classmethod
    def get_all_categories(cls):
        """Método para buscar todas las categorías cargadas"""
        return db.session.query(cls).all()


class SubCategories(db.Model):
    __tablename__ = 'sub_categories'

    id_subcategory = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    subcategory_name = db.Column(db.String(100), nullable=False)
    category_description = db.Column(db.Text, nullable=True)
    id_category = db.Column(db.Integer, db.ForeignKey('categories.id_category'), nullable=False)
    date_create = db.Column(db.DateTime, default=func.now())
    date_update = db.Column(db.DateTime, default=func.now(), onupdate=func.now())

    @classmethod
    def get_all_subcategories(cls):
        """Método para buscar todas las subcategorías cargadas"""
        return db.session.query(cls).all()


class Products(db.Model):

    __tablename__ = 'products'

    id_product = db.Column(db.Integer, primary_key=True, nullable=False)
    product_name = db.Column(db.String(100), nullable=False)
    product_price = db.Column(db.Float, nullable=False)
    id_category = db.Column(db.Integer, db.ForeignKey('categories.id_category'), nullable=False)
    id_subcategory = db.Column(db.Integer, db.ForeignKey('sub_categories.id_subcategory'), nullable=False)
    stock = db.relationship('Stock', backref='product', cascade='all, delete-orphan')


class Stock(db.Model):
    __tablename__ = 'stock'

    id_stock = db.Column(db.Integer, primary_key=True, nullable=False)
    id_product = db.Column(db.Integer, db.ForeignKey('products.id_product'), nullable=False)
    cantidad = db.Column(db.Integer, nullable=False)
    stock_min = db.Column(db.Integer, nullable=True)
    stock_max = db.Column(db.Integer, nullable=True)

    # Cambiar el nombre del backref para evitar conflicto
    product_stock = db.relationship('Products', backref=db.backref('stocks', uselist=True), foreign_keys=[id_product])

