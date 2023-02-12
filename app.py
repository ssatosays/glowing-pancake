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


@app.route('/get_next_positions_with_no_across', methods=['POST'])
def get_next_positions_with_no_across():

    def _inner(first):
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

        return first

    request_dict = request.form.to_dict()
    first = _inner(int(request_dict['first']))

    return jsonify({'first': first})


@app.route('/get_next_positions', methods=['POST'])
def get_next_positions():

    def _inner(position):
        direction = random.randint(0, 4)
        if 1 <= position < 20:
            if direction == 0:
                position = 20 if position == 1 else position - 1
            elif direction == 1:
                position += 380
            elif direction == 2:
                position += 1
            else:
                position += 20

        elif position % 20 == 0:
            if direction == 0:
                position -= 1
            elif direction == 1:
                position = 400 if position == 20 else position - 20
            elif direction == 2:
                position -= 19
            else:
                position = 20 if position == 400 else position + 20

        elif position % 20 == 1:
            if direction == 0:
                position += 19
            elif direction == 1:
                position -= 20
            elif direction == 2:
                position += 1
            else:
                position = 1 if position == 381 else position + 20

        elif 381 < position < 400:
            if direction == 0:
                position -= 1
            elif direction == 1:
                position -= 20
            elif direction == 2:
                position += 1
            else:
                position -= 380

        else:
            if direction == 0:
                position -= 1
            elif direction == 1:
                position -= 20
            elif direction == 2:
                position += 1
            else:
                position += 20

        return position

    positions = []
    infected = []
    request_dict = request.form.to_dict()
    src_positions = [int(e) for e in request_dict['positions'].split(',')]
    src_infected = [int(e) for e in request_dict['infected'].split(',')]
    for position in src_positions:
        next_position = str(_inner(position))
        positions.append(next_position)
        if position in src_infected:
            infected.append(next_position)

    return jsonify({'positions': ','.join(positions), 'infected': ','.join(infected)})


if __name__ == '__main__':
    app.run(debug=True)
