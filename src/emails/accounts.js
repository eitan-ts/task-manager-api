const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) =>{
    sgMail.send({
        to: email,
        from: 'eitan1997ts@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendCancelEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'eitan1997ts@gmail.com',
        subject: 'We are sad to hear you leave',
        text: `It was sad to hear you leave, ${name}. Please let us know what could we have done better`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail

}
