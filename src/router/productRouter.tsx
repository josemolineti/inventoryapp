import ProductList from '@/pages/product/productList/index';
import ProductEdit from '../pages/product/productEdit/index';
import { Route, Routes } from 'react-router-dom';

function CustomerRoutes() {
    return (
        <Routes>
            <Route path='/' element={<ProductList />} /> 
            <Route path='editar' element={<ProductEdit />} />
        </Routes>
    );
}

export default CustomerRoutes;
