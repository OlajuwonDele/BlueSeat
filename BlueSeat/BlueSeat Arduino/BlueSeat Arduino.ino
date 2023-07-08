#include <SoftwareSerial.h>
//#include "TinyGPS++.h"

SoftwareSerial wifiSerial(2, 3); // RX, TX for WIFI Module
SoftwareSerial BTSerial(10, 11); // RX | TX for Bluetooth Module
//SoftwareSerial gpsSerial(6, 7); //RX=pin 6, TX=pin 7 for GPS Module

//TinyGPSPlus gps;//This is the GPS object that will pretty much do all the grunt work with the NMEA data
//bool nearStop;

int sensorPin1 = A1; // select the input pin for LDR
int sensorPin2 = A2; // select the input pin for LDR

int value1 = 0;// variable to store the value coming from the sensor
int value2 = 0;// variable to store the value coming from the sensor
int prevValue1, currValue1, prevValue2, currValue2; //LDR setup
int sensorCounter = 1;
bool sensorCountDone = false;

volatile int people_passed = 0;
bool right, left;

volatile int btCounter = 0;
bool btCountDone = false;
volatile int total = 0;


void setup()
{
 
  wifiSerial.begin(9600); //This opens up communications to the WIFI Module
  //gpsModule.begin(9600); //This opens up communications to the GPS
  delay(5000);

  pinMode(9, OUTPUT);  // this pin will pull the HC-05 pin 34 (key pin) HIGH to switch module to AT mode
  digitalWrite(9, HIGH);
   Serial.begin(9600);
  Serial.println("Enter AT commands:");
  BTSerial.begin(38400);  // HC-05 default speed in AT command more
  Serial.println("AT+INQ");
  BTSerial.println("AT+INQ"); // Tells Bluetooth Module to search for devices
}
 
void loop(){
//  nearStop = gpsScanner(); // Checks if Arduino is near stop eg. near Nasseu Street Bus Stop
//  if (nearStop){
      if (!btCountDone){
         bluetoothScanner();
      }
 
      if(btCountDone){
        ldrScanner();
      }
//  }
 
  wifiSend();
  delay(500);
}

void wifiSend(){

  wifiSerial.write('l');
  delay(500);
  wifiSerial.write(people_passed); //sends amount of people who pass LDR sensor to WIFI module
  delay(500);

  if(btCounter != 0){
    wifiSerial.write('b');
    delay(500);
    wifiSerial.write(btCounter/2); //sends amount of Bluetooth devices to WIFI module
    delay(500);
  }
 

  total = (people_passed + (btCounter/2))/2;
  wifiSerial.write('t');
  delay(500);
  wifiSerial.write(total); //sends average between to sensor values to WIFI module

}

bool gpsScanner(){
//  while(gpsSerial.available())//While there are characters to come from the GPS
//  {
//    //Serial.println("AVAILABLE");
//    gps.encode(gpsSerial.read());//This feeds the serial NMEA data into the library one char at a time
//  }
//  if(gps.location.isUpdated())//This will pretty much be fired all the time anyway but will at least reduce it to only after a package of NMEA data comes in
//  {
//    //Checks if the differeance between our current position is within a certain range of our desired stop  
//    //before we scan for bluetooth devices/people crossing LDR sensors, to save power & not pick up extra readings
//    //XXXX being the latitude of a bus stop, etc and YYYY being the longitude of the same stop.
//    if (abs(gps.location.lat() - XXXXXX) <= 5000 && abs(gps.location.lng() - YYYYY)<= 5000 )
//      return true;
//    
//    else{
//      btCountDone = true;
//      sensorCountDone = true;
//      return false;
//    }
//  }
}

void bluetoothScanner(){

   if ( BTSerial.available() > 0 ){
    static char input[512];
    static uint8_t i;
    char c = BTSerial.read();

    Serial.println("Scanning for Bluetooth devices...");
    if ( c == '\r' || c == '\n'){
      btCounter = btCounter + 1;  // Counts the amount of endlines/carraige lines found (tells us how many MAC addresses found
      //Serial.println(btCounter);
    }
   
//    if ( c != '\r' && c != '\n' && i < sizeof( input ) - 1 ){
//      input[i++] = c;
//     // Serial.println(input[i]); //prints mac adresss however we don't want to store the address at all
//    }
    
    else {
      input[i] = '\0';
      i = 0;
  
      if ( !strcmp( input, "OK" ) ){ //searches for OK for end of scan
        btCountDone = true;
        Serial.println(btCounter/2);
        Serial.println("Finshed searching for Bluetooth Devices");
      }
    }
  }
}

void ldrScanner(){
  
  
  right = false;
  left = false;
  
  value1 = analogRead(sensorPin1); // read the value from the LDR sensor 1
  value2 = analogRead(sensorPin2); // read the value from the LDR sensor 1
  
  prevValue1 = currValue1;
  currValue1 = value1;
  
  prevValue2 = currValue2;
  currValue2 = value2;

  while(!left & !right ) {
    leftSensor();
    
    if (!left)
      rightSensor();
      
    sensorCounter++;
    
    if(sensorCounter %2000 == 0){
      btCountDone = false;
      btCounter = 0;
      BTSerial.println("AT+INQ");  // Tells Bluetooth Module to search for devices again once done.
      return;
    }
  }

  delay(3500);
  
  if(sensorCounter %400 == 0){
    btCountDone = false;
    btCounter = 0;
    BTSerial.println("AT+INQ");  // Tells Bluetooth Module to search for devices again once done.
  }
}

void leftSensor(){
    currValue1 = analogRead(sensorPin1);
    if( abs(prevValue1 -currValue1) >= 200 ){  //if change in the sensor value is greater than 200
      left = true;
      if(sensorCounter%2 == 1){
        people_passed = people_passed + 1;
        Serial.println("Someone has entered the mode of transport!");
            delay(500);
      }
     }
}
 


void rightSensor(){
    currValue2 = analogRead(sensorPin2);
    if( abs(prevValue2 - currValue2) >= 200 ){  //if change in the sensor value is greater than 200
        right = true;
        if(sensorCounter%2 == 1){
          people_passed = people_passed - 1;
          Serial.println("Someone has left the mode of transport!");
        delay(500);
      }
    }

 }
