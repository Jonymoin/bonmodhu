import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Checkout = () => {
  const form = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  const { cart, totalAmount, deliveryCharge, selectedDelivery } = location.state || {
    cart: [],
    totalAmount: 0,
    deliveryCharge: 0,
    selectedDelivery: "",
  };

  const [successMessage, setSuccessMessage] = useState("");

  const sendOrderToGoogleSheet = async (e) => {
    e.preventDefault();

    const formattedProducts = cart.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price * item.quantity,
    }));

    // Use URLSearchParams instead of JSON
    const formData = new URLSearchParams();
    formData.append("name", form.current.name.value);
    formData.append("phone", form.current.phone.value);
    formData.append("address", form.current.address.value);
    formData.append("delivery", selectedDelivery);
    formData.append("totalAmount", totalAmount);
    formData.append("products", JSON.stringify(formattedProducts));

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycby0DqVjexJqE3SrBPEzX38iv_qUAZHdGGwxoN68-S1Dn_5U8K4hARUOnmlKCmZOEfCR/exec",
        {
          method: "POST",
          body: formData,
        }
      );

      window.alert("✅ অর্ডারটি নিশ্চিত করা হয়েছে!");

      setSuccessMessage("✅ অর্ডার সফলভাবে প্লেস হয়েছে!");
      form.current.reset();
      setTimeout(() => setSuccessMessage(""), 3000);
      navigate("/");
    } catch (error) {
      console.error("Google Sheet Error:", error);
      alert("❌ ডেটা পাঠাতে সমস্যা হয়েছে!");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">📦 Checkout</h2>

      {successMessage && (
        <div className="bg-green-500 text-white p-3 rounded-md text-center mb-3">
          {successMessage}
        </div>
      )}

      <form ref={form} onSubmit={sendOrderToGoogleSheet} className="space-y-4">
        <input type="text" name="name" placeholder="নাম*" required className="w-full p-2 border rounded-md" />
        <input type="tel" name="phone" placeholder="মোবাইল নম্বর*" required className="w-full p-2 border rounded-md" />
        <textarea name="address" placeholder="ঠিকানা*" required className="w-full p-2 border rounded-md"></textarea>

        <div className="font-bold text-xl text-green-600">সর্বমোট: {totalAmount}৳</div>

        <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md text-lg">
          ✅ অর্ডার নিশ্চিত করুন
        </button>
      </form>
    </div>
  );
};

export default Checkout;
