import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface Order {
    orderId: number;
    orderDate: string;
    orderTotal: number;
    // Add other relevant fields that match your API response
}

const OrderHistory = () => {
    const { data: session, status } = useSession();
    const [orders, setOrders] = useState<Order[]>([]); // Use the Order type for state
    const loading = status === "loading";

    useEffect(() => {
        if (session) {
            const fetchOrders = async () => {
                const response = await fetch('/api/getUserOrders');
                if (!response.ok) {
                    // Handle errors
                    return;
                }
                const data = await response.json();
                setOrders(data);
            };

            fetchOrders();
        }
    }, [session]);

    if (loading) return <div>Loading...</div>;
    if (!session) return <div>You must be logged in to view this page.</div>;

    return (
        <div>
            <h2>Your Order History</h2>
            {orders.map((order: Order) => {
    const orderTotal = Number(order.orderTotal);
    return (
        <div key={order.orderId}>
            <p>Order ID: {order.orderId}</p>
            <p>Date: {new Date(order.orderDate).toLocaleDateString()}</p>
            <p>Total: ${!isNaN(orderTotal) ? orderTotal.toFixed(2) : '0.00'}</p>
            <button onClick={() => {/* logic to view order details */}}>
                View Order
            </button>
        </div>
    );
})}



        </div>
    );
};

export default OrderHistory;
