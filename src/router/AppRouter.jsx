import {createBrowserRouter} from "react-router";
import DasboardLayout from "../Layout/DasboardLayout";
import CoinPrice from "../Component/coinPrice";
import SearchCoins from "../Component/SearchCoins";
import LoginSignup from "../Component/LoginSignup";
import OverView from "../Component/OverView";
import GainersLosers from "../Component/GainersLosers";



const AppRouter = createBrowserRouter([
    
    {
        path: "/register",
        element: <LoginSignup/>,
    },
  
    {
        path: "/dashboard",
        element: <DasboardLayout/>,
        children:[
           
              {
                path: "/dashboard/overview",
                element: <OverView/>,
              },
   
             {
                path: "/dashboard/coin-price",
                element: <CoinPrice/>,
                
            },
            {
                path: "/dashboard/Search-Coins",
                element: <SearchCoins/>,
            },
           {
            path:"/dashboard/Gainers-Losers",
            element: <GainersLosers/>,
           },
        ],
    },
]);

export default AppRouter