import {MailtrapClient} from 'mailtrap';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();
// const TOKEN = process.env.MAILTRAP_TOKEN;
// console.log(process.env.GMAIL_PASS );
// export const mailtrapClient = new MailtrapClient({
//   token: TOKEN,
// });
export const mailtrapClient = nodemailer.createTransport({
  secure: true,
  host:'smtp.gmail.com',
  port:465,
  auth: {
    user: "qsxdr584@gmail.com",
    pass: process.env.GMAIL_PASS
  }
})

// export const sender = {
//   email: "hello@demomailtrap.com",
//   name: "Doraemon",
// };
// const recipients = [
//   {
//     email: "huterabaap522@gmail.com",
//   }
// ];

// client
//   .send({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     html: "Congrats for sending test email with Mailtrap!",
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);