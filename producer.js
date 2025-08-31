/**
 * The above function initializes a Kafka producer, connects to it, prompts the user for input, sends
 * messages to a Kafka topic based on user input, and disconnects the producer when the user closes the
 * input stream.
 */

const { kafka } = require("./client");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


async function init() {
    const producer = kafka.producer();
    await producer.connect();
    console.log("Connected!");

    rl.setPrompt('>');
    rl.prompt();

    rl.on('line', async (line) => {
        const [riderName, location] = line.trim().split(' ');
        // send message
        console.log("Sending message");
        await producer.send({
            topic: "rider-updates",
            messages: [
                { partition:location.toLowerCase() === "north" ? 0 : 1, key: "location-update", value: JSON.stringify({riderName, location}) },
            ],
        });
    });
    rl.on('close', async() => {
        console.log("Message sent");
        console.log("Disconnecting Producer");
        await producer.disconnect();
    });
}

init().catch(console.error);