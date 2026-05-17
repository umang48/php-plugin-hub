import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { PluginDetail } from './pages/PluginDetail'

export default function App() {
  // We use BrowserRouter here to enable React Router routing across the application.
  // The Routes component acts as a switch, rendering the first matching Route.
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plugin/:id" element={<PluginDetail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
