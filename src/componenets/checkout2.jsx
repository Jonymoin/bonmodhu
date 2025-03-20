import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";

const Checkout2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { cart, totalAmount, deliveryCharge, selectedDelivery } = location.state || { cart: [], totalAmount: 0, deliveryCharge: 0, selectedDelivery: "" };

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendOrderEmail = () => {
    const orderDetails = cart.map(
      (item) => `${item.name} - Qty: ${item.quantity} - Price: ${item.price * item.quantity}৳`
    ).join("\n");

    const emailData = {
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      delivery: selectedDelivery,
      totalAmount: `${totalAmount}৳`,
      products: orderDetails,
    };
    console.log("🛒 Sending Email with Data:", emailData);

    emailjs
      .send(
        "service_ti6ynfg", // তোমার EmailJS Service ID
        "template_hy57f6e", // তোমার EmailJS Template ID
        emailData,
        "ezDe8-nMFjkYWr-87" // তোমার EmailJS Public Key
      )
      .then(
        (response) => {
          console.log("Email Sent:", response);
          alert("✅ অর্ডার সফলভাবে প্লেস হয়েছে!");
          navigate("/");
        },
        (error) => {
          console.error("Email Failed:", error);
          alert("❌ ইমেইল পাঠাতে ব্যর্থ হয়েছে!");
        }
      );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendOrderEmail();
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">📦 Checkout</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">নাম</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block font-semibold">মোবাইল নম্বর</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block font-semibold">ঠিকানা</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          ></textarea>
        </div>

        <h3 className="text-lg font-semibold">🛒 আপনার অর্ডার:</h3>
        <ul className="bg-gray-100 p-3 rounded-md">
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span>{item.name} (x{item.quantity})</span>
              <span>{item.price * item.quantity}৳</span>
            </li>
          ))}
        </ul>

        <div className="font-bold text-lg">
          ডেলিভারি চার্জ: {deliveryCharge}৳  
        </div>
        <div className="font-bold text-xl text-green-600">
          সর্বমোট: {totalAmount}৳
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md text-lg"
        >
          ✅ অর্ডার নিশ্চিত করুন
        </button>
      </form>
    </div>
  );
};

export default Checkout2;
