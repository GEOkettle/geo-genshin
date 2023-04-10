import { useEffect,useState } from 'react';
import UidForm from './components/UidForm.jsx';
import SideBar from './components/SideBar.jsx';
import MainFrame from './components/MainFrame.jsx';
import LoadingPage from './components/LoadingPage.jsx';
import useStore from './store/store.jsx';
import CharacterInfo from './components/CharacterInfo';
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, Cloud, Sparkles } from '@react-three/drei';

 
function App() {

const { setCharacters,setUserInfo,currentElement,setStats,setIsLoading,isLoading,setWorldExp,userId,setUserId } = useStore()
const colorSet = {
  none: "black",
  Geo: "rgb(219, 168, 1,0.8)",
  Cryo:"#72BCCC",
  Pyro: "#FF6C6C",
  Hydro:"#3F80E8",
  Electro:"#8A3EAB",
  Anemo:"#00BFA5",
  Dendro:"rgb(0, 128, 0)",
}
const ParticleColorSet = {
  none: "white",
  Geo: "yellow",
  Cryo:"white",
  Pyro:"yellow",
  Hydro:"white",
  Electro:"#f078f0",
  Anemo:"white",
  Dendro:"rgb(82, 236, 82)",
}
  //prod
  // const getData = async () => {
  //   const res = await fetch(
  //     "http://3.144.80.94:5000/main", {
  //   mode: 'cors',credentials:'include',
  //   method: 'POST',
  //   headers: { 'Accept': 'application/json', 'Content-Type': 'application/json',    'Access-Control-Allow-Origin':'http://3.144.80.94'},
  //   body: JSON.stringify({ uid: '87654321' })
  //   }).then(res => {  return res.json() })
  //     .then((res) => {
  //       setCharacters(res.character.avatars)
  //       setUserInfo(res.user)
  //       setStats(res.profile)
  //     }
  //   )
  //   .then(()=>setIsLoading(false))
    
  // }

//dev
  const getData = async () => {
    const res = await fetch(
      "http://localhost:5000/main", {
    mode: 'cors',credentials:'include',
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json',  'Access-Control-Allow-Origin':'http://localhost'},
    body: JSON.stringify({ uid: userId })
    }).then(res => {  return res.json() })
      .then((res) => {
        setCharacters(res.character.avatars)
        setUserInfo(res.user)
        setStats(res.profile)
        setWorldExp(res.profile.world_explorations)
        console.log(res)
      }
    )
    .then(()=>setIsLoading(false))
  }

  useEffect(() => {
    getData();
  }, [userId])

return (
<> 
  {/* {userId.length === 0 ? <UidForm></UidForm> : */}
    <>
    {isLoading ? <LoadingPage> 
    </LoadingPage> : <>
    <Canvas style={{backgroundColor:colorSet[currentElement],height:"100vh",position:'relative',zIndex:"0"}}>
    <OrbitControls />
    <Stars radius={200} depth={50} count={10000} factor={8} saturation={80} fade speed={5} />
    <Cloud opacity={0.2} speed={0.4} width={100} depth={1.5} segments={250}  />
    <Sparkles speed={1} color={ParticleColorSet[currentElement]} count={10000} noise={50} size={5} scale={50} />
    <ambientLight intensity={0.5}/>
    <spotLight position={[10, 15, 10]} angle={0.3}/>
    
  </Canvas>
  <SideBar />
  <MainFrame/>
  </>}
    </>
    {/* } */}
</>
  )
}

export default App

//코드정리부터합시다

