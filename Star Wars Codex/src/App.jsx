import './App.css'
import { Footer } from './Components/Footer'
import { Main } from './Pages/Main'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'


function App() {

  const queryClient = new QueryClient

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Main />
        <Footer/>
      </QueryClientProvider>
    </>
  )
}

export default App
