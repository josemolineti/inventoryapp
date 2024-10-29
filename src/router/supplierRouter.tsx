import SupplierEdit from '@/pages/supplier/supplierEdit';
import SupplierList from '../pages/supplier/supplierList';
import { Route, Routes } from 'react-router-dom';

function SupplierRoutes() {
    return (
        <Routes>
            <Route path='/' element={<SupplierList />} /> 
            <Route path='editar' element={<SupplierEdit />} />
        </Routes>
    );
}

export default SupplierRoutes;
