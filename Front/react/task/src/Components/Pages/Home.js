import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div><Link to={"/country"}>Countries</Link>
    <Link to={"/travel"}>Seyahetler</Link></div>
  )
}

export default Home