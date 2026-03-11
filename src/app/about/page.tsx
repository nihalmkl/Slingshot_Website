'use client'
import React from 'react'
import dynamic from 'next/dynamic';
const AboutSection = dynamic(() => import('@/components/about/AboutSection'), { 
  ssr: false,
  loading: () => <div className="min-h-screen bg-[#020202]">Loading...</div> 
});
const page = () => {
  return (
    <AboutSection/>
  )
}

export default page