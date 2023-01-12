import { useEffect,useState } from 'react';

import SideBar from './components/SideBar.jsx';
import MainFrame from './components/MainFrame.jsx';
import useStore from './store/store.jsx';
function App() {

  const { setCharacters } = useStore()
  //prod
//   const getData = async () => {
//     const res = await fetch(
//       "http://3.144.80.94:5000/main", {
//     mode: 'cors',credentials:'include',
//     method: 'POST',
//     headers: { 'Accept': 'application/json', 'Content-Type': 'application/json',    'Access-Control-Allow-Origin':'http://3.144.80.94'
//  },
//     body: JSON.stringify({ uid: '87654321' })
//     }).then(res =>{return res.json()})
   
//     setCharacters(res.character.avatars)
    
//   }
//   const helloData = async () => {
//     const res = await fetch(
//       "http://3.144.80.94:5000/hello", {
//       mode: 'cors', credentials: 'include',
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://3.144.80.94'
//       },
//     })
//       .then(res => res.json())
//       .then(res=> console.log(res))
//   }
//dev
  const getData = async () => {
    const res = await fetch(
      "http://localhost:5000/main", {
    mode: 'cors',credentials:'include',
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json',    'Access-Control-Allow-Origin':'http://3.144.80.94'
 },
    body: JSON.stringify({ uid: '87654321' })
    }).then(res =>{return res.json()})
   
    setCharacters(res.character.avatars)
    
  }
  const helloData = async () => {
    const res = await fetch(
      "http://localhost:5000/hello", {
      mode: 'cors', credentials: 'include',
      method: 'POST',
      headers: {
        'Accept': 'application/json', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://3.144.80.94'
      },
    })
      .then(res => res.json())
      .then(res=> console.log(res))
  }





  useEffect(() => {
    getData();
    helloData();

  }, [])

  return (
      <>
      <SideBar />
      <MainFrame/>

    </>
  
  )
}

export default App


