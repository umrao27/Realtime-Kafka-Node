/* This code snippet is using the `kafkajs` library to create a Kafka client instance.*/

const { Kafka }  = require("kafkajs");
// create broker
exports.kafka = new Kafka({
    clientId : "my-app",
    brokers: ["localhost:9092"],
});