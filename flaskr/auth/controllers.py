"""
controllers contiene las funciones que manejan las solicitudes HTTP relacionadas con la autenticacion
"""
from crypt import methods

from flask import render_template, redirect, url_for, flash
from flask_login import login_user, logout_user, current_user, login_required
from werkzeug.security import generate_password_hash, check_password_hash
from .forms import LoginForm
from flaskr.extensions import db
from . import auth_bp
from .models import Users


@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()  # Instancia del formulario de login
    if form.validate_on_submit():   # Si el formulario ha sido enviado, ejecutamos la logica de login
        user = Users.query.filter_by(username=form.username.data).first()
        if user and user.check_password(form.password.data):
            login_user(user)        # el usuario se logea
            return redirect(url_for('main_index'))
        else:
            flash('No se pudo iniciar sesión')

    return render_template('login.html', form=form)
