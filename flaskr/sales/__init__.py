from flask import Blueprint

sales_blueprint = Blueprint('sales',__name__)

from flaskr.sales import controllers