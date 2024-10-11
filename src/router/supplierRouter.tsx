import ListarFornecedores from '../pages/supplier/supplierList/SupplierList';
import { Route, Routes } from 'react-router-dom';

function SupplierRoutes() {
    return (
        <>  
            <Routes>
                <Route path='/' element={<ListarFornecedores />} /> {/*essa vai ser a rota padrão dos fornecedores, (/fornecedores) que vai pra pagina de listar*/}
                <Route path='/fornecedores/adicionar' /> {/*subrota que vai pra pagina adicionar (falta criar ainda) */}
            </Routes>
        </>
    )
}

export default SupplierRoutes;