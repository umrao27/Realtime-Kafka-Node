/**
 * The function initializes a Kafka consumer that subscribes to a topic, listens for new messages, and
 * logs the received messages.
 */
const { kafka } = require('./client');

async function init() {
    const consumer = kafka.consumer({ groupId: "test-group" });
    await consumer.connect();
    console.log("Connected!");

    // subscribe to topic
    await consumer.subscribe({ topics: ["rider-updates"], fromBeginning: true });
    console.log("Subscribed to topic [rider-updates]");

    // listen for new messages
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
           console.log(
            `Topic : ${topic} | Partition: ${partition} | message: ${message.value.toString()}`
            );
        }
    });
    console.log("Listening for messages...");
}

init().catch(console.error);