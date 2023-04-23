import React from 'react'
import ResponsiveAppBar from '../../Components/Navbar/Navbar'
import NestedGrid from '../../Components/Grid/Grid'
// import VideoCall from '../../Components/Videocall/Videocall'
import VApp from '../../Components/Videocall/Videocall'
const Home = () => {
  const [accessToken, setAccessToken] = React.useState(null);

  return (
    <div>
        <ResponsiveAppBar setAccessToken={setAccessToken}/>
        {/* <VApp/> */}
        <NestedGrid accessToken={accessToken}/>


    </div>
  )
}

export default Home