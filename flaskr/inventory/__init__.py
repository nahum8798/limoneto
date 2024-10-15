from flask import Blueprint

inventory_blueprint = Blueprint('inventory',__name__)

from flaskr.inventory import controllers