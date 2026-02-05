import React, { useState, useEffect } from 'react';

export default function OverView() {
  // State for Market Indices (Nifty, Sensex, etc.)
  const [marketData, setMarketData] = useState([]);
  // State for Equity Sectors (SIXB, SIXC, etc.)
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch data
  const fetchData = async () => {
    try {
      

      const mockMarket = [
        { name: 'Nifty 50', value: '25694.50', change: '+28.75', percent: '+0.11%' },
        { name: 'Sensex', value: '78234.10', change: '+112.40', percent: '+0.15%' },
        { name: 'Nifty Bank', value: '52340.20', change: '-45.10', percent: '-0.08%' },
        { name: 'Nifty IT', value: '38120.00', change: '+320.15', percent: '+0.85%' },
        { name: 'S&P BSE', value: '31245.90', change: '+12.00', percent: '+0.04%' },
      ];

      const mockSectors = [
        { symbol: 'SIXB', price: '1034.29' },
        { symbol: 'SIXC', price: '1120.45' },
        { symbol: 'SIXE', price: '980.12' },
        { symbol: 'SIXI', price: '1045.60' },
        { symbol: 'SIXM', price: '1200.30' },
        { symbol: 'SIXR', price: '890.45' },
        { symbol: 'SIXRE', price: '1034.29' },
      ];

      setMarketData(mockMarket);
      setSectors(mockSectors);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching market data:", error);
      // It's also a good practice to handle the error state in the UI
      // setError(error); 
      setLoading(false); // Ensure loading is set to false even on error
    }
  };

  useEffect(() => {
    fetchData();
    // Set up polling to refresh data every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval); // Cleanup on unmount
  }, []); // Empty dependency array ensures this effect runs once on mount

  if (loading) return <div className="text-white p-10">Loading Market Data...</div>;

  return (
    <section className='bg-black flex p-4'>
        
      
      {/* Left Sidebar: Equity Sectors */}
      <div className='w-2/12 h-screen flex flex-col gap-12  p-2 border-r border-gray-800'>
        <h1 className='text-blue-400 text-2xl font-bold mb-4'>Equity Sectors</h1>
        {sectors.map((sector, index) => (
          <div key={index} className='flex justify-between border-b border-gray-900 pb-1'>
            <h1 className='text-gray-400 text-lg'>{sector.symbol}</h1>
            <p className='text-white text-lg'>{sector.price}</p>
          </div>
        ))}
      </div>

      {/* Main Content: Indices and News */}
      <div className='w-7/12 flex flex-col p-2'> 
        <div className='flex gap-4 justify-center font-bold pb-6'>
          {marketData.map((item, index) => (
            // Added unique key prop for list items to avoid console warnings
            <div key={index} className='min-w-36 h-36 rounded-2xl bg-gray-800 flex flex-col justify-center items-center p-4 hover:bg-gray-700 transition-colors'>
              <h1 className='text-gray-400 text-sm uppercase'>{item.name}</h1>
              <h2 className='text-white text-xl font-bold'>{item.value}</h2>
              <div className='flex flex-col items-center'>
                <h3 className='text-gray-400 text-xs'>{item.change}</h3>
                <h2 className={item.percent.includes('+') ? 'text-green-500' : 'text-red-500'}>
                  {item.percent}
                </h2>
              </div>
            </div>
          ))}
        </div>
             
        <div className='flex flex-col gap-8 text-center'>
          <h1 className='text-white text-2xl font-extrabold'>Indian Market Summary</h1>
          
          <article className='w-full'>
            <h2 className='text-blue-400 text-2xl font-semibold mb-2'>Persistent Foreign Fund Outflows</h2>
            <p className='text-gray-300 text-md leading-relaxed'>
              Foreign Institutional Investors (FIIs) have continued to be net sellers in the Indian equity markets...
            </p>
          </article>

          <article className='w-full'>
            <h2 className='text-blue-400 text-2xl font-semibold mb-2'>IT and Banking Stocks Lead Market Gains</h2>
            <p className='text-gray-300 text-md leading-relaxed'>
              The Indian equity market saw mixed activity, but certain key sectors performed well. Strong Q3 earnings 
              reports from major IT firms and select private banks, such as Infosys and SBI, boosted their market 
              capitalisations, driving selective positive momentum in an otherwise flat broader market this past week.
            </p>
          </article>
          <article className='w-full'>
            <h2 className='text-blue-400 text-2xl font-semibold mb-2'>IT and PSU Bank Stocks Rally</h2>
            <p className='text-gray-300 text-md leading-relaxed'>
              Indian equity benchmarks showed resilience... led by firms like Infosys, TCS, and HCLTech.
            </p>
          </article>
          <article className='w-full'>
            <h2 className='text-blue-400 text-2xl font-semibold mb-2'>Strong Economic Projections Amid Global Headwinds</h2>
            <p className='text-gray-300 text-md leading-relaxed'>
              Despite global trade uncertainties and foreign institutional investor (FII) outflows, the Indian economy exhibits resilience, with growth forecasts of around 7% for the upcoming fiscal year.
            </p>
          </article>
          <article className='w-full'>
            <h2 className='text-blue-400 text-2xl font-semibold mb-2'>Real Estate Sector Anticipates Continued Strong Growth</h2>
            <p className='text-gray-300 text-md leading-relaxed'>
              India's real estate market is poised for significant growth, supported by steady residential demand and robust commercial real estate momentum.
            </p>
          </article>


        </div>
      </div>

      {/* Right Sidebar: Research */}
      <div className='w-3/12 h-screen p-4 bg-gray-900/30 rounded-xl'>
        <h1 className='text-blue-400 text-2xl font-bold mb-4'>Research & Insights</h1> 
        <div className='bg-blue-900/20 p-4 rounded-lg border border-blue-800/30'>
          <p className='text-gray-300 text-md leading-loose'>
            <span className='text-yellow-500 font-bold'>Status:</span> Market Closed (Sunday, Jan 18, 2026).<br/><br/>
            The Indian markets finished slightly higher on Jan 16, primarily driven by strong Q3 earnings.
          </p>
        </div>
      </div>
        
    </section>
  );
}
