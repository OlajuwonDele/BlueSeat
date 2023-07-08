#include <Arduino.h>
#include <Firebase.h>
#include <ESP8266WiFi.h>
#include <FirebaseArduino.h>


//Firebase settings
#define FIREBASE_HOST "bluetest-ca08a-default-rtdb.europe-west1.firebasedatabase.app"
#define FIREBASE_AUTH "euzxkIJX7yJurrYHC4lOfzYdhygbsqe7i9TE3npm"
//Wi-Fi settings
#define WIFI_SSID "VM6270265"
#define WIFI_PASSWORD "vkqv4SmDnnvz"

char c;
float counterLDR = 0;
float counterBT = 0;
float counterTot = 0;

void setup()
{
    // Connect to Wi-Fi
    Serial.begin(9600);
    Serial.print("Wi-Fi...");
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    Serial.print("Connecting...");
    while (WiFi.status() != WL_CONNECTED)
    {
        Serial.print(".");
        delay(500);
    }
    Serial.println();
    Serial.print("Connected to: ");
    Serial.println(WiFi.localIP());

    Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
}

void loop()
{
   
   bool numReadyL = false;
   bool numReadyB = false;
   bool numReadyT = false;
   

   
   while (Serial.available()){
     c = Serial.read();
     if (c == 'l'){ 
      counterLDR = Serial.read(); //reads LDR count value from Arduino
      numReadyL = true;
     }

     if (c == 'b'){
      counterBT = Serial.read(); //reads Bluetooth count value from Arduino
      numReadyB = true;
     }

     if (c == 't'){
      counterTot = Serial.read(); //reads total count value from Arduino
      numReadyT = true;
     }
  }


  if(numReadyL && counterLDR != -1){
    Firebase.setFloat("counterLDR/ldr", counterLDR); //sends LDR count value to Firebase Database
    if (Firebase.failed()) {
      Serial.print("setting /number failed:");
      Serial.println(Firebase.error());  
      return;
    }
  }
  if(numReadyB && counterBT != -1){
    Firebase.setFloat("counterBT/bluetooth", counterBT); //sends Bluetooth count value to Firebase Database
    if (Firebase.failed()) {
      Serial.print("setting /number failed:");
      Serial.println(Firebase.error());  
      return;
    }
  }
  if(numReadyT && counterTot != -1){
    Firebase.setFloat("counter/counterTot", counterTot);//sends Total count value to Firebase Database
    if (Firebase.failed()) {
      Serial.print("setting /number failed:");
      Serial.println(Firebase.error());  
      return;
    }
  }

    
  delay(2000);
}

