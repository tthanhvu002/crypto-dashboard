import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Loader from "../components/Common/Loader";
import Header from "../components/Common/Header";
import { coinObject } from "../functions/convertObject";
import CoinInfo from "../components/Coin/CoinInfo";
import LineChart from "../components/Coin/LineChart";
import { settingChartData } from "../functions/settingChartData";
import { getPrices } from "../functions/getCoinPrices";
import { getCoinData } from "../functions/getCoinData";
import SelectDays from "../components/Coin/SelectDays";
import PriceType from "../components/Coin/PriceType";


function CoinPage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [coinData, setCoinData] = useState();
  const [error, setError] = useState(false);
  const [coinPrices, setCoinPrices] = useState();
  const [days, setDays] = useState(7);
  const [chartData, setChartData] = useState({ labels: [], datasets: [{}] });
  const [priceType, setPriceType] = useState("prices");

  const handleChangeSelectDays = async (event) => {
    setIsLoading(true);
    setDays(event.target.value);
    const prices = await getPrices(id, event.target.value, priceType, setError);
    if (prices.length > 0) {
      settingChartData(setChartData, prices);
      setIsLoading(false);
      
    }
  };

  const handleChangePriceType = async (event, newType) => {
    setIsLoading(true);

    setPriceType(newType);
    const prices = await getPrices(id, days, newType, setError);
    if (prices.length > 0) {
      console.log(newType);
      settingChartData(setChartData, prices);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (id) {
      getData();
    }
  }, id);
  const getData = async () => {
    setIsLoading(true);
    let coinData = await getCoinData(id, setError);
    coinObject(setCoinData, coinData);
    if (coinData) {
      const prices = await getPrices(id, days, priceType, setError);
      if (prices) {

        settingChartData(setChartData, prices);
        setIsLoading(false);
      }
    }
  };
  return (
    <div>
    
      <Header />{" "}
      {isLoading ? (
        <Loader />
      ) : (
        <CoinInfo heading={coinData.name} desc={coinData.desc} />
      )}
      <div className="grey-wrapper">
        <SelectDays
          days={days}
          handleChangeSelectDays={handleChangeSelectDays}
        />
        <PriceType
          priceType={priceType}
          handleChangePriceType={handleChangePriceType}
        />
        <LineChart chartData={chartData} />
      </div>
    </div>
  );
}

export default CoinPage;
