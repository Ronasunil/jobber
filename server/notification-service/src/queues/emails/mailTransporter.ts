import { config } from "@notifications/config";

import { EmailLocals, winstonLogger } from "@ronasunil/jobber-shared";
import Email from "email-templates";
import nodemailer, { Transporter } from "nodemailer";
import path from "path";

const logger = winstonLogger(
  config.ELASTIC_SEARCH_ENDPOINT!,
  "Notification service",
  "info"
);

const createMailTransport = function (): Transporter {
  const transporter = nodemailer.createTransport({
    host: config.HOST,
    port: config.SMTP_PORT,
    auth: {
      user: config.SENDER_EMAIL,
      pass: config.SENDER_PASS,
    },
  });

  return transporter;
};

export const sendEmail = async function (
  template: string,
  locals: EmailLocals,
  receiver: string
) {
  const transporter = createMailTransport();

  try {
    await new Email({
      message: {
        from: `Jobber <${config.SENDER_EMAIL}>`,
      },

      send: true,
      transport: transporter,
      preview: false,
      views: {
        options: {
          extension: "ejs",
        },
      },

      juice: true,
      juiceResources: {
        preserveImportant: true,
        webResources: {
          relativeTo: path.join(__dirname, "../../../build"),
        },
      },
    }).send({
      locals,
      message: { to: receiver },
      template: path.join(__dirname, "../emails/", template),
    });

    logger.info("Mail sent");
  } catch (err) {
    logger.error("Failed to sent mail :sendEmail()", err);
  }
};
