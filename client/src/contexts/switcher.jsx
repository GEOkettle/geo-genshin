import { createContext, useState } from 'react'

const SwitchContext = createContext({
  state: { status: 'char' },
  actions: {
    setStatus: () => { }
  }
})

const SwitchProvider = ({ children }) => { 
  const [status, setStatus] = useState('char')
  
  const value = {
    state: { status },
    actions: {setStatus}
  }
  return (
    <SwitchContext.Provider value={value}>{children}</SwitchContext.Provider>
  )
}

const { Consumer: SwitchConsumer } = SwitchContext;

export { SwitchProvider, SwitchConsumer };

export default SwitchContext;