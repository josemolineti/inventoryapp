import OrdersList from '@/pages/orders/ordersList/index';
import OrdersEdit from '@/pages/orders/ordersEdit/index';
import OrdersView from '@/pages/orders/ordersView/index';
import { Route, Routes } from 'react-router-dom';

function OrderRouter() {
    return (
        <Routes>
            <Route path='/' element={<OrdersList />} /> 
            <Route path='editar' element={<OrdersEdit />} />
            <Route path='visualizar' element={<OrdersView />} />
        </Routes>
    );
}

export default OrderRouter;
