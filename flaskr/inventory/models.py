from sqlalchemy.sql.coercions import cls

from flaskr.extensions import db
from flaskr.auth.models import Users
from datetime import date, datetime

"""
Estas clases se encargan de controlar los cruds de las entidades
encargadas del stock e inventario
"""

class Categories(db.Model):

    __tablename__ = 'categories'

    id_category = db.Column(db.Integer, primary_key=True,autoincrement=True  ,nullable=False)
    category_name = db.Column(db.String(100), nullable=False)
    category_description = db.Column(db.Text, nullable=True)
    date_create = db.Column(db.DateTime, default=datetime.utcnow)
    date_update = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    @classmethod
    def get_all_categories(cls):
        """
        metodo para buscar todas las categorias cargadas
        :return:
        """
        return db.session.query(cls).all()



class SubCategories(db.Model):

    __tablename__ = 'sub_categories'

    id_subcategory = db.Column(db.Integer, primary_key=True, nullable=False)
    subcategory_name = db.Column(db.String(100), nullable=False)
    category_description = db.Column(db.Text, nullable=True)
    id_category = db.Column(db.Integer, db.ForeignKey('categories.id_category'), nullable=False)
    date_create = db.Column(db.DateTime, default=datetime.utcnow)
    date_update = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

