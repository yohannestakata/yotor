// providers/CartProvider.tsx
"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
};

type CartState = {
  items: CartItem[];
  total: number;
};

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { productId: string; size: string } }
  | {
      type: "UPDATE_QUANTITY";
      payload: { productId: string; size: string; quantity: number };
    }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartState };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

const initialState: CartState = {
  items: [],
  total: 0,
};

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  let newState: CartState;

  switch (action.type) {
    case "ADD_ITEM": {
      const existingItemIndex = state.items.findIndex(
        (item) =>
          item.productId === action.payload.productId &&
          item.size === action.payload.size,
      );

      if (existingItemIndex > -1) {
        const newItems = [...state.items];
        newItems[existingItemIndex].quantity += action.payload.quantity;
        newState = {
          ...state,
          items: newItems,
          total: calculateTotal(newItems),
        };
      } else {
        const newItems = [...state.items, action.payload];
        newState = {
          ...state,
          items: newItems,
          total: calculateTotal(newItems),
        };
      }
      break;
    }

    case "REMOVE_ITEM": {
      const newItems = state.items.filter(
        (item) =>
          !(
            item.productId === action.payload.productId &&
            item.size === action.payload.size
          ),
      );
      newState = {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
      };
      break;
    }

    case "UPDATE_QUANTITY": {
      const newItems = state.items.map((item) => {
        if (
          item.productId === action.payload.productId &&
          item.size === action.payload.size
        ) {
          return { ...item, quantity: action.payload.quantity };
        }
        return item;
      });
      newState = {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
      };
      break;
    }

    case "CLEAR_CART":
      newState = {
        items: [],
        total: 0,
      };
      break;

    case "LOAD_CART":
      newState = action.payload;
      break;

    default:
      return state;
  }

  // Save to localStorage after every change
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(newState));
  }

  return newState;
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on initial mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        dispatch({ type: "LOAD_CART", payload: JSON.parse(savedCart) });
      }
    }
  }, []);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
