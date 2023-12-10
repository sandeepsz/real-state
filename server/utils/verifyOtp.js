import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
const __dirname = path.resolve();

const sendEmail = async (email, subject, text) => {
  try {
    const requiredPath = path.join(__dirname, "/server/utils/index.html");
    const data = await ejs.renderFile(requiredPath, {
      text: text,
    });
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "d7796020a235c6",
        pass: "e92cb76d2114f0",
      },
    });

    await transporter.sendMail({
      from: "noreply@gmail.com",
      to: email,
      subject: subject,
      html: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export default sendEmail;
