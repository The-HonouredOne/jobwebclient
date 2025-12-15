// import { Route } from 'react-router-dom'

import { Route, Routes } from 'react-router'
import './App.css'
import Home from './pages/Home'
import NewsPage from './pages/NewsPage'
import JobDetails from './pages/JobDetails'
import AllJobs from './pages/AllJobs'
import AllNews from './pages/AllNews'
import NewsDetails from './pages/NewsDetails'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import CreateJob from './pages/CreateJob'
import CreateNews from './pages/CreateNews'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { AuthProvider } from './context/AuthContext'

function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
        <Route path='/admin/create-job' element={<CreateJob />} />
        <Route path='/admin/create-news' element={<CreateNews />} />
        <Route path='/*' element={
          <>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/jobs' element={<AllJobs />} />
              <Route path='/news' element={<AllNews />} />
              <Route path='/news/:id' element={<NewsDetails />} />
              <Route path='/job/:id' element={<JobDetails />} />
            </Routes>
            <Footer />
          </>
        } />
      </Routes>
    </AuthProvider>
  )
}

export default App
