
#include <WiFiNINA.h>
#include "ThingSpeak.h"  // always include thingspeak header file after other header files and custom macros

char ssid[] = "";  //  your network SSID (name)
char pass[] = "";  // your network password
int keyIndex = 0;           // your network key Index number (needed only for WEP)
WiFiClient client;

unsigned long myChannelNumber = 2074638;
const char* myWriteAPIKey = "C6S6GJ8Q0BMBUM3B";
/*my variables*/


int adc_id = A0;
int HistoryValue = 0;

int sendVal;

unsigned long ta;
unsigned long tb;
unsigned long deltat;

bool statopa = false;
bool statopb = true;
int flag;


int send;

void setup() {
  Serial.begin(9600);
  Serial.begin(115200);  // Initialize serial


  // check for the WiFi module:
  if (WiFi.status() == WL_NO_MODULE) {
    Serial.println("Communication with WiFi module failed!");
    // don't continue
    while (true)
      ;
  }

  String fv = WiFi.firmwareVersion();
  if (fv != "1.0.0") {
    Serial.println("Please upgrade the firmware");
  }

  ThingSpeak.begin(client);  //Initialize ThingSpeak
}

void loop() {

  // Connect or reconnect to WiFi
  if (WiFi.status() != WL_CONNECTED) {
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(ssid);
    while (WiFi.status() != WL_CONNECTED) {
      WiFi.begin(ssid, pass);  // Connect to WPA/WPA2 network. Change this line if using open or WEP network
      Serial.print(".");
      delay(5000);
    }
    Serial.println("\nConnected.");
  }

  int value = analogRead(adc_id);  // get adc value

  if (((HistoryValue >= value) && ((HistoryValue - value) > 10)) || ((HistoryValue < value) && ((value - HistoryValue) > 10))) {
    HistoryValue = value;
          Serial.println(value);

  }

  if ((value > 200) && (flag == 0)) {
    ta = millis();
    flag = 1;
  }
  if ((value < 200) && (flag == 1)) {
    tb = millis();
    flag = 0;
    deltat = tb - ta;
    if (deltat > 5000) {
      unsigned long result = deltat;
      Serial.print("Tempo: ");
      Serial.println(result);
      sendVal = (int)result;

      comunica(sendVal);
    }
  }
}


// Write to ThingSpeak. There are up to 8 fields in a channel, allowing you to store up to 8 different
// pieces of information in a channel.  Here, we write to field 1.
void comunica(int number) {
  unsigned long x = ThingSpeak.writeField(myChannelNumber, 1, number, myWriteAPIKey);
  if (x == 200) {
    Serial.println("Channel update successful.");
  } else {
    Serial.println("Problem updating channel. HTTP error code " + String(x));
  }

  // change the value
  number++;
  if (number > 99) {
    number = 0;
  }

  delay(20000);  // Wait 20 seconds to update the channel again
}