from boggle import Boggle
from flask import Flask, request, render_template, redirect, session, jsonify
from config import SECRET_KEY

app = Flask(__name__)

app.config['SECRET_KEY'] = SECRET_KEY

boggle_game = Boggle()

@app.route('/')
def home_view():
    """Home view renders static start page"""

    session['high_score'] = 0
    session['attempts'] = 0
    return render_template('home.html')

@app.route('/start-game')
def game_start():
    """Initializes game assets and redirects"""

    board = boggle_game.make_board()
    session['board'] = board
    return redirect('/game')

@app.route('/game')
def game_view():
    """Renders game"""

    return render_template('game.html')

@app.route('/guess/<g>')
def guess(g):
    """Checks validity of guess and returns JSON string value"""
    return boggle_game.check_valid_word(session['board'], g)

@app.route('/score-check/', methods=["POST"])
def score_check():
    """Handler for game end"""

    data = request.json
    score = data['score']
    session['attempts'] = session['attempts'] + 1
    if score > session['high_score']:
        session['high_score'] = score
    return jsonify(high_score = session['high_score'], attempts = session['attempts'])