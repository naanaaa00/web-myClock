import mqtt from 'mqtt';

const client  = mqtt.connect('mqtt://test.mosquitto.org');

const topik = 'topik1';

client.on('connect', () => {
  client.subscribe(topik, (err) => {
    if (!err) {
      console.log('Klien terhubung ke broker MQTT');
    }
  });
});

client.on('message', (topic, message) => {
  message = message.toString();
  console.log(`Pesan diterima pada topik ${topic}: ${message}`);
});

client.on('connect', () => {
  setInterval(() => {
    client.publish(topik, '1');
    console.log('pesan terkirim');
  }, 5000);
});



export default client; // Ekspor klien MQTT
