import { config } from "@notifications/config";

import { Channel, ConsumeMessage } from "amqplib";
import { sendEmail } from "./emails/mailTransporter";
import { EmailAuth, EmailLocals, EmailOrder } from "@ronasunil/jobber-shared";

export const emailAuthConsumer = async function (
  channel: Channel
): Promise<void> {
  const exchangeKey = "email-auth-notifications";
  const routingKey = "email-auth";
  const queueName = "email-auth-queue";

  await channel.assertExchange(exchangeKey, "direct");
  const queue = await channel.assertQueue(queueName, {
    durable: true,
    autoDelete: false,
  });
  await channel.bindQueue(queue.queue, exchangeKey, routingKey);

  channel.consume(queue.queue, async (msg: ConsumeMessage | null) => {
    if (!msg?.content.toString()) return;
    const { receiverEmail, resetLink, template, username, verifyLink } =
      JSON.parse(msg.content.toString()) as EmailAuth;
    const locals: EmailLocals = {
      appIcon: config.APP_ICON!,
      appLink: config.CLIENT_URL!,
      resetLink,
      verifyLink,
      username,
    };

    await sendEmail(template, locals, receiverEmail);

    channel.ack(msg);
  });
};

export const emailOrderConsumer = async function (
  channel: Channel
): Promise<void> {
  const exchangeKey = "email-order-notification";
  const routingKey = "email-order";
  const queueName = "email-order-queue";

  await channel.assertExchange(exchangeKey, "direct");
  const queue = await channel.assertQueue(queueName, {
    durable: true,
    autoDelete: false,
  });

  await channel.bindQueue(queue.queue, exchangeKey, routingKey);

  channel.consume(queue.queue, async (msg) => {
    if (!msg?.content.toString()) return;

    const {
      receiverEmail,
      username,
      template,
      sender,
      offerLink,
      amount,
      buyerUsername,
      sellerUsername,
      title,
      description,
      deliveryDays,
      orderId,
      orderDue,
      requirements,
      orderUrl,
      originalDate,
      newDate,
      reason,
      subject,
      header,
      type,
      message,
      serviceFee,
      total,
    } = JSON.parse(msg!.content.toString()) as EmailOrder;
    const locals: EmailLocals = {
      appLink: config.CLIENT_URL!,
      appIcon: config.APP_ICON!,
      username,
      sender,
      offerLink,
      amount,
      buyerUsername,
      sellerUsername,
      title,
      description,
      deliveryDays,
      orderId,
      orderDue,
      requirements,
      orderUrl,
      originalDate,
      newDate,
      reason,
      subject,
      header,
      type,
      message,
      serviceFee,
      total,
    };

    if (template === "orderPlaced") {
      await sendEmail("orderPlaced", locals, receiverEmail);
      await sendEmail("orderReceipt", locals, receiverEmail);
    } else await sendEmail(template, locals, receiverEmail);
  });
};
