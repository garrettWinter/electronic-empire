import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Modal from '../components/Modal';
import Image from 'next/image';

interface Order {
    orderId: number;
    orderDate: string;
    orderTotal: number;
    lineItem: OrderLineItem[];
    // Add other relevant fields that match the API response
}

interface Product {
    productName: string;
    productImage: string;
    productPrice: number;
    // Add other product fields as needed
}

interface OrderLineItem {
    orderLineItemId: number;
    qty: number;
    linePrice: number;
    product: Product;
}

const OrderHistory: React.FC = () => {
    const { data: session, status } = useSession();
    const [orders, setOrders] = useState<Order[]>([]); // Use the Order type for state
    const loading = status === "loading";
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const handleViewOrder = (order: Order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

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
            <div className="flex flex-wrap gap-4">
            {orders.map((order: Order) => {
    const orderTotal = Number(order.orderTotal);
    return (
        <div key={order.orderId} className="flex-1 min-w-[300px]">
            <p>Order ID: {order.orderId}</p>
            <p>Date: {new Date(order.orderDate).toLocaleDateString()}</p>
            <p>Total: ${!isNaN(orderTotal) ? orderTotal.toFixed(2) : '0.00'}</p>
            <button onClick={() => {handleViewOrder(order)}}>
                View Order
            </button>
        </div>
    );
})}
<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
    {selectedOrder ? (
        <div>
            <h3>Order ID: {selectedOrder.orderId}</h3>
            <p>Date Ordered: {new Date(selectedOrder.orderDate).toLocaleDateString()}</p>

            {selectedOrder.lineItem && selectedOrder.lineItem.map(lineItem => (
                <div key={lineItem.orderLineItemId}>
                    <Image src={lineItem.product.productImage} alt={lineItem.product.productName} width={100} height={100} />
                    <p>Product: {lineItem.product.productName}</p>
                    <p>Quantity: {lineItem.qty}</p>
                    <p>Price: ${Number(lineItem.product.productPrice).toFixed(2)}</p>
                    <p>Line Total: ${Number(lineItem.linePrice).toFixed(2)}</p>
                </div>
            ))}

<p>Order Total: ${!isNaN(selectedOrder.orderTotal) ? Number(selectedOrder.orderTotal).toFixed(2) : '0.00'}</p>

        </div>
    ) : (
        <p>No order selected</p>
    )}
</Modal>
          </div>
        </div>
    );
};

export default OrderHistory;
