# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import pywhatkit as pwk
import datetime

app = Flask(__name__)
CORS(app)

@app.route('/schedule', methods=['POST'])
def schedule_message():
    data = request.get_json()

    numbers = data.get('numbers', [])
    message = data.get('message', '').strip()
    hour = data.get('hour')
    minute = data.get('minute')

    if not numbers or not all(num.isdigit() and len(num) == 10 for num in numbers):
        return jsonify({'message': 'Invalid phone number(s).'}), 400

    if not message:
        return jsonify({'message': 'Message cannot be empty.'}), 400

    if not (isinstance(hour, int) and isinstance(minute, int) and 0 <= hour <= 23 and 0 <= minute <= 59):
        return jsonify({'message': 'Invalid time input.'}), 400

    now = datetime.datetime.now()
    scheduled_time = now.replace(hour=hour, minute=minute, second=0, microsecond=0)
    if scheduled_time <= now:
        scheduled_time += datetime.timedelta(days=1)

    try:
        for num in numbers:
            full_number = f"+91{num}"
            pwk.sendwhatmsg(
                phone_no=full_number,
                message=message,
                time_hour=scheduled_time.hour,
                time_min=scheduled_time.minute,
                wait_time=20,
                tab_close=True
            )
            scheduled_time += datetime.timedelta(minutes=2)
        return jsonify({'message': 'Messages scheduled successfully.'}), 200
    except Exception as e:
        return jsonify({'message': f'Error: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)
