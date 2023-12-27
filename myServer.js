const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.post("/api/callEndpoint", async (req, res) => {
  const { method, fetchURL, data } = req.body;

  try {
    let responseData;
    let responseStatus;

    if (method === "GET") {
      try {
      const response = await axios.get(fetchURL);
      responseData = response.data;
      responseStatus = response.status;
      }catch (error) {
        responseData = error;
      }
    } else if (method === "POST") {
      try {
      const response = await axios.post(fetchURL, data);
      responseData = response.data;
      responseStatus = response.status;
      }catch (error) {
        responseData = error;
      }
    }

    res.status(200).json({
      status: responseStatus,
      response: responseData,
    });
  } catch (error) {
    let status = 500;
    let errorMessage = "An error occurred";

    if (error.response) {
      status = error.response.status || 500;
      errorMessage = error.response.data || "An error occurred";
    }

    res.status(401).json({
      status: "Error",
      response: errorMessage,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
