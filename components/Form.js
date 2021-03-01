import { useState } from 'react'
import Alert from 'components/Alert'
import Button from 'components/Button'
import classnames from 'classnames'
import Input from 'components/form/Input'
import Textarea from 'components/form/Textarea'
import validateEmail from 'functions/validateEmail'
import validateField from 'functions/validateField'
import validateTelephone from 'functions/validateTelephone'

export default function Form() {
  const fieldsDefault = {
    name: '',
    company: '',
    email: '',
    telephone: '',
    message: '',
  }

  const [fields, setFields] = useState(fieldsDefault)
  const [errors, setErrors] = useState([])
  const [success, setSuccess] = useState('')

  const updateField = (field, e) => {
    e.preventDefault()

    let newFields = { ...fields }
    newFields[field] = e.target.value

    setFields(newFields)
  }

  const submit = (e) => {
    e.preventDefault()

    // Validate form
    let errors = []

    if (!validateField(fields.name)) {
      errors.push('Vul a.u.b. een naam in.')
    }
    if (!validateField(fields.company)) {
      errors.push('Vul a.u.b. een bedrijfsnaam in.')
    }
    if (!validateEmail(fields.email)) {
      errors.push('Vul a.u.b. een geldig e-mailadres in.')
    }
    if (!validateTelephone(fields.telephone)) {
      errors.push('Vul a.u.b. een geldig telefoonnummer in.')
    }

    // Show errors or submit form
    if (errors.length > 0) {
      setErrors(errors)
      setSuccess('')
    } else {
      try {
        fetch('/api/submit-form', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(fields),
        }).then(function () {
          setFields(fieldsDefault)
          setErrors([])
          setSuccess('Bedankt voor je bericht! We nemen binnenkort contact op.')
        })
      } catch (error) {
        console.log(error)
        setErrors([
          'Er ging helaas iets mis met het versturen van het formulier. Probeer het nog een keer of neem op een andere manier contact met ons op.',
        ])
        setSuccess('')
      }
    }
  }

  return (
    <form>
      <Field label="Naam *">
        <Input
          className="md:w-1/2"
          onChange={(e) => updateField('name', e)}
          value={fields.name}
        />
      </Field>

      <Field label="Bedrijfsnaam *">
        <Input
          className="md:w-1/2"
          onChange={(e) => updateField('company', e)}
          value={fields.company}
        />
      </Field>

      <Field label="E-mail *">
        <Input
          className="md:w-1/2"
          onChange={(e) => updateField('email', e)}
          type="email"
          value={fields.email}
        />
      </Field>

      <Field label="Telefoon *">
        <Input
          className="md:w-1/2"
          onChange={(e) => updateField('telephone', e)}
          value={fields.telephone}
        />
      </Field>

      <Field label="Uw bericht">
        <Textarea
          className="md:w-3/4"
          onChange={(e) => updateField('message', e)}
          value={fields.message}
        />
      </Field>

      {errors.map((error, index) => (
        <Alert className="mb-6 md:ml-1/4" key={index} type="error">
          {error}
        </Alert>
      ))}

      {success && (
        <Alert className="mb-6 md:ml-1/4" type="success">
          {success}
        </Alert>
      )}

      <Button className="md:ml-1/4" onClick={(e) => submit(e)}>
        Bericht versturen
      </Button>
    </form>
  )
}

const Field = ({ children, label }) => (
  <label className={classnames('flex flex-col md:flex-row mb-6')}>
    <div className={classnames('font-bold mb-2 md:my-2 md:w-1/4 md:pr-4')}>
      {label}
    </div>
    {children}
  </label>
)
