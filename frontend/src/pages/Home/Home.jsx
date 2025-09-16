import React, { useState } from 'react'
import './Home.css'
import Header from '../../componantes/Header/Header'
import ExploreMenu from '../../componantes/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../componantes/FoodDisplay/Fooddisplay'
import AppDownload from '../../componantes/AppDownload/AppDownload'

const Home = () => {
  const [category, setCategory] = useState("All")
  return (
    <div>
      <Header/>
      <ExploreMenu category = {category} setCategory = {setCategory}/>
      <FoodDisplay category = {category}/>
      <AppDownload />
    </div>
  )
}

export default Home
