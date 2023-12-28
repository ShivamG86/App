const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.post("/api/callEndpoint", async (req, res) => {
  const { method, fetchURL, data, key, value } = req.body;
  console.log(data);
  try {
    let responseData;
    let responseStatus;

    if (method === "GET") {
      try {
        // let token;

        // if (fetchURL === "https://repo-8qu2.onrender.com/studentServer/students") {
        //   const tokenRes = await axios.get(`https://repo-8qu2.onrender.com/studentServer/getToken`);
        //   token = tokenRes.data;
        // }

        const headers = {};
        if (key && typeof key === "string" && key.trim() !== "") {
          headers[key] = value;
        }

        const response = await axios.get(fetchURL, { headers });

        responseData = response.data;
        responseStatus = response.status;
      } catch (error) {
        responseData = error.response
          ? error.response.data
          : "An error occurred";
        responseStatus = error.response ? error.response.status : 500;
      }
    } else if (method === "POST") {
      try {
        const headers = {};
        if (key && typeof key === "string" && key.trim() !== "") {
          headers[key] = value;
        }

        const response = await axios.post(fetchURL, data, { headers });
        responseData =  response.data ;
        responseData = data;
        responseStatus = response.status;
        
      } catch (error) {
        responseData = error.response
          ? error.response.data
          : "An error occurred";
        responseStatus = error.response ? error.response.status : 500;
      }
    }else if (method === "PUT") {
      try {
        const headers = {};
        if (key && typeof key === "string" && key.trim() !== "") {
          headers[key] = value;
        }

        const response = await axios.put(fetchURL, data, { headers });
        responseData =  response.data ;
        responseData = data;
        responseStatus = response.status;
        
      } catch (error) {
        responseData = error.response
          ? error.response.data
          : "An error occurred";
        responseStatus = error.response ? error.response.status : 500;
      }
    }else if (method === "DELETE") {
      try {
        const headers = {};
        if (key && typeof key === "string" && key.trim() !== "") {
          headers[key] = value;
        }

        const response = await axios.delete(fetchURL, data, { headers });
        responseData =  response.data ;
        responseData = data;
        responseStatus = response.status;
        
      } catch (error) {
        responseData = error.response
          ? error.response.data
          : "An error occurred";
        responseStatus = error.response ? error.response.status : 500;
      }
    }

    res.status(responseStatus).json({
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

    res.status(status).json({
      status: status,
      response: errorMessage,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
