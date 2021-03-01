import { useEffect, useState } from 'react'
import Alert from 'components/Alert'
import Button from 'components/Button'
import classnames from 'classnames'
import Input from 'components/form/Input'
import Textarea from 'components/form/Textarea'
import validateEmail from 'functions/validateEmail'
import validateTelephone from 'functions/validateTelephone'

export default function Form({ fields: defaults }) {
  const [fields, setFields] = useState([])
  const [alert, setAlert] = useState(false)

  // Set empty fields on initial render
  useEffect(() => {
    resetFields()
  }, [])

  // Reset fields to empty values without errors
  const resetFields = () => {
    setFields(
      defaults.map((field) => {
        field.error = false
        field.value = ''
        return field
      })
    )
  }

  // Update fields when field input is changed
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

  // Submit form
  const submit = (e) => {
    e.preventDefault()

    // Validate fields
    setFields(
      [...fields].map((field) => {
        if (field.required && field.value == '') {
          field.error = `${field.label} is een verplicht veld.`
        } else if (field.type == 'email' && !validateEmail(field.value)) {
          field.error = 'Vul alsjeblieft een geldig e-mailadres in.'
        } else if (
          field.type == 'telephone' &&
          !validateTelephone(field.value)
        ) {
          field.error = 'Vul alsjeblieft een geldig telefoonnummer in.'
        }

        return field
      })
    )

    // Submit form if there are no errors
    if (fields.filter((field) => field.error != '').length == 0) {
      try {
        fetch('/api/submit-form', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(fields),
        }).then(function () {
          resetFields()
          setAlert({
            message:
              'Bedankt voor je bericht! We nemen binnenkort contact met je op.',
            type: 'success',
          })
        })
      } catch (error) {
        // API  error message
        setAlert({
          message:
            'Er ging helaas iets mis met het versturen van het formulier. Probeer het nog een keer of neem op een andere manier contact met ons op.',
          type: 'error',
        })
        console.log(error)
      }
    } else {
      // Validation error message
      setAlert({
        message:
          'Het formulier kon niet worden verstuurd omdat niet alle velden correct zijn ingevuld. Controleer je input en probeer het nog een keer.',
        type: 'error',
      })
    }
  }

  return (
    <form>
      {fields.map((field) => (
        <label
          className={classnames('flex flex-col md:flex-row mb-4')}
          key={field.id}
        >
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

      {alert && (
        <Alert className="mb-4 md:ml-1/4" type={alert.type}>
          {alert.message}
        </Alert>
      )}

      <Button className="md:ml-1/4" onClick={(e) => submit(e)}>
        Bericht versturen
      </Button>
    </form>
  )
}
