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
      className="md:ml-1/4 mt-2 md:mt-3"
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
  <Wrapper label center>
    <Label>{label}</Label>
    <input
      className={clsx('form-input', small ? 'md:w-1/3' : 'md:w-1/2')}
      type="text"
    />
  </Wrapper>
)

const Radio = ({ title, options, name }) => (
  <Wrapper>
    <Label margin>{title}</Label>
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
  </Wrapper>
)

const Select = ({ title, options, small }) => (
  <Wrapper>
    <Label margin>{title}</Label>
    <select className={clsx('form-select', small ? 'md:w-1/3' : 'md:w-1/2')}>
      {Object.entries(options).map(([value, label]) => (
        <option value={value} key={value}>
          {label}
        </option>
      ))}
    </select>
  </Wrapper>
)

const Textarea = ({ label }) => (
  <Wrapper label>
    <Label margin>{label}</Label>
    <textarea className="form-textarea md:w-3/4" rows="4"></textarea>
  </Wrapper>
)

const Wrapper = ({ center, label, children }) => {
  const classes = clsx('flex flex-col md:flex-row mb-4 md:mb-5 last:mb-0', center && 'md:items-center')

  if (label) {
    return <label className={classes}>{children}</label>
  }

  return <div className={classes}>{children}</div>
}

const Label = ({ margin, children }) => (
  <div className={clsx('mb-2 md:mb-0 font-bold pr-4 md:w-1/4', margin && 'md:mt-3')}>
    {children}
  </div>
)
