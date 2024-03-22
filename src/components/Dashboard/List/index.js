import React from "react";
import "./style.css";
import { Tooltip } from "@mui/material";
import { convertNumber } from "../../../functions/convertNumber";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import { Link } from "react-router-dom";
function List({ coins }) {
  return (
    <table>
      {coins.map((coin, index) => {
        return (
          <Link key={index} className="coin-item" to={`/coin/${coin.id}`}>
            <tr className="list-row">
              <Tooltip title="Coin Image">
                <td className="td-img">
                  <img src={coin.image} className="coin-image coin-image-td" />
                </td>
              </Tooltip>
              <Tooltip title="Coin Info" placement="bottom-start">
                <td className="td-info">
                  <div className="info-flex">
                    <p className="coin-symbol td-p">{coin.symbol}</p>
                    <p className="coin-name td-p">{coin.name}</p>
                  </div>
                </td>
              </Tooltip>
              <Tooltip
                title="Coin Price Percentage In 24hrs"
                placement="bottom-start"
              >
                {coin.price_change_percentage_24h >= 0 ? (
                  <td>
                    <div className="chip-flex">
                      <div className="price-chip">
                        {coin.price_change_percentage_24h.toFixed(2)}%
                      </div>
                      <div className="chip-icon td-chip-icon">
                        <TrendingUpRoundedIcon />
                      </div>
                    </div>
                  </td>
                ) : (
                  <td>
                    <div className="chip-flex">
                      <div className="price-chip red">
                        {coin.price_change_percentage_24h.toFixed(2)}%
                      </div>
                      <div className="chip-icon td-chip-icon red">
                        <TrendingDownRoundedIcon />
                      </div>
                    </div>
                  </td>
                )}
              </Tooltip>
              <Tooltip title="Coin Price In USD" placement="bottom-end">
                {coin.price_change_percentage_24h >= 0 ? (
                  <td className="current-price  td-current-price">
                    ${coin.current_price.toLocaleString()}
                  </td>
                ) : (
                  <td className="current-price-red td-current-price">
                    ${coin.current_price.toLocaleString()}
                  </td>
                )}
              </Tooltip>
              <Tooltip title="Coin Total Volume" placement="bottom-end">
                <td className="coin-name td-totalVolume">
                  {coin.total_volume.toLocaleString()}
                </td>
              </Tooltip>
              <Tooltip title="Coin Market Capital" placement="bottom-end">
                <td className="coin-name td-marketCap">
                  ${coin.market_cap.toLocaleString()}
                </td>
              </Tooltip>
              <td className="coin-name mobile">
                ${convertNumber(coin.market_cap)}
              </td>
            </tr>
          </Link>
        );
      })}
    </table>
  );
}

export default List;
