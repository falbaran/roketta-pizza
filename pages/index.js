
import React, { useState } from "react";

const pizzas = [
  { id: 1, name: "Margherita", price: 8 },
  { id: 2, name: "Pepperoni", price: 10 },
  { id: 3, name: "4 Fromages", price: 11 },
];

const availableSlots = [
  "12:00", "12:15", "12:30", "12:45",
  "13:00", "13:15", "13:30", "13:45",
  "19:00", "19:15", "19:30", "19:45",
];

export default function Home() {
  const [cart, setCart] = useState([]);
  const [slot, setSlot] = useState("");

  const addToCart = (pizza) => {
    setCart([...cart, pizza]);
  };

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const handlePayment = () => {
    if (!slot) return alert("Veuillez sélectionner un créneau.");
    alert(`Commande validée ! Total: €${total}, créneau: ${slot}`);
    setCart([]);
    setSlot("");
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Commandez votre pizza 🍕</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {pizzas.map((pizza) => (
          <div key={pizza.id} className="border rounded p-4">
            <h2 className="text-lg font-semibold">{pizza.name}</h2>
            <p className="text-sm">Prix : €{pizza.price}</p>
            <button
              className="mt-2 px-4 py-1 bg-blue-500 text-white rounded"
              onClick={() => addToCart(pizza)}
            >
              Ajouter
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">🛒 Panier</h2>
        {cart.length === 0 ? (
          <p>Votre panier est vide.</p>
        ) : (
          <ul className="list-disc list-inside">
            {cart.map((item, index) => (
              <li key={index}>{item.name} - €{item.price}</li>
            ))}
          </ul>
        )}
        <p className="mt-2 font-bold">Total : €{total}</p>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">🕒 Choisissez un créneau</h2>
        <select
          className="border p-2 rounded mt-2 w-full"
          value={slot}
          onChange={(e) => setSlot(e.target.value)}
        >
          <option value="">-- Sélectionner un créneau --</option>
          {availableSlots.map((s, i) => (
            <option key={i} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <button
        className="mt-6 w-full bg-green-600 text-white py-2 rounded"
        onClick={handlePayment}
      >
        Payer
      </button>
    </div>
  );
}
