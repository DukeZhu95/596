from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

db = SQLAlchemy(app)

# Example route to test the database connection
@app.route('/test_db', methods=['GET'])
def test_db():
    try:
        # Get a connection from the engine
        with db.engine.connect() as connection:
            # Simple query to test the connection using SQLAlchemy's text construct
            result = connection.execute(text('SELECT 1'))
            return jsonify({'status': 'success', 'result': [row[0] for row in result]})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})

if __name__ == '__main__':
    print("Starting Flask server...")
    app.run(debug=True)