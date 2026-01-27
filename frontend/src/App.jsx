import { Routes , Route} from 'react-router-dom'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
const App = () => {
  return (   
    <main className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
    <div>
      <NavBar className="fixed top-0 left-0"/>

    </div>
    <div className='py-30'>
    <Routes>
      <Route path='/' element={<HomePage />} />

    </Routes>

  

    </div>
    </main>

  )
}

export default App
