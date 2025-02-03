from flask import render_template

from flaskr.sales import sales_blueprint


@sales_blueprint.route('/sales', methods=['GET', 'POST'])
def sales():

    return render_template('ventas.html')