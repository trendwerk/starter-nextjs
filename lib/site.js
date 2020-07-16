import { get } from 'lib/api'

export async function getSite() {
  const data = await get(`
    {
      generalSettings {
        dateFormat
        description
        language
        title
      }
    }
  `)
  return data.generalSettings
}
