import CustomerEdit from '@/pages/customer/customerEdit/index';
import CustomerList from '@/pages/customer/customerList/index';
import { Route, Routes } from 'react-router-dom';

function CustomerRoutes() {
    return (
        <Routes>
            <Route path='/' element={<CustomerList />} /> 
            <Route path='editar' element={<CustomerEdit />} />
        </Routes>
    );
}

export default CustomerRoutes;
