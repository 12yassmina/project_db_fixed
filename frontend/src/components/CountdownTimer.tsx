import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

export const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2030-06-11T00:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: "Days", value: timeLeft.days, color: "primary" },
    { label: "Hours", value: timeLeft.hours, color: "secondary" },
    { label: "Minutes", value: timeLeft.minutes, color: "accent" },
    { label: "Seconds", value: timeLeft.seconds, color: "primary" },
  ];

  return (
    <div className="text-center space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          Countdown to Morocco World Cup 2030
        </h2>
        <p className="text-muted-foreground">
          Time remaining until the greatest football event in Morocco's history
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
        {timeUnits.map((unit, index) => (
          <Card
            key={unit.label}
            className="p-4 md:p-6 bg-gradient-timer shadow-timer hover:shadow-gold transition-all duration-500 group relative overflow-hidden animate-pulse-glow"
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <div className="space-y-2 relative z-10">
              <div className="text-3xl md:text-4xl font-bold text-white group-hover:scale-110 transition-transform duration-500 drop-shadow-lg">
                {unit.value.toString().padStart(2, "0")}
              </div>
              <div className="text-sm md:text-base text-white/90 font-medium">
                {unit.label}
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-royal opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-lg" />
            <div className="absolute inset-0 animate-pulse-glow rounded-lg" />
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse text-sm text-muted-foreground">
        <span>⚽</span>
        <span>June 11, 2030 - Tournament Kicks Off</span>
        <span>⚽</span>
      </div>
    </div>
  );
};