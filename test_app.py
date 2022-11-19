from unittest import TestCase
from app import app
from flask import Flask, session
from boggle import Boggle


class FlaskTests(TestCase):

    def setUp(self):
        self.client = app.test_client()
        app.config['TESTING'] = True

    def test_home_view(self):
        with app.test_client() as client:
            resp = client.get('/')
            self.assertEqual(session.get('high_score'),0)
            self.assertEqual(session.get('attempts'),0)

    def test_start_view(self):
        with app.test_client() as client:
            resp = client.get('/start-game')
            self.assertIn('board',session)

    def test_game_view(self):
        with app.test_client() as client:
            client.get('/start-game')
            resp = client.get('/game')
            self.assertIn(b'<button>Restart',resp.data)
