const mailer = require('@sendgrid/mail')

export default async function (request, response) {
  mailer.setApiKey(process.env.SENDGRID_API_KEY)
  const fields = request.body

  // Get value of a field
  const getField = (id) => {
    return fields.find((field) => field.id === id).value
  }

  try {
    await mailer.send({
      to: process.env.EMAIL,
      from: process.env.EMAIL,
      reply_to: getField('email'),
      subject: `Nieuwe aanvraag van ${getField('name')}`,
      text: getField('message'),
      html: `
        <p>Er is een contactformulier ingevuld op de website van ${
          process.env.SITE_NAME
        } met de volgende gegeven:</p>
        <ul>
          ${fields
            .map((field) => {
              return `<li><b>${field.label}:</b> ${field.value}</li>`
            })
            .join('')}
        </ul>
      `,
    })
    response.status(200).send('Message sent successfully.')
  } catch (error) {
    response.status(400).json(error)
  }
}
