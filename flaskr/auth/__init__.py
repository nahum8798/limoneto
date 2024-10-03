"""
init inicializa el modulo de autenticacion
"""
from flask import Blueprint

auth_bp = Blueprint('auth',__name__,template_folder='templates')

from . import controllers