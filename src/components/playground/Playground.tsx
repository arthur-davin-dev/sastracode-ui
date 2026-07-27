import React from 'react'
import Card from './card'
import Navbar from './Navbar'
import Hero from './Hero'
import ProjectsSection from './ProjectsSection'
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