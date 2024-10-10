import ListarFornecedores from '../pages/fornecedoresPages/listarFornecedores/ListarFornecedores';
import { Route, Routes } from 'react-router-dom';

function FornecedorRoutes() {
    return (
        <>  
            <Routes>
                <Route path='/' element={<ListarFornecedores />} /> {/*essa vai ser a rota padrão dos fornecedores, (/fornecedores) que vai pra pagina de listar*/}
                <Route path='/fornecedores/adicionar' /> {/*subrota que vai pra pagina adicionar (falta criar ainda) */}
            </Routes>
        </>
    )
}

export default FornecedorRoutes;