# Realtime-Kafka-Node

A modern Node.js application demonstrating real-time messaging with Apache Kafka using the [KafkaJS](https://kafka.js.org/) library. This project covers the full lifecycle: creating topics, producing events, and consuming messages, making it ideal for learning or prototyping distributed systems and event-driven architectures.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Commands](#commands)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Example Scenarios](#example-scenarios)
- [Troubleshooting](#troubleshooting)
- [Author](#author)
- [License](#license)

## Prerequisites

- Knowledge
  - Node.JS Intermediate level
  - Experience with designing distributed systems
- Tools
  - Node.js: [Node.js](https://nodejs.org/en)
  - Docker: [Download Docker](https://www.docker.com/)
  - VsCode: [VsCode Download](https://code.visualstudio.com/)
- Apache Kafka and Zookeeper running and accessible at `localhost:9092`
- Network access to the Kafka broker from your machine

## Commands

Start Zookeper Container and expose PORT 2181.

```sh
docker run -p 2181:2181 zookeeper
```

Start Kafka Container, expose PORT 9092 and setup ENV variables.

```sh
docker run -p 9092:9092 \
  -e KAFKA_NODE_ID=1 \
  -e KAFKA_PROCESS_ROLES=broker,controller \
  -e KAFKA_LISTENERS=PLAINTEXT://:9092,CONTROLLER://:9093 \
  -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 \
  -e KAFKA_CONTROLLER_LISTENER_NAMES=CONTROLLER \
  -e KAFKA_CONTROLLER_QUORUM_VOTERS=1@localhost:9093 \
  -e CLUSTER_ID=<CLUSTER ID> \
  -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 \
  -e KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR=1 \
  -e KAFKA_TRANSACTION_STATE_LOG_MIN_ISR=1 \
  confluentinc/cp-kafka:latest
```

##### CLUSTER ID:

```sh
docker run --rm confluentinc/cp-kafka:latest kafka-storage random-uuid
```

## Installation

```sh
npm install
```

## Project Structure

- [`client.js`](client.js): Kafka client configuration
- [`admin.js`](admin.js): Topic creation
- [`producer.js`](producer.js): Produces messages to Kafka
- [`consumer.js`](consumer.js): Consumes messages from Kafka
- [`package.json`](package.json): Project dependencies

## Usage

### 1. Create Kafka Topic

Run the admin script to create the topic:

```sh
node admin.js
```

### 2. Produce a Message

Send a message to the topic:

```sh
node producer.js
```

### 3. Consume Messages

Start the consumer to listen for messages:

```sh
node consumer.js
```

## Example Scenarios

### Scenario 1: Single Consumer Group ([`user-1`](consumer.js)) with Two Partitions (north, south)

- **Consumer Group:** user-1
- **Partitions:** north, south

**Step 1:**
Run the producer and send the first message ([`producer.js`](producer.js)):

```sh
node producer.js
```

Input:

```
Rahul north
```

**Output:**

```
Group : user-1 | Topic : rider-updates | Partition: 0 | message: {"riderName":"Rahul","location":"north"}
```

**Step 2:**
Send another message:

```
Rahul south
```

**Output:**

```
Group : user-1 | Topic : rider-updates | Partition: 0 | message: {"riderName":"Rahul","location":"north"}
Group : user-1 | Topic : rider-updates | Partition: 1 | message: {"riderName":"Rahul","location":"south"}
```

---

#### How Partition Mapping Works

Messages are assigned to partitions based on the location field (e.g., 'north' goes to partition 0, 'south' to partition 1).

---

### Scenario 2: Two Consumer Groups ([`user-1`](consumer.js) and [`user-2`](consumer.js)) with Two Partitions (north, south)

- **Consumer Groups:** user-1, user-2
- **Partitions:** north, south

**Step 1:**
Run the producer and send the first message ([`producer.js`](producer.js)):

```sh
node producer.js
```

Input:

```
Rahul north
```

**Output:**

```
Group : user-1 | Topic : rider-updates | Partition: 0 | message: {"riderName":"Rahul","location":"north"}
Group : user-2 | Topic : rider-updates | Partition: 0 | message: {"riderName":"Rahul","location":"north"}
```

**Step 2:**
Send another message:

```
Rahul south
```

**Output:**

```
Group : user-1 | Topic : rider-updates | Partition: 1 | message: {"riderName":"Rahul","location":"south"}
Group : user-2 | Topic : rider-updates | Partition: 1 | message: {"riderName":"Rahul","location":"south"}
```

---

## Troubleshooting

- Ensure Kafka and Zookeeper are running and accessible at the broker address in [`client.js`](client.js).
- If you see `The group coordinator is not available`, check your Kafka broker configuration (`advertised.listeners`, network/firewall, broker logs).
- You can change the broker address in [`client.js`](client.js) if needed.

---

## Author

Rahul Umrao

---

## Images

Below are some visual diagrams and screenshots related to the project. Place your images in the `images/` folder and reference them here:

### Architecture Diagram

![Architecture Diagram](images/architecture.png)

### Example Output Screenshot

![Example Output](images/example.png)
