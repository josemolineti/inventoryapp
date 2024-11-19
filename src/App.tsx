import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FornecedorRoutes from './router/supplierRouter';
import Home from './pages/home/index';
import Login from './pages/login/index'
import Register from './pages/register/index';
import ChangePassword from './pages/changePassword';
import CustomerRoutes from './router/customerRouter';
import ProductRoutes from './router/productRouter';
import Reports from './pages/reports';
import { AuthProvider } from './context/AuthContext';
import { SupplierProvider } from './context/ISupplierContext';
import OrderRouter from './router/ordersRouter';

function App() {

  return (
    <>
      <AuthProvider>
        <SupplierProvider>
          <Router>
            {/*fiz as rotas principais que o professor passou no quadro*/}
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/registrar' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/alterar-senha' element={<ChangePassword />} />
              <Route path='/home' element={<Home />} />
              <Route path='/login' />
              <Route path='/registrar' />
              {/*aqui embaixo eu fiz a rota principal dos fornecedores, que vai pro controlador onde vai redirecionar pras subrotas no arquivo FornecedorRoutes */}
              {/*fazer essa mesms estrutura pras outras paginas */}
              <Route path='/fornecedores/*' element={<FornecedorRoutes />} />
              <Route path='/pedidos/*' element={<OrderRouter/>}/>
              <Route path='/clientes/*' element={<CustomerRoutes />} />
              <Route path='/produtos/*' element={<ProductRoutes />} />
              <Route path='/relatorios' element={<Reports />} />
              <Route path='/transacoes' />
              <Route path='/users' />

            </Routes>
          </Router>
        </SupplierProvider>
      </AuthProvider>
    </>
  )
}

export default App
