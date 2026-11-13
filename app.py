from flask import Flask, render_template, request, jsonify
import sqlite3

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/menu")
def menu():

    connection = sqlite3.connect("database/food.db")

    connection.row_factory = sqlite3.Row

    cursor = connection.cursor()

    cursor.execute("SELECT * FROM foods")

    foods = cursor.fetchall()

    connection.close()

    return render_template("menu.html", foods=foods)
@app.route("/cart")
def cart():
    return render_template("cart.html")
@app.route("/checkout")
def checkout():
    return render_template("checkout.html")
@app.route("/place-order", methods=["POST"])
def place_order():

    data = request.json

    name = data["name"]
    mobile = data["mobile"]
    address = data["address"]
    total = data["total"]


    connection = sqlite3.connect("database/food.db")

    cursor = connection.cursor()


    cursor.execute("""
        INSERT INTO orders
        (customer_name, mobile, address, total)
        VALUES (?, ?, ?, ?)
    """, (name, mobile, address, total))


    connection.commit()

    connection.close()


    return jsonify({
        "message": "Order placed successfully!"
    })

if __name__ == "__main__":
    app.run(debug=True)