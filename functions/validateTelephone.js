export default function validateTelephone(input) {
  return input.replace(/[^0-9.]/g, '').length >= 10
}
