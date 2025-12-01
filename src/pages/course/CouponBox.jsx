import React, { useEffect, useState } from "react";

export default function CouponBox({ price, setNumericPrice, defaultCoupon }) {
  const [couponCode, setCouponCode] = useState(defaultCoupon || "");
  const [discountMessage, setDiscountMessage] = useState("");

  const applyCoupon = () => {
    if (couponCode === "GECBanka") {
      const discountedPrice = Math.max(price - 200, 1);  // example ₹200 off
      setNumericPrice(discountedPrice);
      setDiscountMessage("Coupon applied successfully! ₹200 discount added.");
    } else {
      setDiscountMessage("Invalid coupon code");
    }
  };

  // Apply automatically if default coupon exists
  useEffect(() => {
    if (defaultCoupon) applyCoupon();
  }, [defaultCoupon]);

  return (
    <div className="mt-4 flex flex-col sm:flex-row items-center gap-2">
      <input
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
        className="border px-3 py-2 rounded-md w-full sm:w-auto"
        placeholder="Enter Coupon Code"
      />
      <button
        onClick={applyCoupon}
        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
      >
        Apply
      </button>
      {discountMessage && (
        <p className="text-sm text-emerald-600">{discountMessage}</p>
      )}
    </div>
  );
}
