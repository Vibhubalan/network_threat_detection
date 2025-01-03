# Steps to Execute the Project

## 1. Downgrade Python Version and Install Necessary Libraries



To run the project, downgrade your Python version to 3.10.11 by creating a new virtual environment (venv). After setting up the environment, install the necessary libraries.




Run the following command to install the required libraries:


```
pip install pandas flask joblib numpy flask-cors playsound flask-mail
```


## 2. Change Directory to Server



Navigate to the server directory:


```
cd server
```


## 3. Run the Flask App



Run the Flask application to initialize the models:


```
python app.py
```



## 4. Run the Alert System



Open a new terminal, navigate to the server directory, and run the alert system:


```
cd server

python alert.py
```


## 5. Start the Web App



Open another terminal, navigate to the client directory, and start the web application:


```
cd client

npm run dev

```

## 6. Test the Attack Prediction



On the web app, click on the "Attacks" section to send attacks. To check if the model is predicting the attacks, monitor the terminal running app.py.



## 7. Update Mail IDs (Optional)



If you want to change the mail IDs used for alerts, update the alert.py file. The relevant section of the code is marked with comments.



Contact



For any queries, feel free to contact me at: mvibhubalan@gmail.com
(if you need the report for this project charges may apply, please contact the above mail regarding it)
