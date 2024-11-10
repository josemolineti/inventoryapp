import OrdersList from '@/pages/orders/ordersList/index';
import OrdersEdit from '@/pages/orders/ordersEdit/index';
import { Route, Routes } from 'react-router-dom';

function OrderRouter() {
    return (
        <Routes>
            <Route path='/' element={<OrdersList />} /> 
            <Route path='editar' element={<OrdersEdit />} />
        </Routes>
    );
}

export default OrderRouter;
