
import React, { useState, useEffect } from "react";
import { format, addDays, startOfToday } from "date-fns";

const defaultSlots = [
  "12:00", "12:15", "12:30", "12:45",
  "13:00", "13:15", "13:30", "13:45",
  "19:00", "19:15", "19:30", "19:45",
];

export default function WeeklySlotPicker({ selectedSlot, setSelectedSlot }) {
  const [weekDays, setWeekDays] = useState([]);

  useEffect(() => {
    const today = startOfToday();
    const days = Array.from({ length: 7 }, (_, i) =>
      addDays(today, i)
    );
    setWeekDays(days);
  }, []);

  const isSlotSelected = (dateStr, time) =>
    selectedSlot?.date === dateStr && selectedSlot?.time === time;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">🗓️ Sélectionnez un créneau</h2>
      <div className="overflow-x-auto">
        <div className="grid grid-cols-7 gap-2 min-w-max">
          {weekDays.map((day, dayIdx) => {
            const dateStr = format(day, "yyyy-MM-dd");
            return (
              <div key={dayIdx} className="border p-2 rounded">
                <h3 className="text-sm font-bold text-center mb-1">
                  {format(day, "EEE dd/MM")}
                </h3>
                {defaultSlots.map((time, slotIdx) => {
                  const selected = isSlotSelected(dateStr, time);
                  return (
                    <button
                      key={slotIdx}
                      onClick={() => setSelectedSlot({ date: dateStr, time })}
                      className={`w-full text-sm py-1 rounded mb-1 ${selected ? "bg-green-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
