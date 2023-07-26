from flask import Flask, render_template, redirect, request, url_for
from flask import session
import pyrebase

app = Flask(__name__, template_folder="templates", static_folder="static")
app.config["SECRET_KEY"] = "secret~"

firebaseConfig = {
  "apiKey": "AIzaSyCmYa144aGmN15i8hedo8COdUAZ4eNzSDU",
  "authDomain": "help-79d22.firebaseapp.com",
  "projectId": "help-79d22",
  "storageBucket": "help-79d22.appspot.com",
  "messagingSenderId": "498933642511",
  "appId": "1:498933642511:web:a84b038b38881ff4baba7a",
  "measurementId": "G-BS46RTJC46",
  "databaseURL": "https://help-79d22-default-rtdb.europe-west1.firebasedatabase.app/"
}

fb = pyrebase.initialize_app(firebaseConfig)
auth = fb.auth()
db = fb.database()

@app.route('/', methods=['GET','POST'])
def home():
    if request.method == 'POST':
        try:
            functions = request.form["functions"]
            scale = request.form["scale"]
            db.child("States").child(session["user"]["localId"]).set({"scale": scale, "functions": functions})
        except:
            pass
    try:
        session["user"]
    except:
        return redirect(url_for('signup'))
    functions = ""
    scale = ""
    try:
        scale = db.child("States").child(session["user"]["localId"]).get().val()["scale"]
        functions = db.child("States").child(session["user"]["localId"]).get().val()["functions"]
    except:
        functions = """; these are line comments
; functions are to be formatted:
; f(x)[r,g,b][thickness][latex (yes/no)]
sin(x)[0,0,0][2][yes]"""
        scale = ""
    return render_template('home.html', functions=functions, scale=scale)

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        try:
            email = request.form["email"]
            password = request.form["password"]
            session['user'] = auth.create_user_with_email_and_password(email, password)
            return redirect(url_for('home'))
        except:
            pass
    return render_template('signup.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        try:
            email = request.form["email"]
            password = request.form["password"]
            session['user'] = auth.sign_in_with_email_and_password(email, password)
            return redirect(url_for('home'))
        except:
            pass
    return render_template('login.html')

if __name__ == "__main__":
    app.run(debug=True)