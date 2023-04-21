import React from 'react'
import ResponsiveAppBar from '../../Components/Navbar/Navbar'
import NestedGrid from '../../Components/Grid/Grid'
// import VideoCall from '../../Components/Videocall/Videocall'
import VApp from '../../Components/Videocall/Videocall'
const Home = () => {
  return (
    <div>
        <ResponsiveAppBar/>
        {/* <VApp/> */}
        <NestedGrid/>


    </div>
  )
}

export default Home