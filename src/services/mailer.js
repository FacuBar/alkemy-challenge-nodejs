const nodemailer = require('nodemailer');

class Emails {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.USER, pass: process.env.PASSWORD },
    });
  }

  async notify(sendTo) {
    try {
      await this.transporter.sendMail({
        from: `"alkemytestapi" <${process.env.USER}>`,
        to: `${sendTo}`,
        subject: `welcome`,
        text: `Hi there! registration was completed successfully.`,
      });
    } catch (e) {
      // for now just ignore it
    }
  }
}

const emails = new Emails();

module.exports = emails;
