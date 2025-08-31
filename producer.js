/**
 * The function initializes a Kafka producer, sends a message to a topic, and then disconnects the
 * producer.
 */
const { kafka } = require("./client");

async function init() {
    const producer = kafka.producer();
    await producer.connect();
    console.log("Connected!");
    // send message
    console.log("Sending message");
    await producer.send({
        topic: "rider-updates",
        messages: [
           { partition:0, key: "location-update", value: JSON.stringify({name: "Rahul", location: "Bengaluru"}) },
        ],
    });
    console.log("Message sent");
    console.log("Disconnecting Producer");
    await producer.disconnect();
}

init().catch(console.error);