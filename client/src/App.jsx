import React from 'react'
import { BrowserRouter as Router, Route, Routes, RouterProvider } from 'react-router-dom'
import Home from './routes/Home/Home'
import About from './routes/About/ABout'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Books from './routes/Books/Books'
import SingleBook from './routes/Books/SingleBook'
import CreateBook from './routes/Books/CreateBook'
import EditBook from './routes/Books/EditBook'

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />}/>
        <Route path='/books' element={<Books />}/>
        <Route path='/book/:slug' element={<SingleBook />} />
        <Route  path='/createbook' element={<CreateBook />} />
        <Route path='/editbook/:slug' element={<EditBook />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
