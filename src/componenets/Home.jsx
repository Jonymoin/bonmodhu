import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [cart, setCart] = useState([]);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const navigate = useNavigate();

  const products = {
    sundarbans: [
      { id: 1, name: "খলিশা ফুলের মধু", images: ["/images/honey1.jpg"], price: 1200 },
      { id: 2, name: "মিশ্র ফুলের মধু", images: ["/images/honey2.webp"], price: 1200 },
    ],
    ghurs: [
      { id: 3, name: "খেজুরের ঝোলা গুড়", images: ["/images/honey3.jpg"], price: 1500 },
      { id: 4, name: "খেজুরের পাটালি গুড়", images: ["/images/honey4.jpg"], price: 1600 },
      { id: 5, name: " খেজুরের চকোলেট গুড়", images: ["/images/honey5.png"], price: 1600 },
    ],
  };

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalAmount = subtotal + deliveryCharge;

  const handleDeliverySelection = (charge, option) => {
    setDeliveryCharge(charge);
    setSelectedDelivery(option);
  };

  return (
   <>
    <div className="flex flex-col items-center justify-center h-[400px] w-full bg-cover bg-center">
        <img 
          src="/images/bee.jpg" 
          alt="bee" 
          loading="lazy" 
          className="absolute inset-0 w-full h-[400px] object-cover"
        />

        {/* Hero Text */}
        <h1 className="uppercase text-6xl md:leading-[120px] text-white font-extrabold md:tracking-[10px] md:text-[120px] font-abril text-center z-10">
        বনমধু
        </h1>
      </div>
    <div className="max-w-6xl mx-auto p-4">
     
      <h1 className="text-center text-4xl"></h1>
      <h2 className="text-4xl font-bold text-center mb-4">আমাদের সংগ্রহ</h2>

      <h3 className="text-xl font-semibold mt-6 mb-2">🌿 সুন্দরবনের মধু</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.sundarbans.map((item) => (
          <article key={item.id} className="bg-white flex flex-col items-center shadow-md rounded-lg p-4">
            <img src={item.images[0]} alt={item.name} className="w-full h-40 object-cover rounded-md" />
            <h3 className="text-lg font-semibold mt-2 text-center">{item.name}</h3>
            <p className="text-gray-600 text-center">মূল্য: {item.price}৳</p>
            <button
              onClick={() => addToCart(item)}
              className="mt-2 bg-blue-500  hover:bg-gray-600 text-white px-4 py-2 rounded-md transition"
            >
              কিনুন
            </button>
          </article>
        ))}
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-2">🐝 গুড় সংগ্রহ (শীঘ্রই আসছে অগ্রিম অর্ডার করতে  যোগাযোগ করুন
      )</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.ghurs.map((item) => (
          <article key={item.id} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
            <img src={item.images[0]} alt={item.name} className="w-full h-40 object-cover rounded-md" />
            <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
            <p className="text-gray-600">মূল্য: {item.price}৳</p>
            <button
              onClick={() => addToCart(item)}
              className="mt-2 bg-red-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
            >
              অগ্রিম অর্ডার করুন
            </button>
          </article>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-bold">🛒 আপনার কার্ট</h2>
        {cart.length > 0 ? (
          <>
            <ul className="mt-2 space-y-2">
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between items-center p-2 bg-white shadow-sm rounded-md">
                  <span>{item.name}</span>
                  <div className="flex items-center gap-4">
                    <span>{item.price}৳</span>
                    <div className="flex items-center">
                      <button onClick={() => decreaseQuantity(item.id)} className="bg-gray-300 px-2 py-1 rounded-md">
                        ➖
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button onClick={() => increaseQuantity(item.id)} className="bg-gray-300 px-2 py-1 rounded-md">
                        ➕
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-4">
              <label className="block text-lg font-semibold mb-1">📦 ডেলিভারি অপশন</label>
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    onChange={() => handleDeliverySelection(70, "ঢাকার ভিতরে")}
                    checked={selectedDelivery === "ঢাকার ভিতরে"}
                  />
                  ঢাকার ভিতরে - ৭০৳
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    onChange={() => handleDeliverySelection(150, "ঢাকার বাইরে")}
                    checked={selectedDelivery === "ঢাকার বাইরে"}
                  />
                  ঢাকার বাইরে - ১৫০৳
                </label>
              </div>
            </div>

            <div className="mt-4 font-semibold text-lg">মোট: {subtotal}৳</div>
            <div className="mt-2 font-bold text-xl text-blue-600">সর্বমোট: {totalAmount}৳</div>

            <button
              onClick={() => navigate("/checkout", { 
                state: { cart, totalAmount, deliveryCharge, selectedDelivery } 
              })}
              disabled={!selectedDelivery}
              className={`mt-4 px-6 py-2 rounded-md w-full text-lg ${
                selectedDelivery ? "bg-green-500 hover:bg-green-600 text-white" : "bg-gray-400 text-gray-700 cursor-not-allowed"
              }`}
            >
              ✅ কনফার্ম অর্ডার
            </button>
          </>
        ) : (
          <p className="text-gray-500 mt-2">আপনার কার্ট খালি!</p>
        )}
      </div>
    </div>
   </>
  );
};

export default Home;
