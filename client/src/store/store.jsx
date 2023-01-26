import create from 'zustand'
import { devtools } from 'zustand/middleware'

const store = (set) => ({
  isLoading: true,
  setIsLoading : (isLoading) => set(state => ({...state, isLoading})),
  status: "char",
  setStatus: (status) => set(state => ({ ...state, status })),
  
  currentElement: 'none',
  setCurrentElement: (currentElement) => set(state=>({...state,currentElement})),

  characters: [],
  setCharacters: (characters) => set(state => ({ ...state, characters })),
  
  userInfo: [],
  setUserInfo: (userInfo) => set(state => ({...state,userInfo})),
  stats: [],
  setStats: (stats) => set(state => ({...state,stats})),
  specificChar: [],
  setSpecificChar: (specificChar) => set(state => ({ ...state, specificChar })),
  worldExp: [],
  setWorldExp: (worldExp) => set(state => ({ ...state, worldExp })),
  weaponDetail: [],
  setWeaponDetail: (weaponDetail) => set(state => ({...state,weaponDetail}))
})

const useStore = create(
   devtools(store)
);



export default useStore;