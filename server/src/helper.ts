import prisma from "./config/db.config.js";
import { producer, consumer } from "./config/kafka.config.js";

export const produceMessage = async (topic: string, message: any) => {
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(message) }],
  });
};

export const consumeMessages = async (topic: string) => {
  await consumer.connect();
  await consumer.subscribe({ topic: topic });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const data = JSON.parse(message.value.toString());
      console.log({
        partition,
        offset: message.offset,
        value: data,
      });

      // await prisma.chats.create({
      //   data: data,
      // });
     
      try {
        await prisma.chats.create({
          data: data,
        });
        console.log("Chat saved to DB:", data);
      } catch (error) {
        console.error("Error saving chat to DB:", error);
      }

      // Process the message (e.g., save to DB, trigger some action, etc.)
    },
  });
};
