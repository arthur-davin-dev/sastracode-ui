import React from 'react'
import Card from './card'
import Navbar from '../layout/Navbar'
import Hero from './Hero'
import ProjectsSection from './ProjectsSection'

export default function Playground() {
  return (
    <div>
      <Hero />
      <Card />
      <ProjectsSection />
    </div>
  )
}