from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, SelectField
from wtforms.validators import DataRequired, Length, Email, EqualTo, ValidationError



class LoginForm(FlaskForm):

    username = StringField('Nombre de usuario')
    password = PasswordField('Contraseña')
    submit = SubmitField('Ingresar')