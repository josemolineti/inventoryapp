import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './styles/App.css'
import FornecedorRoutes from './router/supplierRouter';
import Home from './pages/home/index';
import Login from './pages/login/index'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
          {/*fiz as rotas principais que o professor passou no quadro*/}
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/home' element={<Home />}/>
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
