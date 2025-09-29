import React from 'react'
import Navigation from './components/Navigation'
import Header from './components/Header'
import Job from './pages/Job'
import Candidates from './pages/Candidates'
import Rigester from './pages/Rigester'
import {  Route, Routes } from 'react-router-dom'
import JobDetailsPage from './components/Job/JobDetails'

function App() {
  return (
    <>
    <Header />
    {/* <BrowserRouter> */}
    <Routes>
      <Route Component={Job} path='/' />
      <Route Component={Candidates} path='/candidates' />
      <Route Component={Rigester} path='/rigester' />
      <Route Component={JobDetailsPage} path='/job/:id' />
    </Routes>
    {/* </BrowserRouter> */}
    {/* <Job />
    <Candidates />
    <Rigester /> */}
    <Navigation />
    </>
  )
}

export default App