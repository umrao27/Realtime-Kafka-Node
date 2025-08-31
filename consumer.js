/**
 * The above function initializes a Kafka consumer that subscribes to the "rider-updates" topic and
 * listens for new messages, logging the group, topic, partition, and message value for each received
 * message.
 */

const { kafka } = require('./client');
const group = process.argv[2] || "test-group";

async function init() {
    const consumer = kafka.consumer({ groupId: group });
    await consumer.connect();
    console.log("Connected!");

    // subscribe to topic
    await consumer.subscribe({ topics: ["rider-updates"], fromBeginning: true });
    console.log("Subscribed to topic [rider-updates]");

    // listen for new messages
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
           console.log(
            `Group : ${group} | Topic : ${topic} | Partition: ${partition} | message: ${message.value.toString()}`
            );
        }
    });
    console.log("Listening for messages...");
}

init().catch(console.error);