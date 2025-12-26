import React, { createContext, useContext, useState } from 'react';
import { CartItem } from './CartContext';

export type OrderStatus = 'Placed' | 'Preparing' | 'Ready' | 'Completed';

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: OrderStatus;
};

type OrderContextType = {
  orders: Order[];
  addOrder: (items: CartItem[], total: number) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  const addOrder = (items: CartItem[], total: number) => {
    const newOrder: Order = {
      id: `ORD-${Math.floor(Math.random() * 10000)}`,
      items,
      total,
      date: new Date().toLocaleDateString(),
      status: 'Placed',
    };
    setOrders(prev => [newOrder, ...prev]);

    // Simulate order progression
    setTimeout(() => updateOrderStatus(newOrder.id, 'Preparing'), 5000);
    setTimeout(() => updateOrderStatus(newOrder.id, 'Ready'), 15000);
  };

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}
