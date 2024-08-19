const express = require("express");
const cors = require("cors");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config(); // .env 파일에 정의된 API키를 로드

const app = express();
const port = 3000;

app.use(cors());

app.get("/proxy", async (req, res) => {
  try {
    const { word } = req.query;
    const apiKey = process.env.API_KEY;
    const url = `https://stdict.korean.go.kr/api/search.do?certkey_no=&key=${apiKey}&type_search=search&req_type=json&q=${word}`;

    const response = await axios.get(url, { timeout: 5000 });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Error fetching data" });
  }
});

app.listen(port, () => {
  console.log(`Proxy server is running on http://localhost:${port}`);
});
