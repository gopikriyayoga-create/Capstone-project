import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement, 
  LineElement,  
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2'; 

// Register the necessary components for a line chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function CoinPrice() {
  const [history, setHistory] = useState([]);
  const [timePeriod, setTimePeriod] = useState('24h');
  const [price, setPrice] = useState('0.00');

  const fetchData = async () => {
    const url = 'https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h' ;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '9169f7f7dfmsh0d1a1789c787069p17a0e5jsn7d1f6e0bb113', // Ensure your key is valid
        'x-rapidapi-host': 'coinranking1.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      
      if (result.status === 'success' && result.data?.history) {
        const reversedData = [...result.data.history].reverse();
        setHistory(reversedData);
        
        const latestPrice = parseFloat(reversedData[reversedData.length - 1].price);
        setPrice(latestPrice.toLocaleString(undefined, { minimumFractionDigits: 2 }));
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [timePeriod]);

  const chartData = {
    labels: history.map((item) => new Date(item.timestamp * 1000).toLocaleDateString()),
    datasets: [
      {
        label: 'Price in USD',
        data: history.map((item) => item.price),
        fill: true, // Optional: Fills the area under the line
        backgroundColor: 'rgba(59, 130, 246, 0.2)', // Area fill color
        borderColor: 'rgb(59, 130, 246)', // Line color
        borderWidth: 2,
        pointRadius: 0, // Hides individual data points
        tension: 0.4, // Smooths the line curve
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: true, text: `BTC Price History (${timePeriod})`, color: 'white' },
    },
    scales: {
      y: { 
        ticks: { color: 'white' }, 
        grid: { color: 'rgba(255,255,255,0.1)' } 
      },
      x: { 
        ticks: { color: 'white', maxRotation: 45, minRotation: 45 }, 
        grid: { display: false } 
      }
    }
  };

  const btnStyle = (period) => 
    `px-4 py-1 rounded-lg border transition-colors ${timePeriod === period ? 'bg-blue-500 text-white' : 'text-blue-500 border-blue-500 hover:bg-blue-900'}`;

  return (
    <section className=' bg-black text-white font-sans p-6  w-full'>
      <div className='flex justify-between items-center p-4'>
        <h1 className='text-xl font-bold text-blue-400'>Crypto</h1>
        <div className='flex relative bottom-3 gap-4'>
        <div className='w-7 h-7 flex justify-center items-center rounded-sm bg-[#232f48]'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={17}>
  <path fill-rule="evenodd" d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z" clip-rule="evenodd" />
</svg>
</div>
        <div className='w-7 h-7 flex justify-center items-center rounded-sm bg-[#232f48]'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={17}>
  <path fill-rule="evenodd" d="M11.828 2.25c-.916 0-1.699.663-1.85 1.567l-.091.549a.798.798 0 0 1-.517.608 7.45 7.45 0 0 0-.478.198.798.798 0 0 1-.796-.064l-.453-.324a1.875 1.875 0 0 0-2.416.2l-.243.243a1.875 1.875 0 0 0-.2 2.416l.324.453a.798.798 0 0 1 .064.796 7.448 7.448 0 0 0-.198.478.798.798 0 0 1-.608.517l-.55.092a1.875 1.875 0 0 0-1.566 1.849v.344c0 .916.663 1.699 1.567 1.85l.549.091c.281.047.508.25.608.517.06.162.127.321.198.478a.798.798 0 0 1-.064.796l-.324.453a1.875 1.875 0 0 0 .2 2.416l.243.243c.648.648 1.67.733 2.416.2l.453-.324a.798.798 0 0 1 .796-.064c.157.071.316.137.478.198.267.1.47.327.517.608l.092.55c.15.903.932 1.566 1.849 1.566h.344c.916 0 1.699-.663 1.85-1.567l.091-.549a.798.798 0 0 1 .517-.608 7.52 7.52 0 0 0 .478-.198.798.798 0 0 1 .796.064l.453.324a1.875 1.875 0 0 0 2.416-.2l.243-.243c.648-.648.733-1.67.2-2.416l-.324-.453a.798.798 0 0 1-.064-.796c.071-.157.137-.316.198-.478.1-.267.327-.47.608-.517l.55-.091a1.875 1.875 0 0 0 1.566-1.85v-.344c0-.916-.663-1.699-1.567-1.85l-.549-.091a.798.798 0 0 1-.608-.517 7.507 7.507 0 0 0-.198-.478.798.798 0 0 1 .064-.796l.324-.453a1.875 1.875 0 0 0-.2-2.416l-.243-.243a1.875 1.875 0 0 0-2.416-.2l-.453.324a.798.798 0 0 1-.796.064 7.462 7.462 0 0 0-.478-.198.798.798 0 0 1-.517-.608l-.091-.55a1.875 1.875 0 0 0-1.85-1.566h-.344ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clip-rule="evenodd" />
</svg>
</div>
        <div className='w-7 h-7 flex justify-center items-center rounded-2xl bg-[#232f48]'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={17}>
  <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clip-rule="evenodd" />
</svg>
</div></div>
      </div>
      <div className='flex flex-col  gap-3 mb-8'>
        <div className='flex mt-1 items-center gap-3'>
          <h1 className='text-3xl  font-medium'>Bitcoin</h1>
          <p className='text-yellow-400 font-bold'>BTC</p>
        </div>
        <h1 className='text-3xl mr-auto'>${price}</h1>
      </div>

      <div className='w-5xl mr-auto bg-[#1a1d24] p-6 h-120  rounded-xl shadow-xl'>
        <div className='flex justify-between items-center mb-8'>
          <h3 className='text-2xl font-semibold mask-b-from-neutral-400'>Price Performance</h3>
          <div className='flex gap-2 mask-b-from-neutral-400 bg-[#232f48] rounded'>
            {['24h', '7d', '30d', '1y'].map((p) => (
              <button key={p} onClick={() => setTimePeriod(p)} className={btnStyle(p)}>
                {p === '24h' ? 'Day' : p === '7d' ? 'Week' : p === '30d' ? 'Month' : 'Year'}
              </button>
            ))}
          </div>
        </div>

        <div className='h-95 mask-b-from-neutral-400'>
          {history.length > 0 ? (
            // Use the Line component here
            <Line data={chartData} options={chartOptions} />
          ) : (
            <div className="flex h-full items-center justify-center text-blue-400">Loading chart data...</div>
          )}
        </div>
      </div><br />
      <div className=' max-w-3xl shadow-2xl rounded-2xl p-2 bg-[#1a1d24]'>
        <h1 className='font-bold text-sm'>About Bitcoin</h1>
        <p className='text-xs text-[#7786a4]'>Bitcoin is a decentralized cryptocurrency originally described in a 2008 whitepaper by a person,
           or a group of people, using the alias Satoshi Nakamato. It was launched soon after,in january 2009.
        </p>
      </div>
    </section>
  );
}
