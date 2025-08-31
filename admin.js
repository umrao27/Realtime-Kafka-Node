/**
 * The function initializes a Kafka admin client, creates a topic named "rider-updates" with 2
 * partitions, and then disconnects the admin client.
 */
const { kafka } = require("./client");

async function init() {
    const admin = kafka.admin();
    await admin.connect();
    console.log("Connected!");
    
    // create topic
    console.log("Topic creating [rider-updates]");
    await admin.createTopics({
        topics: [{ topic: "rider-updates",
                    numPartitions: 2
         }],
    });
    console.log("Topic created [rider-updates]");
    console.log("Disconnecting Admin");
    await admin.disconnect();
}

init().catch(console.error);