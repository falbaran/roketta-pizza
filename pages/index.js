
import React, { useState } from "react";
import WeeklySlotPicker from "../components/WeeklySlotPicker";

const pizzas = [
  { id: 1, name: "Margherita", price: 8 },
  { id: 2, name: "Pepperoni", price: 10 },
  { id: 3, name: "4 Fromages", price: 11 },
];

export default function Home() {
  const [cart, setCart] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const addToCart = (pizza) => {
    setCart([...cart, pizza]);
  };

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const handlePayment = () => {
    if (!selectedSlot) return alert("Veuillez sélectionner un créneau.");
    alert(`Commande validée ! Total: €${total}, créneau: ${selectedSlot.date} à ${selectedSlot.time}`);
    setCart([]);
    setSelectedSlot(null);
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

      <WeeklySlotPicker
        selectedSlot={selectedSlot}
        setSelectedSlot={setSelectedSlot}
      />

      <button
        className="mt-6 w-full bg-green-600 text-white py-2 rounded"
        onClick={handlePayment}
      >
        Payer
      </button>
    </div>
  );
}
