const nodemailer = require("nodemailer");
const Mailgen = require('mailgen')

const sendMail = (req, res) => {
    const { userEmail } = req.body
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user:process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD
        }
    });

    let message = {
        from: process.env.NODEMAILER_EMAIL,
        to: userEmail,
        Subject: "Place Order",
        html: "<h1>Hello World</h1>"
    }
    transporter.sendMail(message).then(() => res.status(200).json({ message: "Send Successfully" })).catch(err => res.status(500).json({ message: err.message }))
}

const sendFancyMail = (req, res) => {

    const { userEmail } = req.body

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user:process.env.NODEMAILER_EMAIL,
            pass:process.env.NODEMAILER_PASSWORD
        }
    });


    let MailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Mailgen",
            link: 'https://mailgen.js'
        }
    })

    let response = {
        body: {
            name: "Testing Mail",
            intro: "Your Bill has Arrived!",
            table: {
                data: [{
                    item: "Hello",
                    description: "testing",
                    price: "10$"
                }]
            },
            outro: "Looking Forward to do more business"
        }
    }


    let message = {
        from:process.env.NODEMAILER_EMAIL,
        to: userEmail,
        subject: "Place Order",
        html: MailGenerator.generate(response)
    }

    transporter.sendMail(message)
        .then(() => res.status(200).json({ message: "Send Successfully" }))
        .catch(err => res.status(500).json({ message: err.message }))
}

module.exports = { sendMail, sendFancyMail }