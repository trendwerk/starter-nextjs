import { useState } from 'react'
import Alert from 'components/Alert'
import Button from 'components/Button'
import classnames from 'classnames'
import Input from 'components/form/Input'
import Textarea from 'components/form/Textarea'
import validateEmail from 'functions/validateEmail'
import validateTelephone from 'functions/validateTelephone'

export default function Form() {
  const fieldsDefault = [
    {
      id: 'name',
      label: 'Naam',
      type: 'text',
      value: '',
      required: true,
      error: false,
    },
    {
      id: 'company',
      label: 'Bedrijfsnaam',
      type: 'text',
      value: '',
      required: true,
      error: false,
    },
    {
      id: 'email',
      label: 'Email',
      type: 'email',
      value: '',
      required: true,
      error: false,
    },
    {
      id: 'telephone',
      label: 'Telefoon',
      type: 'telephone',
      value: '',
      required: true,
      error: false,
    },
    {
      id: 'message',
      label: 'Uw bericht',
      type: 'textarea',
      value: '',
      required: false,
      error: false,
    },
  ]

  const [fields, setFields] = useState(fieldsDefault)
  const [success, setSuccess] = useState('')

  const updateField = (id, e) => {
    e.preventDefault()

    setFields(
      [...fields].map((field) => {
        if (field.id == id) {
          field.value = e.target.value
          field.error = false
        }
        return field
      })
    )
  }

  const submit = (e) => {
    e.preventDefault()

    // Validate fields
    setFields(
      [...fields].map((field) => {
        if (field.required && field.value == '') {
          field.error = `${field.label} is een verplicht veld.`
        } else if (field.type == 'email' && !validateEmail(field.value)) {
          field.error = 'Vul a.u.b. een geldig e-mailadres in.'
        } else if (
          field.type == 'telephone' &&
          !validateTelephone(field.value)
        ) {
          field.error = 'Vul a.u.b. een geldig telefoonnummer in.'
        }

        return field
      })
    )

    console.log(fields.filter((field) => field.error != '').length)

    // Submit form if there are no errors
    if (fields.filter((field) => field.error != '').length == 0) {
      setSuccess('er zijn geen errors')

      try {
        fetch('/api/submit-form', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(fields),
        }).then(function () {
          setFields(fieldsDefault)
          setSuccess(
            'Bedankt voor je bericht! We nemen binnenkort contact met je op.'
          )
        })
      } catch (error) {
        console.log(error)
        setSuccess('')
      }
    }
  }

  return (
    <form>
      {fields.map((field) => (
        <label className={classnames('flex flex-col md:flex-row mb-4')}>
          <div
            className={classnames(
              'font-bold mb-2 md:my-2 md:w-1/4 md:pr-4',
              field.error && 'text-red-500'
            )}
          >
            {field.label}
            {field.required && ' *'}
          </div>

          <div className="flex flex-col md:w-3/4">
            {field.type == 'textarea' ? (
              <Textarea
                className="md:w-full"
                error={field.error}
                onChange={(e) => updateField(field.id, e)}
                value={field.value}
              />
            ) : (
              <Input
                className="md:w-3/4"
                error={field.error}
                onChange={(e) => updateField(field.id, e)}
                type={field.type}
                value={field.value}
              />
            )}

            {field.error && (
              <Alert className="mt-2" type="error">
                {field.error}
              </Alert>
            )}
          </div>
        </label>
      ))}

      {success && (
        <Alert className="mb-4 md:ml-1/4" type="success">
          {success}
        </Alert>
      )}

      <Button className="md:ml-1/4" onClick={(e) => submit(e)}>
        Bericht versturen
      </Button>
    </form>
  )
}
