const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = 3000;

app.use(cors());

app.get("/proxy", async (req, res) => {
  try {
    const { word } = req.query;
    const apiKey = "DB75C194F100244DF3F96C1625429F9B";
    const url = `https://stdict.korean.go.kr/api/search.do?certkey_no=&key=${apiKey}&type_search=search&req_type=json&q=${word}`;

    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Error fetching data" });
  }
});

app.listen(port, () => {
  console.log(`Proxy server is running on http://localhost:${port}`);
});
