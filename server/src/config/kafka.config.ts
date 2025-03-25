import { Kafka, logLevel } from "kafkajs";
import fs from "fs";
import path from "path";


const caPath = path.resolve("./ca.pem");
console.log(caPath);

const kafka = new Kafka({
  brokers: [process.env.KAFKA_BROKER!],
  ssl: {
    ca: [fs.readFileSync(caPath, "utf-8")],
  },
  sasl: {
    mechanism: "plain", // Adjust based on your Aiven settings
    username: process.env.KAFKA_USERNAME,
    password: process.env.KAFKA_PASSWORD,
  },
  logLevel: logLevel.ERROR,
});

export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: "chats" });

export const connectKafkaProducer = async () => {
  try {
    await producer.connect();
    console.log("Kafka Producer connected...");
  } catch (error) {
    console.error("Kafka Producer connection error:", error);
  }
};

// Call this function to connect
// connectKafkaProducer();