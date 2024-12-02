import React from 'react'
import MainSection from '../components/MainSection'
import LogoSlider from '../components/LogoSlider'
import Features from '../components/Features'
import SocialShare from '../components/SocialShare'

function Home({title}) {
  return (
    <>
        <MainSection title={title} />
        <LogoSlider />
        <Features />
        <SocialShare />
    </>
  )
}

export default Home