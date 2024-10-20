import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FornecedorRoutes from './router/supplierRouter';
import Home from './pages/home/index';
import Login from './pages/login/index'
import Register from './pages/register/index';

function App() {

  return (
    <>
      <Router>
        {/*fiz as rotas principais que o professor passou no quadro*/}
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/registrar' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/login' />
          <Route path='/registrar' />
          {/*aqui embaixo eu fiz a rota principal dos fornecedores, que vai pro controlador onde vai redirecionar pras subrotas no arquivo FornecedorRoutes */}
          {/*fazer essa mesms estrutura pras outras paginas */}
          <Route path='/fornecedores' element={<FornecedorRoutes />} />
          <Route path='/pedidos' />
          <Route path='/clientes' />
          <Route path='/produtos' />
          <Route path='/pedidos' />
          <Route path='/transacoes' />
          <Route path='/users' />

        </Routes>
      </Router>
    </>
  )
}

export default App
