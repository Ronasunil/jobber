import { addReview } from "@gig/services/command";
import { GigRatingUpdateAttrs } from "@ronasunil/jobber-shared";
import { Channel, ConsumeMessage } from "amqplib";

export const gigReviewConsumer = async function (channel: Channel) {
  const exchangeKey = "gig-review";
  const routingKey = "add";
  const queueName = "review-adding-queue";

  await channel.assertExchange(exchangeKey, "direct", {
    autoDelete: false,
    durable: true,
  });

  const queue = await channel.assertQueue(queueName, {
    autoDelete: false,
    durable: true,
  });

  await channel.bindQueue(queue.queue, exchangeKey, routingKey);

  await channel.consume(queue.queue, async (msg: ConsumeMessage | null) => {
    if (!msg?.content) return;
    const data = JSON.parse(msg.content.toString()) as GigRatingUpdateAttrs;

    await addReview(data);
    channel.ack(msg);
  });
};
