import os
import random

from flask import Flask, jsonify, render_template, request, send_from_directory

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/favicon.ico')
def favicon():
    return send_from_directory(
        os.path.join(app.root_path, 'static/image'), 'favicon.png')


@app.route('/get_next_direction_with_no_across', methods=['POST'])
def get_next_direction_with_no_across():
    request_dict = request.form.to_dict()
    first = int(request_dict['first'])

    if first == 1:
        direction = random.randint(0, 2)
        first = 2 if direction == 0 else 21

    elif 1 < first < 20:
        direction = random.randint(0, 3)
        if direction == 0:
            first -= 1
        elif direction == 1:
            first += 1
        else:
            first += 20

    elif first % 20 == 0:
        if first == 20:
            direction = random.randint(0, 2)
            first = 19 if direction == 0 else 40
        elif first == 400:
            direction = random.randint(0, 2)
            first = 399 if direction == 0 else 380
        else:
            direction = random.randint(0, 3)
            if direction == 0:
                first -= 1
            elif direction == 1:
                first -= 20
            else:
                first += 20

    elif first % 20 == 1:
        if first == 381:
            direction = random.randint(0, 2)
            first = 361 if direction == 0 else 382
        else:
            direction = random.randint(0, 3)
            if direction == 0:
                first -= 20
            elif direction == 1:
                first += 1
            else:
                first += 20

    elif 381 < first < 400:
        direction = random.randint(0, 3)
        if direction == 0:
            first -= 1
        elif direction == 1:
            first -= 20
        else:
            first += 1

    else:
        direction = random.randint(0, 4)
        if direction == 0:
            first -= 1
        elif direction == 1:
            first -= 20
        elif direction == 2:
            first += 1
        else:
            first += 20

    return jsonify({'first': first})


@app.route('/get_next_direction', methods=['POST'])
def get_next_direction():
    request_dict = request.form.to_dict()
    first = int(request_dict['first'])
    direction = random.randint(0, 4)

    if 1 <= first < 20:
        if direction == 0:
            first = 20 if first == 1 else first - 1
        elif direction == 1:
            first += 380
        elif direction == 2:
            first += 1
        else:
            first += 20

    elif first % 20 == 0:
        if direction == 0:
            first -= 1
        elif direction == 1:
            first = 400 if first == 20 else first - 20
        elif direction == 2:
            first -= 19
        else:
            first += 20

    elif first % 20 == 1:
        if direction == 0:
            first += 19
        elif direction == 1:
            first -= 20
        elif direction == 2:
            first += 1
        else:
            first = 1 if first == 381 else first + 20

    elif 381 < first < 400:
        if direction == 0:
            first -= 1
        elif direction == 1:
            first -= 20
        elif direction == 2:
            first += 1
        else:
            first -= 380

    else:
        if direction == 0:
            first -= 1
        elif direction == 1:
            first -= 20
        elif direction == 2:
            first += 1
        else:
            first += 20

    return jsonify({'first': first})


if __name__ == '__main__':
    app.run(debug=True)
