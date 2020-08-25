import Button from 'components/Button'

const Form = () => (
  <form className="max-w-xl">
    <h2>General fields</h2>
    <Input label="Name" />
    <Input label="E-mail address" />
    <Input label="Telephone number" />
    <Input label="Address" />
    <Input label="Postal code" />
    <Input label="City" />
    <hr className="mt-8" />
    <h2>Some other fields</h2>
    <Radio
      title="Radio buttons"
      name="options"
      options={{
        'option-1': 'Option 1',
        'option-2': 'Option 2',
        'option-3': 'Option 3',
      }}
    />
    <Button
      large
      submit
      className="ml-1/3"
      onClick={(e) => {
        e.preventDefault()
        alert('Here you can add your custom submit logic. 📋')
      }}
    >
      Submit form
    </Button>
  </form>
)

export default Form

const Input = ({ label }) => (
  <label className="flex items-center mb-4 last:mb-0">
    <div className="font-bold pr-4 w-1/3">{label}</div>
    <input className="form-input w-2/3" type="text" />
  </label>
)

const Radio = ({ title, options, name }) => (
  <div className="flex">
    <div className="font-bold pr-4 w-1/3 mt-3">{title}</div>
    <div>
      {Object.entries(options).map(([value, label], index) => (
        <label className="flex items-center mb-4 last:mb-0" key={value}>
          <input
            className="form-radio mr-4"
            type="radio"
            name={name}
            value={value}
            defaultChecked={index === 0}
          />
          <div>{label}</div>
        </label>
      ))}
    </div>
  </div>
)
