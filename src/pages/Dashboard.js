import React from "react";
import Header from "../components/Common/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import List from "../components/Dashboard/List";
import Search from "../components/Dashboard/Search";
import PaginationComponent from "../components/Dashboard/Pagination";
import Loader from "../components/Common/Loader";
import SelectSortType from "../components/Dashboard/SelectSortType";
import Box from "@mui/material/Box";
import SelectSortReverse from "../components/Dashboard/SortReverse";
function DashboardPage() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [paginatedCoins, setPaginatedCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortType, setSortType] = useState("change");
  const [reverse, setReverse] = useState(false);
  
  const handlePageChange = (event, value) => {
    setPage(value);
    let prevIndex = (value - 1) * 10;
    setPaginatedCoins(coins.slice(prevIndex, prevIndex + 10));
  };
  console.log('re-render')
  const onSearchChange = (value) => {
    setSearch(value);
  };
  console.log(coins);
  let filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const handleChangeSortType = async (event, newType) => {
    setSortType(newType);
    getListCoin(sortType);
  };


  const handleChangeSortReverse = async (event) => {
    setReverse(!reverse)
    getListCoin(sortType)
  }
  function sortByPrice(data) {
    // Sắp xếp danh sách theo giá hiện tại theo thứ tự tăng dần
    if(reverse) {

      return data.sort((a, b) => b.current_price - a.current_price);
    } else{
      return data.sort((a, b) => a.current_price - b.current_price);

    }
  }

  function sortByChange(data) {
    if(reverse) {

      return data.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
    } else{
      return data.sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h);

    }
   
  }
  
  function sortByVolume(data) {
    if(reverse) {

      return data.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
    } else{
      return data.sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h);

    }
    
  }
  const getListCoin = async (sortType) => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h&locale=en"
      )
      .then(function (response) {
        // handle success
        let data = [];
        console.log(` ${data}`);
        switch (sortType) {
          case "price":
            data = sortByPrice(response.data);
            break;
          case "change":
            data = sortByChange(response.data);
          default:
            break;
        }

        setCoins(response.data);
        setPaginatedCoins(response.data.slice(0, 10));
        setIsLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        setIsLoading(true);
      });
  };
  useEffect(() => {
    getListCoin(sortType);
  }, [sortType, reverse]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header />
          <Search search={search} onSearchChange={onSearchChange} />

          <Box display='flex' alignItems='center' gap={4} >
            <SelectSortType
              sortType={sortType}
              handleChangeSortType={handleChangeSortType}
            />
            <SelectSortReverse sortReverse={reverse} handleChangeSortReverse={handleChangeSortReverse} />
          </Box>
          <List coins={search ? filteredCoins : paginatedCoins} />
          {!search && (
            <PaginationComponent
              page={page}
              handlePageChange={handlePageChange}
            />
          )}
        </div>
      )}
    </>
  );
}

export default DashboardPage;
