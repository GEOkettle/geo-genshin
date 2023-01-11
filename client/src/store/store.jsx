import create from 'zustand'
import { devtools } from 'zustand/middleware'

const store = (set) => ({
  status: "char",
  setStatus: (status) => set(state => ({ ...state, status })),
  
  characters: [],
  setCharacters:(characters) => set(state => ({ ...state, characters })),
})

const useStore = create(
   devtools(store)
);



export default useStore;