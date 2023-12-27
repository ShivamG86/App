const express = require("express");
const axios = require("axios");
const cors = require("cors");


const app = express();
const port = process.env.PORT||3001;

app.use(express.json());
app.use(cors());

app.post("/api/callEndpoint", async (req, res) => {
  const { method, fetchURL, data } = req.body;

  try {
    let responseData;
    let responseStatus;

    if (method === "GET") { 
      const response = await axios.get(fetchURL);
      responseData = response.data;
      responseStatus = response.status
    
    } else if (method === "POST") {
      const response = await axios.post(fetchURL, data);
      responseData = response.data;
      console.log(responseData)
    }

    res.status(200).json({
      status: responseStatus,
      response: responseData,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      response: error.response?.data || "An error occurred",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
