from flask import render_template, redirect, url_for, flash, request
from flaskr.main import main_blueprint
from flask_login import login_required, current_user
from flask_login import current_user
from flaskr.extensions import db

def index():

    return render_template('pantallaprincipal.html')