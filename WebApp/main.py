from flask import Flask, Markup, render_template
import datetime, json, requests


app = Flask(__name__)

labels = [
    '29-04-2023', '30-04-2023', '01-05-2023', '02-05-2023',
    '03-05-2023', '04-05-2023', '05-05-2023', '06-05-2023',
    '07-05-2023', '08-05-2023', '09-05-2023', '10-05-2023'
]

values = [
    97, 90, 75, 19,
    91, 28, 83, 87,
    29, 30, 97, 0.44
]

colors = [
    "#F7464A", "#46BFBD", "#FDB45C", "#FEDCBA",
    "#ABCDEF", "#DDDDDD", "#ABCABC", "#4169E1",
    "#C71585", "#FF4500", "#FEDCBA", "#46BFBD"]





@app.route('/')
def bar():
   r = requests.get('https://api.thingspeak.com/channels/2074638/feeds.json?api_key=NMTRU1B0D5AW7T58&results=2')
   rDic = r.json()
   rDicLength = len(rDic) - 1
   x = rDic['feeds'][rDicLength]['created_at']
   # created_at = datetime.strptime(x, '%Y-%m-%dT%H:%M:%SZ')
   y = rDic['feeds'][rDicLength]['field1']
   valorePapera = round((150 - ((int(y) * 1.6666666666667E-5) * 15)), 2) 
   templateData = {
       'litri' : valorePapera
   }

   bar_labels=labels
   bar_values=values
   return render_template('index.html', max=200, labels=bar_labels, values=bar_values, **templateData)


if __name__ == '__main__':
    app.run(debug =True, host='0.0.0.0', port=80)



