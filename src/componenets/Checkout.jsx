import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendOrderToGoogleSheet = async (e) => {
    e.preventDefault();

    if (isSubmitting) return; // Prevent double submission

    setIsSubmitting(true);

    const formattedProducts = cart.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price * item.quantity,
    }));

    const formData = new URLSearchParams();
    formData.append("name", form.current.name.value);
    formData.append("phone", form.current.phone.value);
    formData.append("address", form.current.address.value);
    formData.append("delivery", selectedDelivery);
    formData.append("totalAmount", totalAmount);
    formData.append("products", JSON.stringify(formattedProducts));

    const toastId = toast.loading("অর্ডার প্রসেস হচ্ছে...");

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycby0DqVjexJqE3SrBPEzX38iv_qUAZHdGGwxoN68-S1Dn_5U8K4hARUOnmlKCmZOEfCR/exec",
        {
          method: "POST",
          body: formData,
        }
      );

      toast.success("✅ অর্ডার সফলভাবে প্লেস হয়েছে!", { id: toastId });

      form.current.reset();
      navigate("/");
    } catch (error) {
      console.error("Google Sheet Error:", error);
      toast.error("❌ অর্ডার পাঠাতে সমস্যা হয়েছে!", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">📦 Checkout</h2>

      <form ref={form} onSubmit={sendOrderToGoogleSheet} className="space-y-4">
        <input type="text" name="name" placeholder="নাম*" required className="w-full p-2 border rounded-md" />
        <input type="tel" name="phone" placeholder="মোবাইল নম্বর*" required className="w-full p-2 border rounded-md" />
        <textarea name="address" placeholder="ঠিকানা*" required className="w-full p-2 border rounded-md"></textarea>

        <div className="font-bold text-xl text-green-600">সর্বমোট: {totalAmount}৳</div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full ${isSubmitting ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"} text-white py-2 rounded-md text-lg`}
        >
          {isSubmitting ? "⏳ অর্ডার হচ্ছে..." : "✅ অর্ডার নিশ্চিত করুন"}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
