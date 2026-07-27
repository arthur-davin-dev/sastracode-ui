import React from 'react'
import Card from './card'
import Navbar from './Navbar'
import Hero from './home/Hero'
import ProjectsSection from './home/ProjectsSection'
import Footer from '../layout/Footer'

export default function Playground() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Card />
      <ProjectsSection />
    </div>
  )
}