import Button from 'components/Button'
import clsx from 'clsx'

const Form = () => (
  <form>
    <h2>General fields</h2>
    <Input label="Name" />
    <Input label="E-mail address" />
    <Input label="Telephone number" />
    <Input label="Address" />
    <Input label="Postal code" />
    <Input label="City" />
    <Input small label="Small input" />
    <hr className="mt-8" />
    <h2>Some other fields</h2>
    <Input label="Something" />
    <Radio
      title="Radio buttons"
      name="options"
      options={{
        'option-1': 'Option 1',
        'option-2': 'Option 2',
        'option-3': 'Option 3',
      }}
    />
    <Textarea label="Textarea" />
    <Select
      title="Dropdown"
      options={{
        'option-1': 'Option 1',
        'option-2': 'Option 2',
        'option-3': 'Option 3',
      }}
    />
    <Select
      small
      title="Small dropdown"
      options={{
        'option-1': 'Option 1',
        'option-2': 'Option 2',
        'option-3': 'Option 3',
      }}
    />
    <Button
      large
      className="ml-1/4 mt-3"
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

const Input = ({ label, small }) => (
  <label className="flex items-center mb-5 last:mb-0">
    <div className="font-bold pr-4 w-1/4">{label}</div>
    <input className={clsx('form-input', small ? 'w-1/3' : 'w-1/2')} type="text" />
  </label>
)

const Radio = ({ title, options, name }) => (
  <div className="flex mb-5 last:mb-0">
    <div className="font-bold pr-4 w-1/4 mt-3">{title}</div>
    <div>
      {Object.entries(options).map(([value, label], index) => (
        <label className="flex items-center mb-3 last:mb-0" key={value}>
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

const Select = ({ title, options, small }) => (
  <div className="flex mb-5 last:mb-0">
    <div className="font-bold pr-4 w-1/4 mt-3">{title}</div>
    <select className={clsx('form-select', small ? 'w-1/3' : 'w-1/2')}>
      {Object.entries(options).map(([value, label]) => (
        <option value={value} key={value}>{label}</option>
      ))}
    </select>
  </div>
)

const Textarea = ({ label }) => (
  <label className="flex mb-5 last:mb-0">
    <div className="font-bold pr-4 w-1/4 mt-3">{label}</div>
    <textarea className="form-textarea w-3/4" rows="4"></textarea>
  </label>
)
