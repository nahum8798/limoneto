from flask import render_template, redirect, url_for, flash, request
from flaskr.main import main_blueprint
from flask_login import login_required, current_user
from flask_login import current_user
from flaskr.extensions import db


@main_blueprint.route('/')
def index():
    """
    esta funcion renderiza la pantalla principal (inicio del menu de la app)
    :return:
    """
    return render_template('pantallaprincipal.html')


