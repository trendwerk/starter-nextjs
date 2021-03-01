const mailer = require('@sendgrid/mail')

export default async function (request, response) {
  mailer.setApiKey(process.env.SENDGRID_API_KEY)
  const fields = request.body

  try {
    await mailer.send({
      to: process.env.EMAIL,
      from: fields.email,
      subject: `Nieuwe aanvraag van ${fields.name}`,
      text: fields.message,
      html: `
        <p>Er is een contactformulier ingevuld op de website van ${
          process.env.SITE_NAME
        } met de volgende gegeven:</p>
        <ul>
          ${Object.keys(fields)
            .map((key) => {
              return `<li><b>${key}:</b> ${fields[key]}</li>`
            })
            .join('')}
        </ul>
      `,
    })
    response.status(200).send('Message sent successfully.')
  } catch (error) {
    console.log('ERROR', error)
    response.status(400).send('Message not sent.')
  }
}
