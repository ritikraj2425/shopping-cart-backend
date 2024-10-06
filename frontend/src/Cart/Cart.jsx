import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      navigate('/login');
      return;
    }

    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, [navigate]);

  useEffect(() => {
    const totalAmount = cart.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
    setTotal(totalAmount);
  }, [cart]);

  const handleInc = (id) => {
    const updatedCart = cart.map(item => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleDec = (id) => {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleRemove = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  if (cart.length === 0) return <div className="container mx-auto py-10">Your cart is empty</div>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      <div className="flex flex-col space-y-4">
        {cart.map(item => (
          <div key={item.id} className="flex items-center justify-between border p-4">
            <img src={item.image} alt={item.title} className="w-16 h-16 object-contain" />
            <div className="flex-grow px-4">
              <h2 className="text-lg">{item.title}</h2>
              <p className="text-gray-500">${item.price}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={() => handleDec(item.id)} className="px-2 py-1 bg-gray-300">-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleInc(item.id)} className="px-2 py-1 bg-gray-300">+</button>
            </div>
            <button
              onClick={() => handleRemove(item.id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <h2 className="text-2xl">Total: ${total.toFixed(2)}</h2>
        <Link to="/checkout" className="bg-black text-white py-2 px-4 rounded mt-4 inline-block">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}

export default Cart;