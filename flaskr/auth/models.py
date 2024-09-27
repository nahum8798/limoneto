"""
Modelos (tablas de la bd) para la autenticacion de usuarios
"""
import flaskr
from flaskr.extensions import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
from itsdangerous import TimedSerializer as Serializer
from flask import url_for

class Users(UserMixin, db.Model):
 """
 Representa a un usuario del sistema
 """

 __tablename__ = 'users'

 id_user = db.Column(db.Integer, primary_key = True, nullable=False)
 username = db.Column(db.String(50), nullable=False)
 email = db.Column(db.String(50), nullable=False)
 password = db.Column(db.String(255), nullable=False)
 first_name = db.Column(db.String(25), nullable=False)
 last_name = db.Column(db.String(25), nullable=False)

 def get_id(self):
  return str(self.id_user)

 def set_password(self, password):
  """
  Setea la contraseña hasheandola para mayor seguridad
  """
  self.password = generate_password_hash(password)

 def check_password(self, password):
  """
  Checkea si la contraseña ingresada coincide con la almacenada
  en la db
  """
  return check_password_hash(self.password, password)


 def __repr__(self):
  return f'<User {self.username}'


