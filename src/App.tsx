import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './styles/App.css'
import { Button } from './components/ui/button'
import FornecedorRoutes from './routes/FornecedorRoutes';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
          {/*fiz as rotas principais que o professor passou no quadro*/}
        <Routes>
          <Route path='/'/>
          <Route path='/login' />
          <Route path='/registrar'/>
          {/*aqui embaixo eu fiz a rota principal dos fornecedores, que vai pro controlador onde vai redirecionar pras subrotas no arquivo FornecedorRoutes */}
          {/*fazer essa mesms estrutura pras outras paginas */}
          <Route path='/fornecedores' element={<FornecedorRoutes />}/> 
          <Route path='/pedidos'/>
          <Route path='/clientes'/>
          <Route path='/produtos'/>
          <Route path='/pedidos'/>
          <Route path='/transacoes'/>
          <Route path='/users'/>
          
        </Routes>
      </Router>
    </>
  )
}

export default App
