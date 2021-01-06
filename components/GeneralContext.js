import { createContext } from 'react'

const GeneralContext = createContext()

export const GeneralProvider = ({ children, data }) => {
  return (
    <GeneralContext.Provider
      value={{
        app: data.app,
        general: data.general.fields,
        menus: data.menus,
      }}
    >
      {children}
    </GeneralContext.Provider>
  )
}

export default GeneralContext
