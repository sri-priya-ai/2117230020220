const axios = require("axios");

const Log = async (stack, level, pkg, message) => {
  try {
    const response = await axios.post(
      "http://20.207.122.201/evaluation-service/logs",
      {
        stack: stack,
        level: level,
        package: pkg,
        message: message
      },
      {
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzcmlwcml5YWRoYXJzaGluaS50LjIwMjMuY3NlQHJpdGNoZW5uYWkuZWR1LmluIiwiZXhwIjoxNzc4MDQ4NzYyLCJpYXQiOjE3NzgwNDc4NjIsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJiMjI1ODgwYi1hNjIxLTQ3MDAtOTkyZS0yMTM5OTQyMTA5NDEiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJzcmkgcHJpeWFkaGFyc2hpbmkgdCIsInN1YiI6ImE0MDM2MmRiLTgyOTctNGRhYi1iZGM1LTY0ZTliNzQzOTU5MiJ9LCJlbWFpbCI6InNyaXByaXlhZGhhcnNoaW5pLnQuMjAyMy5jc2VAcml0Y2hlbm5haS5lZHUuaW4iLCJuYW1lIjoic3JpIHByaXlhZGhhcnNoaW5pIHQiLCJyb2xsTm8iOiIyMTE3MjMwMDIwMjIwIiwiYWNjZXNzQ29kZSI6IkJUQ0RxVCIsImNsaWVudElEIjoiYTQwMzYyZGItODI5Ny00ZGFiLWJkYzUtNjRlOWI3NDM5NTkyIiwiY2xpZW50U2VjcmV0IjoiVEVuR1JBTkFnQ3V2dm1lVSJ9.LuT5cd3Wkdud7pSWrqJb5AV_ogg3P9Pui2Pd-_9jr74",
          "Content-Type": "application/json"
        }
      }
    );

    console.log("Log success:", response.data);
  } catch (error) {
    console.error("Log failed:", error.response?.data || error.message);
  }
};

module.exports = Log;