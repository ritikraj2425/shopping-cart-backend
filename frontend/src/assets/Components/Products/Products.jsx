import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Products({ products = [] }) {
  const [data, setData] = useState(products);
  const navigate = useNavigate();

  const filterItem = (cat) => {
    if (cat === 'category') {
      setData(products);
    } else {
      const updatedList = products.filter((item) => item.category === cat);
      setData(updatedList);
    }
  };

  const sortItems = (cart) => {
    if (cart === 100) {
      const updatedL = products.filter((item) => item.price <= cart);
      setData(updatedL);
    } else if (cart === 101) {
      const updatedL = products.filter((item) => item.price > cart);
      setData(updatedL);
    }
  };


  const isLoggedIn = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return !!user; 
  };

  const handleCart = (product) => {
    if (!isLoggedIn()) {

      navigate('/login');
    } else {

      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const updatedCart = [...cart, { ...product, quantity: 1 }];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      toast.success('Item added to cart');
    }
  };

  return (
    <>
      <div className="buttons text-center py-5">
        <button className="btn btn-outline-dark btn-sm m-2 bg-black text-white p-2 hover:bg-gray-700" onClick={() => sortItems(100)}>
          Price Range (Rs. 1 - Rs. 100)
        </button>
        <button className="btn btn-outline-dark btn-sm m-2 bg-black text-white p-2 hover:bg-gray-700" onClick={() => sortItems(101)}>
          Price Range (Rs. 101 - Rs. 1000)
        </button>
        <button className="btn btn-outline-dark btn-sm m-2 bg-black text-white p-2 hover:bg-gray-700" onClick={() => filterItem("men's clothing")}>
          Men's Clothing
        </button>
        <button className="btn btn-outline-dark btn-sm m-2 bg-black text-white p-2 hover:bg-gray-700" onClick={() => filterItem("women's clothing")}>
          Women's Clothing
        </button>
        <button className="btn btn-outline-dark btn-sm m-2 bg-black text-white p-2 hover:bg-gray-700" onClick={() => filterItem('jewelery')}>
          Jewelery
        </button>
        <button className="btn btn-outline-dark btn-sm m-2 bg-black text-white p-2 hover:bg-gray-700" onClick={() => filterItem('electronics')}>
          Electronics
        </button>
        <button className="btn btn-outline-dark btn-sm m-2 bg-black text-white p-2 hover:bg-gray-700" onClick={() => setData(products)}>
          All
        </button>
      </div>

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {data.map((product) => {
              const { id, title, price, category, image } = product;
              return (
                <Link to={`/products/${id}`} className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer mb-4" key={id}>
                  <div className="block relative h-48 rounded overflow-hidden">
                    <img alt={title} className="object-contain object-center w-full h-full block" src={image} />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 uppercase">{category}</h3>
                    <h2 className="text-gray-900  title-font text-lg  font-medium">{title.split(' ').slice(0, 4).join(' ')}</h2>
                    <div className="mt-12 flex-col align-middle">
                      <p className="mb-2">${price}</p>
                      <button
                        className="ml-auto text-white bg-black border-0 py-1 px-1 focus:outline-none hover:bg-white hover:text-black rounded"
                        onClick={() => handleCart(product)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default Products;
