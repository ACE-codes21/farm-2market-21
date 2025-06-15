
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product, CartItem, Order } from '@/types';
import { products as initialProducts } from '@/data/market';

interface AppContextType {
  products: Product[];
  orders: Order[];
  addProduct: (product: Omit<Product, 'id' | 'rating' | 'reviews'>) => void;
  editProduct: (productId: number, updatedProduct: Partial<Product>) => void;
  deleteProduct: (productId: number) => void;
  addOrder: (items: CartItem[]) => void;
  updateProductStock: (productId: number, quantityUsed: number) => void;
  cleanupExpiredProducts: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>([]);

  const cleanupExpiredProducts = () => {
    setProducts(prevProducts => 
      prevProducts.filter(product => {
        if (product.isFreshPick && product.freshPickExpiresAt) {
          return new Date(product.freshPickExpiresAt).getTime() > new Date().getTime();
        }
        return true;
      })
    );
  };

  // Auto-cleanup expired products every minute
  React.useEffect(() => {
    const interval = setInterval(cleanupExpiredProducts, 60000);
    return () => clearInterval(interval);
  }, []);

  const addProduct = (newProductData: Omit<Product, 'id' | 'rating' | 'reviews'>) => {
    setProducts(prevProducts => {
      const newProduct: Product = {
        ...newProductData,
        id: prevProducts.length > 0 ? Math.max(...prevProducts.map(p => p.id)) + 1 : 1,
        rating: 0,
        reviews: 0,
      };
      return [...prevProducts, newProduct];
    });
  };

  const editProduct = (productId: number, updatedProduct: Partial<Product>) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId
          ? { ...product, ...updatedProduct }
          : product
      )
    );
  };

  const deleteProduct = (productId: number) => {
    setProducts(prevProducts => 
      prevProducts.filter(product => product.id !== productId)
    );
  };

  const updateProductStock = (productId: number, quantityUsed: number) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId
          ? { ...product, stock: Math.max(0, product.stock - quantityUsed) }
          : product
      )
    );
  };

  const addOrder = (purchasedItems: CartItem[]) => {
    // Update stock for all purchased items
    purchasedItems.forEach(item => {
      updateProductStock(item.id, item.quantity);
    });

    // Create new order
    const newOrder: Order = {
      id: orders.length + 1,
      items: purchasedItems,
      total: purchasedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      date: new Date().toLocaleDateString(),
      status: 'confirmed'
    };

    setOrders(prevOrders => [...prevOrders, newOrder]);
  };

  const value: AppContextType = {
    products,
    orders,
    addProduct,
    editProduct,
    deleteProduct,
    addOrder,
    updateProductStock,
    cleanupExpiredProducts,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
