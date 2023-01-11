import { useEffect,useState } from 'react';
import './App.css'
import SideBar from './components/SideBar';
import MainFrame from './components/MainFrame';
import useStore from './store/store';

function App() {

  const { characters,setCharacters}=useStore()
  const getData = async () => {
    const res = await fetch(
      "http://localhost:5000/main",{
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ uid: '87654321' })
    }).then(res => { return res.json() })

    setCharacters(res.character.avatars)

  }

  useEffect(() => {
    getData();

  }, [])

  return (
      <>
      <SideBar />
      <MainFrame/>

    </>
  
  )
}

export default App


