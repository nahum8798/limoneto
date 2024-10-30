"""
Proposito: Contiene las funciones que manejan las solicitudes HTTP
relacionadas con:
                - autenticacion
                - registro
                - inicio de sesion
                - cierre de sesion
"""
from flask import render_template, redirect, url_for, flash, session, request
from flask_login import login_user, logout_user, current_user, login_required
from werkzeug.security import generate_password_hash, check_password_hash
from .forms import LoginForm
from flaskr.extensions import db
from . import auth_bp
from .models import Users

@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm() # Instancia del formulario de login
    if request.method == 'POST':
        if form.validate_on_submit():   # Si el formulario ha sido enviado, comenzamos con la logica de login
            user = Users.query.filter_by(username=form.username.data).first()
            if user.password and form.password.data:
                login_user(user)
                flash('Inicio de sesión exitoso.')
                return redirect(url_for('main.index'))
            else:
                flash('No se pudo iniciar sesion. Revisa tu usuario y/o contraseña') # si las credenciales no son validas largamos error

    return render_template('login.html', form=form)     # si el formulario no ha sido enviado el usuario es redirigido al login





@auth_bp.route('/logout')
@login_required
def logout():
    logout_user()
    flash('Haz salido de tu cuentas')
    return redirect(url_for('auth.login'))