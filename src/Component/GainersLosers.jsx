import React, { useState, useEffect } from "react";

const COINS = [
  "bitcoin",
  "ethereum",
  "solana",
  "dogecoin",
  "ripple",
  "cardano",
  "polkadot",
  "litecoin",
];

const REFRESH_MS = 30000;

const GainersLosers = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [dark, setDark] = useState(false);

  /* ---------------- FETCH ---------------- */

  const fetchData = async () => {
    try {
      const url =
        `https://api.coingecko.com/api/v3/coins/markets` +
        `?vs_currency=usd` +
        `&ids=${COINS.join(",")}` +
        `&sparkline=true` +
        `&price_change_percentage=24h`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("Network error");

      const result = await res.json();

      processData(result);
      setError(null);
    } catch {
      setError("Failed to fetch market data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, REFRESH_MS);
    return () => clearInterval(interval);
  }, []);

  /* ---------------- PROCESS ---------------- */

  const processData = (coins) => {
    const formatted = coins.map((c) => ({
      id: c.id,
      symbol: c.symbol.toUpperCase(),
      price: c.current_price,
      change: c.price_change_percentage_24h || 0,
      spark: c.sparkline_in_7d.price,
      sentiment: c.price_change_percentage_24h >= 0 ? "Bullish" : "Bearish",
    }));

    const sorted = formatted.sort((a, b) => b.change - a.change);

    const top3 = sorted.slice(0, 3);
    const bottom3 = sorted.slice(-3);

    setData([...top3, ...bottom3]);
  };

  /* ---------------- FAVORITES ---------------- */

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  /* ---------------- SPARKLINE ---------------- */

  const Sparkline = ({ points }) => {
    const width = 80;
    const height = 30;

    const min = Math.min(...points);
    const max = Math.max(...points);

    const path = points
      .map((p, i) => {
        const x = (i / (points.length - 1)) * width;
        const y = height - ((p - min) / (max - min)) * height;
        return `${i === 0 ? "M" : "L"}${x},${y}`;
      })
      .join(" ");

    return (
      <svg width={width} height={height}>
        <path d={path} fill="none" strokeWidth="2" />
      </svg>
    );
  };

  /* ---------------- FILTER ---------------- */

  const filtered = data.filter((c) =>
    c.symbol.toLowerCase().includes(search.toLowerCase())
  );

  /* ---------------- UI ---------------- */

  if (loading)
    return <div className="p-4 text-gray-500">Loading market data...</div>;

  if (error)
    return <div className="p-4 text-red-500 font-bold">{error}</div>;

  return (
    <div
      className={`p-6 rounded-xl shadow-lg max-w-4xl mx-auto mt-8 transition ${
        dark ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Crypto Gainers & Losers</h2>

        <button
          onClick={() => setDark(!dark)}
          className="px-3 py-1 border rounded"
        >
          {dark ? "☀ Light" : "🌙 Dark"}
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search coin..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full p-2 border rounded text-black"
      />

      <p className="text-xs mb-3 opacity-60">
        Auto refresh: every 30 seconds
      </p>

      {/* Table */}
      <table className="w-200 h-100 text-sm border-collapse">
        <thead>
          <tr className="border-b">
            <th>⭐</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>Change %</th>
            <th>Trend</th>
            <th>Sentiment</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((coin) => (
            <tr key={coin.id} className="border-b hover:bg-gray-100 dark:hover:bg-gray-800">
              <td
                className="cursor-pointer text-lg"
                onClick={() => toggleFavorite(coin.id)}
              >
                {favorites.includes(coin.id) ? "⭐" : "☆"}
              </td>

              <td className="font-mono font-bold">{coin.symbol}</td>

              <td>${coin.price.toLocaleString()}</td>

              <td
                className={
                  coin.change >= 0 ? "text-green-600 font-semibold" : "text-red-600 font-semibold"
                }
              >
                {coin.change > 0 ? "+" : ""}
                {coin.change.toFixed(2)}%
              </td>

              <td>
                <Sparkline points={coin.spark} />
              </td>

              <td>
                {coin.sentiment === "Bullish" ? "📈 Bullish" : "📉 Bearish"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GainersLosers;
