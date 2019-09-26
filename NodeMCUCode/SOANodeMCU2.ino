#include <PubSubClient.h>
#include <NTPClient.h>
#include <ESP8266WiFi.h>
#include <WiFiUdp.h>

// defines pins numbers
const int trigPin = D1;  //D8
const int echoPin = D0;  //D3
const int trigPin2 = D3;
const int echoPin2 = D2;

const char* ssid = "AndroidAPFAC7";
const char* password = "iwau2541";
const char* mqttServer = "3.83.223.148";
const int mqttPort = 16331;
const char* mqttUser = "user1";
const char* mqttPassword = "0000";

const long utcOffsetInSeconds = -21600;
char charMessageUltrasonic1[30];
char charMessageUltrasonic2[30];

WiFiClient espClient;
PubSubClient client(espClient);
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org", utcOffsetInSeconds);

int getDistanceFirstSensor() {

  long duration;
  int distance;
  
  // Clears the trigPin
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  
  // Sets the trigPin on HIGH state for 10 micro seconds
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  // Reads the echoPin, returns the sound wave travel time in microseconds
  duration = pulseIn(echoPin, HIGH);
  
  // Calculating the distance
  distance = duration * 0.034/2;

  return distance;
}

int getDistanceSecondSensor() {

  long duration;
  int distance;
  
  // Clears the trigPin
  digitalWrite(trigPin2, LOW);
  delayMicroseconds(2);
  
  // Sets the trigPin on HIGH state for 10 micro seconds
  digitalWrite(trigPin2, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin2, LOW);
  
  // Reads the echoPin, returns the sound wave travel time in microseconds
  duration = pulseIn(echoPin2, HIGH);
  
  // Calculating the distance
  distance = duration * 0.034/2;

  return distance;
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
      client.subscribe("/user1/ultrasonic/1");
      client.subscribe("/user1/ultrasonic/2");
    } else {
      Serial.print("fallo, rc=");
      Serial.print(client.state());
      Serial.println(" intenta nuevamente en 5 segundos");
      // espera 5 segundos antes de reintentar
      delay(5000);
    }
    retries--;
    if (retries == 0) {
      // esperar a que el WDT lo reinicie
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
  
  pinMode(trigPin, OUTPUT); // Sets the trigPin as an Output
  pinMode(echoPin, INPUT); // Sets the echoPin as an Input

  pinMode(trigPin2, OUTPUT); // Sets the trigPin as an Output
  pinMode(echoPin2, INPUT); // Sets the echoPin as an Input

  Serial.begin(9600); // Starts the serial communication

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
  client.publish("/user1/ultrasonic/1", "Hello from ESP8266-2");
  client.publish("/user1/ultrasonic/2", "Hello from ESP8266-2");
  client.subscribe("/user1/ultrasonic/1");
  client.subscribe("/user1/ultrasonic/2");
}

void loop() {

  int distance1_cm = getDistanceFirstSensor(); 
  int distance2_cm = getDistanceSecondSensor();

  if (!client.connected()) {
    Serial.println("Disconnected");
    reconnect();
  }

  timeClient.update();  
  client.loop();
    
  String timer = getTimeStampString();

  String ultrasonicMessage1 = timer;
  ultrasonicMessage1.concat(",");
  ultrasonicMessage1.concat(distance1_cm);
  String ultrasonicMessage2 = timer;
  ultrasonicMessage2.concat(",");
  ultrasonicMessage2.concat(distance2_cm);

  ultrasonicMessage1.toCharArray(charMessageUltrasonic1, 30);
  ultrasonicMessage2.toCharArray(charMessageUltrasonic2, 30); 

  client.publish("/user1/ultrasonic/1", charMessageUltrasonic1);
  client.publish("/user1/ultrasonic/2", charMessageUltrasonic2);  
  
  delay(1000); 
}
