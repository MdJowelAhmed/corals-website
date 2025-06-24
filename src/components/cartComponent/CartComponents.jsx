"use client";
import React, { useState } from "react";
import { Minus, Plus, Edit3, Trash2, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Container from "../share/Container";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "CS Purple Hornets Zenithids",
      description:
        "Extra color, bring the food and everything, We recommend a spelling level of 2 meals. Spicy delivery Res Hams...",
      price: 99,
      quantity: 1,
      image: "/assets/category1.png",
    },
    {
      id: 2,
      name: "CS Purple Hornets Zenithids",
      description:
        "Extra color, bring the food and everything, We recommend a spelling level of 2 meals. Spicy delivery Res Hams...",
      price: 99,
      quantity: 1,
      image: "/assets/category4.png",
    },
  ]);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("8am-9pm");
  const [deliveryType, setDeliveryType] = useState("Standard Delivery");
  const [comments, setComments] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [orderNumber, setOrderNumber] = useState("");

  // Calendar setup with dynamic month/year
  const currentDate = new Date();
  const [calendarMonth, setCalendarMonth] = useState(currentDate.getMonth());
  const [calendarYear, setCalendarYear] = useState(currentDate.getFullYear());

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentMonth = monthNames[calendarMonth];
  const currentYear = calendarYear.toString();

  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(calendarYear, calendarMonth, 1).getDay();

  const calendarDays = [];

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  // Navigation functions
  const goToPreviousMonth = () => {
    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear(calendarYear - 1);
    } else {
      setCalendarMonth(calendarMonth - 1);
    }
    setSelectedDate(null); // Reset selected date when changing month
  };

  const goToNextMonth = () => {
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear(calendarYear + 1);
    } else {
      setCalendarMonth(calendarMonth + 1);
    }
    setSelectedDate(null); // Reset selected date when changing month
  };

  const updateQuantity = (id, change) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = 50;
  const deliveryCharge = subtotal >= 1000 ? 0 : 10; // Free delivery if subtotal >= 1000
  const total = subtotal - discount + deliveryCharge;

  // Progress bar calculation
  const freeDeliveryThreshold = 1000;
  const progressPercentage = Math.min(
    (subtotal / freeDeliveryThreshold) * 100,
    100
  );
  const remainingAmount = Math.max(freeDeliveryThreshold - subtotal, 0);

  return (
    <Container className="  text-white p-4 lg:p-8  mx-auto">
      <div className="">
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-6 lg:mb-8 lg:col-span-12">
          <div>
            <Image
              src="/assets/image 10.png"
              width={105}
              height={105}
              alt="Logo"
            />
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-medium">
            Your Stash
          </h1>
          <div className="w-6 h-6 lg:hidden"></div>
        </div>

        <div className="">
          {/* Left Column - Cart and Delivery */}
          <div className="lg:col-span-12 space-y-6 lg:space-y-8">
            {/* Cart Items */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium lg:text-xl">Your Order</h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="space-y-3">
                    <div className="flex items-start justify-between space-x-3 lg:space-x-4 rounded-lg p-3 lg:p-4">
                      {/* Image on the left side */}
                      <div>
                        <img
                          src={item.image}
                          alt={item.name}
                          height={80}
                          width={80}
                          className="rounded-full"
                        />
                      </div>

                      {/* Content on the right side */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          {/* Title */}
                          <h3 className="font-medium text-sm lg:text-base mb-1">
                            {item.name}
                          </h3>
                          {/* Description */}
                          <p className="text-xs lg:text-sm text-gray-400 mb-2">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-10 items-center mt-2">
                        <div className="flex items-center space-x-2">
                          {/* Quantity controls */}
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-6 h-6 lg:w-8 lg:h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
                          >
                            <Minus size={12} className="lg:w-4 lg:h-4" />
                          </button>
                          <span className="text-sm lg:text-base min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-6 h-6 lg:w-8 lg:h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
                          >
                            <Plus size={12} className="lg:w-4 lg:h-4" />
                          </button>
                        </div>

                        <div className="flex items-center space-x-2 lg:space-x-3">
                          {/* Price - now shows total for this item */}
                          <span className="font-medium lg:text-lg">
                            ${item.price * item.quantity}
                          </span>

                          {/* Edit button */}
                          <button className="text-gray-400 hover:text-white transition-colors">
                            <Edit3 size={14} className="lg:w-5 lg:h-5" />
                          </button>

                          {/* Delete button */}
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={14} className="lg:w-5 lg:h-5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Progress bar for each product */}
                    {/* <div className="ml-20 mr-4">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Progress to Free Delivery</span>
                        <span>${item.price * item.quantity} / $1000</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${Math.min(
                              ((item.price * item.quantity) /
                                freeDeliveryThreshold) *
                                100,
                              100
                            )}%`,
                          }}
                        ></div>
                      </div>
                      {item.price * item.quantity >= freeDeliveryThreshold ? (
                        <p className="text-xs text-green-400 mt-1">
                          🎉 Free delivery unlocked for this item!
                        </p>
                      ) : (
                        <p className="text-xs text-gray-400 mt-1">
                          Add $
                          {freeDeliveryThreshold - item.price * item.quantity}{" "}
                          more for free delivery
                        </p>
                      )}
                    </div> */}
                  </div>
                ))}
              </div>
            </div>

            {/* Overall Progress Bar */}
            <div className="">
              <div className="flex justify-between items-center mb-3">
                {/* <h3 className="text-lg font-medium">Free Delivery Progress</h3> */}
                {/* <span className="text-sm text-gray-400">
                  ${subtotal} / $1000
                </span> */}
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
                <div
                  className="bg-white h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              {subtotal >= freeDeliveryThreshold ? (
                <p className="text-green-400 text-sm font-medium">
                  🎉 Congratulations! You've qualified for free delivery!
                </p>
              ) : (
                <p className="text-gray-400 text-sm">
                  Spend AED ${remainingAmount} more and get free shipping! (Free
                  shipping is from AED 1000).
                </p>
              )}
            </div>

            {/* Promo Code */}
            <div>
              <h2 className="text-lg font-medium lg:text-xl mb-4">
                Promo Code
              </h2>
              <div className="flex space-x-6 w-1/2">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1  rounded-lg border-gray-600 border px-3 py-2 lg:px-4 lg:py-3 text-sm lg:text-base text-gray-400 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button className="border  text-white px-4 py-2 lg:px-6 lg:py-3 rounded-lg font-medium transition-colors">
                  Apply Promo Code
                </button>
              </div>
            </div>

            {/* Delivery Options */}
            <div className="flex gap-20 justify-between w-full">
              <div className="w-3/5">
                <h2 className="text-lg font-medium lg:text-xl mb-4">
                  Delivery Options
                </h2>
                <div className="space-y-4">
                  <div className="space-y-6 mb-8">
                    {/* Radio Buttons */}
                    <label className="flex items-center space-x-3 border border-gray-600 rounded-lg p-3 lg:p-4 cursor-pointer hover:bg-gray-800 transition-colors">
                      <input
                        type="radio"
                        name="delivery"
                        value="Standard Delivery"
                        checked={deliveryType === "Standard Delivery"}
                        onChange={(e) => setDeliveryType(e.target.value)}
                        className="text-orange-500 w-4 h-4 lg:w-5 lg:h-5"
                      />
                      <span className="text-sm lg:text-base">
                        Standard Delivery{" "}
                        {subtotal >= freeDeliveryThreshold
                          ? "(FREE)"
                          : `(AED ${deliveryCharge})`}
                      </span>
                    </label>

                    <label className="flex items-center space-x-3 border border-gray-600 rounded-lg p-3 lg:p-4 cursor-pointer hover:bg-gray-800 transition-colors">
                      <input
                        type="radio"
                        name="delivery"
                        value="Free Delivery"
                        checked={deliveryType === "Free Delivery"}
                        onChange={(e) => setDeliveryType(e.target.value)}
                        className="text-orange-500 w-4 h-4 lg:w-5 lg:h-5"
                        disabled={subtotal < freeDeliveryThreshold}
                      />
                      <span
                        className={`text-sm lg:text-base ${
                          subtotal < freeDeliveryThreshold
                            ? "text-gray-500"
                            : ""
                        }`}
                      >
                        Free Delivery{" "}
                        {subtotal < freeDeliveryThreshold
                          ? "(Minimum AED 1000 required)"
                          : "(Qualified!)"}
                      </span>
                    </label>

                    <label className="flex items-center space-x-3 border border-gray-600 rounded-lg p-3 lg:p-4 cursor-pointer hover:bg-gray-800 transition-colors">
                      <input
                        type="radio"
                        name="delivery"
                        value="Add To Previous Order"
                        checked={deliveryType === "Add To Previous Order"}
                        onChange={(e) => setDeliveryType(e.target.value)}
                        className="text-orange-500 w-4 h-4 lg:w-5 lg:h-5"
                      />
                      <span className="text-sm lg:text-base">
                        Add To Previous Order
                      </span>
                    </label>

                    {/* Order Number Input */}
                    <div className="">
                      <label
                        htmlFor="orderNumber"
                        className="text-sm lg:text-base text-gray-400"
                      >
                        Enter Previous Order Number:
                      </label>
                      <input
                        type="text"
                        id="orderNumber"
                        value={orderNumber}
                        onChange={(e) => setOrderNumber(e.target.value)}
                        className="w-full mt-2 border border-gray-600 bg-gray-800 text-white rounded-lg p-3 lg:p-4 text-sm lg:text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Enter your previous order number"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Calendar */}
              <div className="w-2/5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium lg:text-xl">
                    Select Delivery Date
                  </h3>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={goToPreviousMonth}
                      className="text-gray-400 hover:text-white transition-colors p-1"
                    >
                      ←
                    </button>
                    <span className="text-sm lg:text-base text-gray-400 min-w-[120px] text-center">
                      {currentMonth} {currentYear}
                    </span>
                    <button
                      onClick={goToNextMonth}
                      className="text-gray-400 hover:text-white transition-colors p-1"
                    >
                      →
                    </button>
                  </div>
                </div>

                <div className="rounded-lg p-4 lg:p-0">
                  <div className="grid grid-cols-7 gap-1 lg:gap-2 mb-4">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                      (day) => (
                        <div
                          key={day}
                          className="text-center text-xs lg:text-lg font-bold py-2"
                        >
                          {day}
                        </div>
                      )
                    )}

                    {calendarDays.map((day, index) => (
                      <button
                        key={index}
                        onClick={() => day && setSelectedDate(day)}
                        className={`h-8 lg:h-10 text-xs lg:text-sm rounded border-2 font-bold transition-colors ${
                          day
                            ? day === selectedDate
                              ? "bg-white text-black"
                              : "text-white hover:bg-gray-700 border-gray-600"
                            : "invisible" // makes unavailable days invisible
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>

                  {/* Time Selection */}
                  <div>
                    <h2 className="text-sm lg:text-base font-medium mb-2">
                      Select Delivery Time
                    </h2>
                    <div className="flex items-center justify-between gap-6">
                      <button
                        onClick={() => setSelectedTime("8am-9pm")}
                        className={`px-3 py-2 lg:px-4 lg:py-3 w-1/2 rounded-lg text-sm lg:text-base transition-colors ${
                          selectedTime === "8am-9pm"
                            ? "bg-white text-black"
                            : "border border-gray-600 text-white hover:bg-gray-600"
                        }`}
                      >
                        8am-9pm
                      </button>
                      <button
                        onClick={() => setSelectedTime("9am-10pm")}
                        className={`px-3 py-2 lg:px-4 w-1/2 lg:py-3 rounded-lg text-sm lg:text-base transition-colors ${
                          selectedTime === "9am-10pm"
                            ? "bg-white text-black"
                            : "border border-gray-600 text-white hover:bg-gray-600"
                        }`}
                      >
                        9am-10pm
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* My Information */}
            <div>
              <h3 className="text-lg font-medium lg:text-xl mb-4">
                My Information
              </h3>
              <div className="border border-gray-600 rounded-lg p-4 lg:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 text-sm lg:text-base text-gray-400">
                  <div>
                    <span className="text-white font-medium">
                      Delivery Address:
                    </span>
                    <br />
                    Street Lane 4 at Duhwon Korangi, Sector Karachi 8239
                  </div>
                  <div>
                    <span className="text-white font-medium">
                      Phone Number:
                    </span>
                    <br />
                    +920000000000
                  </div>
                  <div>
                    <span className="text-white font-medium">Email:</span>
                    <br />
                    contact@email.com
                  </div>
                  <div>
                    <span className="text-white font-medium">
                      Time Location:
                    </span>
                    <br />
                    {deliveryType === "Add To Previous Order"
                      ? "Previous Order Instructions"
                      : "Current Order Instructions"}
                  </div>
                  <div>
                    <span className="text-white font-medium">
                      Previous OrderId:
                    </span>
                    <br />
                    {orderNumber ? orderNumber : "No previous order selected"}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 lg:mt-0">
              <div className="flex gap-10 justify-between w-full">
                {/* Comments */}
                <div className="flex-1">
                  <h3 className="text-lg font-medium lg:text-xl mb-4">
                    Comments
                  </h3>
                  <div className="rounded-lg border border-gray-600 p-4 lg:p-6">
                    <textarea
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      placeholder="Write comment"
                      className="w-full h-32 lg:h-50 border border-gray-600  rounded-lg p-3 lg:p-4 text-sm lg:text-base text-white placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <button className="mt-4 border border-red-500 text-white px-4 py-2 lg:px-6 lg:py-3 rounded-lg text-sm lg:text-base w-full  transition-colors">
                      Submit With Order
                    </button>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="flex-1">
                  <h3 className="text-lg font-medium lg:text-xl mb-4">
                    Order Summary
                  </h3>
                  <div className="border border-gray-600 rounded-lg p-4 lg:p-6">
                    <div className="space-y-3 text-sm lg:text-base">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Quantity:</span>
                        <span className="text-white">
                          {cartItems.reduce(
                            (sum, item) => sum + item.quantity,
                            0
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Amount:</span>
                        <span className="text-white">AED {subtotal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Discount:</span>
                        <span className="text-green-400">-AED {discount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Delivery Charge:</span>
                        <span
                          className={`${
                            deliveryCharge === 0
                              ? "text-green-400"
                              : "text-white"
                          }`}
                        >
                          {deliveryCharge === 0
                            ? "FREE"
                            : `AED ${deliveryCharge}`}
                        </span>
                      </div>
                      <div className="border-t border-gray-700 pt-3">
                        <div className="flex justify-between text-lg lg:text-xl font-semibold">
                          <span className="text-white">Final Amount:</span>
                          <span className="text-orange-500">AED {total}</span>
                        </div>
                      </div>
                    </div>

                    {/* Checkout Button */}
                    <button className="w-full mt-9 border border-red-500 text-white py-3 lg:py-[10px] rounded-lg font-medium text-base lg:text-lg  transition-colors">
                      Proceed To Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CheckoutPage;
