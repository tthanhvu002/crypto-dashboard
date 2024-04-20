import axios from "axios";
import * as tf from "@tensorflow/tfjs";
import { useState } from "react";
export const getPrices = (id, days, priceType, setError) => {
  
  const predictPrices = (prices) => {
    console.log("prices in predictPrices: ", prices);

    /* model */
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

    model.compile({ loss: "meanSquaredError", optimizer: "sgd" });

    const xs = tf.tensor2d(
      prices.map((price, i) => [i]),
      [prices.length, 1]
    );
    const ys = tf.tensor2d(
      prices.map((price) => [price[1]]),
      [prices.length, 1]
    );

    return model.fit(xs, ys, { epochs: 500 }).then(() => {
      const newPredictions = Array.from(
        { length: 7 },
        (_, i) =>
          model.predict(tf.tensor2d([prices.length + i], [1, 1])).dataSync()[0]
      );

      let lastValidPrediction = 0;
      const timestampedPredictions = prices.map((price, index) => {
        let prediction = newPredictions[index];
        if (isNaN(prediction)) {
          prediction = lastValidPrediction;
        } else {
          lastValidPrediction = prediction;
        }
        return [price[0] + 1000 * 60 * 60 * 24 * 7, prediction];
      });

      return timestampedPredictions;
    });
  };
  
  const prices = axios
    .get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`
    )
    .then(async (response) => {
      if (response.data) {
        if (priceType == "marketcap") {
          return response.data.market_caps;
        } else if (priceType == "volume") {
          return response.data.total_volumes;
        } else if (priceType == "price") {
          return response.data.prices;
        } else {
          const predictions = await predictPrices(response.data.prices);
          console.log("predictions: ", predictions);

          return predictions;
        }
      }
    })
    .catch((e) => {
      console.log(e.message);
      if (setError) {
        setError(true);
      }
    });

  return prices;
};
