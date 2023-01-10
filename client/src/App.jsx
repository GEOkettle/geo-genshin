import { useEffect,useState } from 'react';
import './App.css'

function App() {
  const [userInfo, setUserInfo] = useState([])
  const getData = async () => {
    const res = await fetch(
      "http://localhost:5000/main",{
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ uid: '87654321' })
    }).then(res => { return res.json() })
      .then(res => {
        console.log(res)
        setUserInfo(...userInfo,[res])
      })
    
  }
  
  useEffect(() => {
    getData();

  }, [])

  return (
    <div className="App">
      { JSON.stringify(userInfo)}
    </div>
  )
}

export default App
