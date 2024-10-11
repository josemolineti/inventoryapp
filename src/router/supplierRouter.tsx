import SupplierList from '../pages/supplier/supplierList';
import { Route, Routes } from 'react-router-dom';

function SupplierRoutes() {
    return (
        <>  
            <Routes>
                <Route path='/' element={<SupplierList />} /> {/*essa vai ser a rota padrão dos fornecedores, (/fornecedores) que vai pra pagina de listar*/}
                <Route path='/fornecedores/adicionar' /> {/*subrota que vai pra pagina adicionar (falta criar ainda) */}
            </Routes>
        </>
    )
}

export default SupplierRoutes;