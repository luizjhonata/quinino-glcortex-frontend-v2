import { ToastContainer } from 'react-toastify'
import './App.css'
import Header from './components/Header'
import MainPage from './components/MainPage'

function App() {

  return (
    <div className="App">
      <ToastContainer />
      <Header />
      <MainPage />
    </div>
  )
}

export default App
