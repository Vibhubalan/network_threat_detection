from flask import Flask, jsonify
from flask_mail import Mail, Message
from datetime import datetime

app = Flask(__name__)

# Configure the Flask-Mail extension
app.config['MAIL_SERVER'] = 'smtp.gmail.com'  # Change this to your SMTP server
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = 'mvibhubalan@gmail.com'  # Your email address
app.config['MAIL_PASSWORD'] = 'ukxn plpo mhlt tiea'  # Your email password
app.config['MAIL_DEFAULT_SENDER'] = 'mvibhubalan@gmail.com'  # Sender email

mail = Mail(app)

# Function to send an email
def send_email(subject, body, recipient):
    msg = Message(subject, recipients=[recipient])
    msg.body = body
    try:
        mail.send(msg)
        print(f"Email sent to {recipient}")
    except Exception as e:
        print(f"Error sending email: {e}")

# Flask route to send warning or critical emails
@app.route('/send_email/<int:count>', methods=['POST'])
def send_attack_email(count):
    # Get the current time and date of the attack
    attack_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    # Define the email body content based on the attack count
    if count >= 7 and count < 10:
        subject = "Warning: High Attack Count Detected"
        body = (
            f"Dear M Vibhubalan,\n\n"
            f"This is to Warn you that a high number of network attacks have been detected.\n\n"
            f"Details:\n"
            f"- Attack Count: {count}\n"
            f"- Time of Attack: {attack_time}\n\n"
            f"At this stage, the attack count has exceeded 7, which could indicate potential threats to the system. "
            f"Please monitor the situation closely and take appropriate action if necessary.\n\n"
            f"Kind regards,\n"
            f"Your Security Monitoring Team"
        )
        send_email(
            subject=subject,
            body=body,
            recipient="vibhubalan123@gmail.com"  # Replace with actual recipient
        )
        return jsonify({"message": "Warning email sent."}), 200

    elif count >= 10:
        subject = "Very Critical: Attack Count Exceeded 10"
        body = (
            f"Dear M Vibhubalan,\n\n"
            f"URGENT: A critical number of network attacks have been detected.\n\n"
            f"Details:\n"
            f"- Attack Count: {count}\n"
            f"- Time of Attack: {attack_time}\n\n"
            f"The attack count has exceeded the critical threshold of 10, indicating a severe security risk. "
            f"This situation requires immediate attention and action to prevent any potential breach or damage to the system.\n\n"
            f"Please treat this as a top priority.\n\n"
            f"Kind regards,\n"
            f"Your Security Monitoring Team"
        )
        send_email(
            subject=subject,
            body=body,
            recipient="vibhubalan123@gmail.com"  # Replace with actual recipient
        )
        return jsonify({"message": "Very critical email sent."}), 200

    return jsonify({"message": "No email sent."}), 200

if __name__ == '__main__':
    app.run(debug=True)
