import React, { useState, useEffect } from 'react';

// Utility component to hide scrollbars just for this view if needed
const ScrollbarHideStyle = () => (
  <style jsx global>{`
    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }
    .scrollbar-hide {
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
    }
  `}</style>
);


export default function SearchCoins() {
  const [trendingCoins, setTrendingCoins] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 1. Fetch Trending Tickers (Header bar)
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch('https://api.coinranking.com/v2/coins/trending ');
        const data = await res.json();
        // Ensure data is valid before mapping
        if (data && Array.isArray(data.coins)) {
          setTrendingCoins(data.coins.slice(0, 5).map(c => c.item));
        }
      } catch (err) {
        console.error("Trending fetch error:", err);
      }
    };
    fetchTrending();
  }, []);

  // 2. Main View: Search or Top 50 Coins
  const handleMarketView = async (query) => {
    setIsLoading(true);
    try {
      if (!query.trim()) {
        // DEFAULT VIEW: Fetch top 18 coins by market cap (Returns an Array)
        const res = await fetch(
          'https://api.coinranking.com/v2/coins/trending'
        );
        const data = await res.json();
        // CRITICAL FIX: Ensure we only set the state to an array
        setSearchResults(Array.isArray(data) ? data : []); 
      } else {
        // SEARCH VIEW: Fetch specific coins (Returns an Object { coins: [...] })
        const res = await fetch(`https://api.coingecko.com/api/v3/search?query=${query}`);
        const data = await res.json();
        
        // CRITICAL FIX: Extract the 'coins' array from the object structure
        setSearchResults(data.coins || []); 
      }
    } catch (err) {
      console.error("Data fetch error:", err);
      setSearchResults([]); // Reset to empty array on error
    } finally {
      setIsLoading(false);
    }
  };

  // Debounce logic
  useEffect(() => {
    const timeOutId = setTimeout(() => handleMarketView(searchQuery), 500);
    return () => clearTimeout(timeOutId);
  }, [searchQuery]);

  return (
    <section className="font-sans  w-full p-10 text-white">
      <ScrollbarHideStyle />
      
      <div className='mb-6'>
        <h1 className='text-3xl font-bold mb-2 '>Explore the Market</h1>
        <p className='text-[#616e88]'>Discover new assets, track live market trends, and manage your portfolio.</p>
      </div>
      
      <hr className='border-[#616e88] mb-8' />

      <div className="mb-8">
        <input 
          type="text" 
          placeholder='Search coins (e.g. Bitcoin, Solana)...' 
          className="w-full max-w-md p-3 border font-bold bg-[#232f48] text-white rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none border-none placeholder-gray-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className='flex items-center gap-4 mb-10 flex-wrap'>
        <h4 className="font-bold text-xl text-blue-400">Trending Search:</h4>
        <div className="flex gap-2">
          {trendingCoins.map((coin) => (
            <span key={coin.id} className='px-3 py-1 bg-[#232f48] border border-gray-700 rounded-full text-xs font-medium uppercase'>
              {coin.symbol}
            </span>
          ))}
        </div>
      </div>

      <div className='w-full min-h-100'>
        <h3 className="text-xl font-bold mb-6 text-gray-400">
          {searchQuery ? `Results for "${searchQuery}"` : "Top Market Rankings"}
        </h3>
        
        {isLoading ? (
          <div className="flex justify-center py-20 text-gray-500">Loading market data...</div>
        ) : (
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
            {/* Safety check before mapping: ensure searchResults is an array */}
            {Array.isArray(searchResults) && searchResults.length > 0 ? (
              searchResults.map((coin) => (
                <div key={coin.id} className='group p-4 rounded-2xl hover:bg-[#2d3a5a] transition-all bg-[#232f48] flex flex-col items-center justify-center text-center gap-2 border border-transparent hover:border-blue-500/50'>
                  {/* Use dynamic image sources */}
                  <img src={coin.large || coin.image || coin.thumb} alt={coin.name} className="w-12 h-12 rounded-full mb-2" />
                  <div>
                    <p className="font-bold text-white leading-tight uppercase">{coin.symbol}</p>
                    <p className="text-xs text-gray-400 truncate w-24">{coin.name}</p>
                  </div>
                  <div className="mt-2 text-[10px] font-bold px-2 py-1 bg-blue-900/40 text-blue-300 rounded">
                    Rank #{coin.market_cap_rank || 'N/A'}
                  </div>
                  {/* Show price if it's available (only from the market endpoint) */}
                  {coin.current_price && (
                    <p className="text-xs font-mono text-green-400 mt-1">${coin.current_price.toLocaleString()}</p>
                  )}
                </div>
              ))
            ) : (
                <div className='col-span-full py-10 text-center text-gray-500'>
                    {searchQuery ? `No results found for "${searchQuery}"` : 'No market data available.'}
                </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
