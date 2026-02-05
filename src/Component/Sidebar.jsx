import { Link } from "react-router";



const routePaths = [
    {
      path: "/dashboard/overview",
      pathName: "Overview",
    },
    {
        path: "/dashboard/coin-price",
        pathName: "Coin price",
    },
    {
        path: "/dashboard/Search-Coins",
        pathName: "Search coins",
    },
    {
      path: "/dashboard/Gainers-Losers",
      pathName: "Gainers Losers",
    },
];

function Sidebar() {
  return (
    <section className='bg-[#0f1323] h-full overflow-hidden p-6'>
      <div className="side-bar-header">
        <h1 className="text-2xl text-cyan-500 font-bold">Crypto</h1>
        <br />
        <hr className="border-blue-900 w-full" />
        <br />
        
        <div className="font-bold">
          <div className="flex flex-col text-[#7786a4] gap-6">
            {routePaths.map((route) => (
              /* FIX: Added the unique key prop here */
              <Link 
                key={route.path} 
                to={route.path} 
                className="hover:text-cyan-500 transition-colors"
              >
                {route.pathName}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Sidebar;
