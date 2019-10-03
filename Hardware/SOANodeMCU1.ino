#include <SPI.h>
#include <MFRC522.h>
#include <PubSubClient.h>
#include <NTPClient.h>
#include <ESP8266WiFi.h>
#include <WiFiUdp.h>
#include "HX711.h"


const int LOADCELL_DOUT_PIN = D0;
const int LOADCELL_SCK_PIN = D1;
const int SS_PIN = D4;
const int RST_PIN = D2;
const int BUZZER_PIN = D3;

const char* ssid = "AndroidAPFAC7";
const char* password = "iwau2541";
const char* mqttServer = "3.83.223.148";
const int mqttPort = 16331;
const char* mqttUser = "user1";
const char* mqttPassword = "0000";

const int calibration_factor = -13107.0;
const long utcOffsetInSeconds = -21600;
char charMessageRFID[35];
char charMessageWeight[30];

MFRC522 mfrc522(SS_PIN, RST_PIN); 
WiFiClient espClient;
PubSubClient client(espClient);
HX711 loadcell;
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org", utcOffsetInSeconds);

unsigned long getID(){

  if (!mfrc522.PICC_IsNewCardPresent()) {
    return -1;    
  }
  
  if (! mfrc522.PICC_ReadCardSerial()) {
    return -1;
  }
  
  unsigned long hex_num;
  hex_num =  mfrc522.uid.uidByte[0] << 24;
  hex_num += mfrc522.uid.uidByte[1] << 16;
  hex_num += mfrc522.uid.uidByte[2] <<  8;
  hex_num += mfrc522.uid.uidByte[3];
  mfrc522.PICC_HaltA();
  return hex_num;
}

void callback(char* topic, byte* payload, unsigned int length) { 
  Serial.print("Message arrived in topic: ");
  Serial.println(topic);
 
  Serial.print("Message:");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
 
  Serial.println();
  Serial.println("-----------------------"); 
}

void reconnect() {
  uint8_t retries = 3;
  
  while (!client.connected()) {
    Serial.print("Intentando conexion MQTT...");   
    
    if (client.connect("ESP8266Client", mqttUser, mqttPassword)) {
      Serial.println("conectado");
      client.subscribe("/user1/rfid");
      client.subscribe("/user1/weight");
    } else {
      Serial.print("fallo, rc=");
      Serial.print(client.state());
      Serial.println(" intenta nuevamente en 5 segundos");
      delay(5000);
    }
    retries--;
    if (retries == 0) {
      while (1);
    }
  }
}

String getTimeStampString() {
   time_t rawtime = timeClient.getEpochTime();
   struct tm * ti;
   ti = localtime (&rawtime);

   uint16_t year = ti->tm_year + 1900;
   String yearStr = String(year);

   uint8_t month = ti->tm_mon + 1;
   String monthStr = month < 10 ? "0" + String(month) : String(month);

   uint8_t day = ti->tm_mday;
   String dayStr = day < 10 ? "0" + String(day) : String(day);

   uint8_t hours = ti->tm_hour;
   String hoursStr = hours < 10 ? "0" + String(hours) : String(hours);

   uint8_t minutes = ti->tm_min;
   String minuteStr = minutes < 10 ? "0" + String(minutes) : String(minutes);

   uint8_t seconds = ti->tm_sec;
   String secondStr = seconds < 10 ? "0" + String(seconds) : String(seconds);

   return yearStr + "-" + monthStr + "-" + dayStr + "," +
          hoursStr + ":" + minuteStr + ":" + secondStr;
}

void setup() {
   Serial.begin(9600);
   SPI.begin();       
   mfrc522.PCD_Init(); 

   pinMode(BUZZER_PIN, OUTPUT);
   digitalWrite(BUZZER_PIN, LOW);

   loadcell.begin(LOADCELL_DOUT_PIN, LOADCELL_SCK_PIN);
   loadcell.set_scale(calibration_factor);
   loadcell.tare();

  WiFi.begin(ssid, password);
 
   while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi..");
   }   
    
   client.setServer(mqttServer, mqttPort);
   client.setCallback(callback);

   while (!client.connected()) {
    Serial.println("Connecting to MQTT...");
 
    if (client.connect("ESP8266Client", mqttUser, mqttPassword )) { 
      Serial.println("connected");  
 
    } else { 
      Serial.print("failed with state ");
      Serial.print(client.state());
      delay(2000); 
    }
  }

  timeClient.begin(); 
  client.subscribe("/user1/rfid");
  client.subscribe("/user1/weight");
}

void loop() { 

  if (!client.connected()) {
    Serial.println("Disconnected");
    reconnect();
  }

  client.loop();

  timeClient.update(); 
  
  unsigned long id = getID();  
  String timer = getTimeStampString();
  
  if (id != -1) { 
    String message = timer;
    message.concat(",");
    message.concat(id);
    message.toCharArray(charMessageRFID, 35);
    client.publish("/user1/rfid", charMessageRFID);
    
    digitalWrite(BUZZER_PIN, HIGH);
    delay(100); 
    digitalWrite(BUZZER_PIN, LOW); 
  }  

  if (loadcell.is_ready()) {
    int weight_value = loadcell.read();
    String message = timer;
    message.concat(",");
    message.concat(weight_value);
    message.toCharArray(charMessageWeight, 30);  
    client.publish("/user1/weight", charMessageWeight);   
  } 

  delay(2000);
}