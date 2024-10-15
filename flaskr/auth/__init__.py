"""
Propósito: inicializa el módulo de autenticación
"""
from flask import Blueprint

auth_bp = Blueprint('auth',__name__, template_folder='templates')


from . import controllers # Importa controladores para registrar las rutas