import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import toast from "react-hot-toast";
import CollectionProcess from "./CollectionProcess";

const Home = () => {
  const [cart, setCart] = useState([]);
  const [selectedZone, setSelectedZone] = useState(null);
  const navigate = useNavigate();

  const products = {
  kholisha1stCut: [
    { id: 1, name: "খলিশা  'র' (১ম কাট, প্রাকৃতিক, সুন্দরবন)", name1: "৫০০ গ্রাম", images: ["/images/bon1.jpg"], price: 1200 },
    { id: 2, name: "খলিশা  'র' (১ম কাট, প্রাকৃতিক, সুন্দরবন)", name1: "১ কেজি", images: ["/images/bon1.jpg"], price: 2300 },
  ],
  kholishaRegular: [
    { id: 3, name: "খলিশা 'র' (প্রাকৃতিক, সুন্দরবন)", name1: "২৫০ গ্রাম", images: ["/images/honey2.webp"], price: 550 },
    { id: 4, name: "খলিশা 'র' (প্রাকৃতিক, সুন্দরবন)", name1: "৫০০ গ্রাম", images: ["/images/honey2.webp"], price: 1100 },
    { id: 5, name: "খলিশা 'র' (প্রাকৃতিক, সুন্দরবন)", name1: "১ কেজি", images: ["/images/honey2.webp"], price: 2100 },
  ],
  
  /*
  bainKeora: [
    { id: 6, name: "বাইন কেওরা মিশ্র (প্রাকৃতিক, সুন্দরবন)", name1: "২৫০ গ্রাম", images: ["/images/mishro.jpg"], price: 350 },
    { id: 7, name: "বাইন কেওরা মিশ্র (প্রাকৃতিক, সুন্দরবন)", name1: "৫০০ গ্রাম", images: ["/images/mishro.jpg"], price: 700 },
    { id: 8, name: "বাইন কেওরা মিশ্র (প্রাকৃতিক, সুন্দরবন)", name1: "১ কেজি", images: ["/images/mishro.jpg"], price: 1400 },
  ],
  */
};


  const deliveryRates = {
    insideDhaka: { 1: 80, 2: 100, 3: 120, 4: 140, 5: 160 },
    outsideDhaka: { 1: 150, 2: 200, 3: 230, 4: 260, 5: 290 },
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
    toast.success("আপনার প্রোডাক্ট কার্টে যোগ হয়েছে, নিচে স্ক্রল করুন");
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

  const getWeightInGrams = (name1) => {
    if (name1.includes("২৫০")) return 250;
    if (name1.includes("৫০০")) return 500;
    if (name1.includes("১ কেজি")) return 1000;
    return 0;
  };

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalWeightInGrams = cart.reduce(
    (total, item) => total + getWeightInGrams(item.name1) * item.quantity,
    0
  );
  const totalWeightInKg = Math.ceil(totalWeightInGrams / 1000);

  const calculateDeliveryCharge = () => {
    if (!selectedZone) return 0;
    if (totalWeightInKg > 5) {
      return selectedZone === "insideDhaka" ? 200 : 400;
    }
    return deliveryRates[selectedZone][totalWeightInKg] || 0;
  };

  const deliveryCharge = calculateDeliveryCharge();
  const totalAmount = subtotal + deliveryCharge;

  const handleZoneChange = (e) => {
    setSelectedZone(e.target.value);
  };

  const ProductCard = ({ item }) => (
    <article className="bg-white flex flex-col items-center shadow-md rounded-lg p-4 w-full">
      <img src={item.images[0]} alt={item.name} className="w-full h-40 md:h-52 object-cover rounded-md" />
      <h3 className="text-lg font-semibold mt-2 text-center">{item.name}</h3>
      <h3 className="text-lg font-semibold mt-1 text-center">{item.name1}</h3>
      <p className="text-gray-600 text-center">মূল্য: {item.price}৳</p>
      <button
        onClick={() => addToCart(item)}
        className="mt-2 bg-blue-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition"
      >
        কিনুন
      </button>
    </article>
  );

  return (
    <>
      <div className="bg-green-500 text-center flex flex-col items-center">
        আমাদের যেকোনো পণ্য অর্ডার করতে কল বা WhatsApp করুন
        <div className="flex items-center text-2xl hover:text-blue-700">
          <FaWhatsapp />
          <a href="http://wa.me/8801321102838" target="_blank" rel="noopener noreferrer" className="ml-2">
            01321 102838
          </a>
        </div>
      </div>

      <div className="relative w-full h-[400px] overflow-hidden">
        <img
          src="/images/bon.jpg"
          alt="Bonmodhu Cover"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold">বন মধু</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        <h2 className="text-4xl font-bold text-center mb-4">আমাদের সংগ্রহ</h2>

        <h3 className="text-xl font-semibold mt-6 mb-2">১. খলিশা “র” (১ম কাট, প্রাকৃতিক, সুন্দরবন)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 place-items-center">
          {products.kholisha1stCut.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-2">২. খলিশা “র” (প্রাকৃতিক, সুন্দরবন)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 place-items-center">
          {products.kholishaRegular.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>

       

        {/* Cart Section */}
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-bold">🛒 আপনার কার্ট</h2>
          {cart.length > 0 ? (
            <>
              <ul className="mt-2 space-y-2">
                {cart.map((item) => (
                  <li key={item.id} className="flex justify-between items-center p-2 bg-white shadow-sm rounded-md">
                    <span>{item.name}</span>
                    <div className="flex items-center gap-4 font-semibold">
                      <span>{item.price}৳</span>
                      <div className="flex items-center">
                        <button onClick={() => decreaseQuantity(item.id)} className="bg-cyan-400 hover:bg-red-500 text-white px-2 py-1 rounded-full transition">➖</button>
                        <span className="mx-2">{item.quantity}</span>
                        <button onClick={() => increaseQuantity(item.id)} className="bg-cyan-400 hover:bg-red-500 text-white px-2 py-1 rounded-full transition">➕</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">📦 ডেলিভারি অপশন</h3>
                <p className="text-sm text-gray-600 mb-2">মোট ওজন: {totalWeightInKg} কেজি</p>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="insideDhaka"
                      checked={selectedZone === "insideDhaka"}
                      onChange={handleZoneChange}
                    />
                    ঢাকার ভিতরে - {totalWeightInKg > 5 ? 200 : deliveryRates.insideDhaka[totalWeightInKg] || 80}৳
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="outsideDhaka"
                      checked={selectedZone === "outsideDhaka"}
                      onChange={handleZoneChange}
                    />
                    ঢাকার বাইরে - {totalWeightInKg > 5 ? 400 : deliveryRates.outsideDhaka[totalWeightInKg] || 150}৳
                  </label>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{subtotal}৳</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charge:</span>
                  <span>{deliveryCharge}৳</span>
                </div>
                <div className="flex justify-between font-bold text-xl text-blue-600 mt-2">
                  <span>সর্বমোট:</span>
                  <span>{totalAmount}৳</span>
                </div>
              </div>

              <button
                onClick={() => navigate("/checkout", { state: { cart, totalAmount, deliveryCharge, selectedZone } })}
                disabled={!selectedZone}
                className={`mt-4 px-6 py-2 rounded-md w-full text-lg ${selectedZone ? "bg-green-500 hover:bg-green-600 text-white" : "bg-gray-400 text-gray-700 cursor-not-allowed"}`}
              >
                ✅ কনফার্ম অর্ডার
              </button>
            </>
          ) : (
            <p className="text-gray-500 mt-2">আপনার কার্ট খালি!</p>
          )}
        </div>

        <div className="space-y-5 text-[22px] mt-6">
          <h3 className="text-[25px] font-semibold">আমাদের সাথে যোগাযোগ করুন</h3>
          <p>মোবাইল ঃ 01321 102838</p>
          <p>ইমেইল ঃ Bonmodhubd@gmail.com</p>
        </div>

        <CollectionProcess />
      </div>
    </>
  );
};

export default Home;
