const axios = require("axios");

const TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzcmlwcml5YWRoYXJzaGluaS50LjIwMjMuY3NlQHJpdGNoZW5uYWkuZWR1LmluIiwiZXhwIjoxNzc4MDQ5MTI0LCJpYXQiOjE3NzgwNDgyMjQsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJlZDliYzgzNi1hM2QzLTQ5ZjAtYTU2OC0wM2NiOTMwMTBkOGYiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJzcmkgcHJpeWFkaGFyc2hpbmkgdCIsInN1YiI6ImE0MDM2MmRiLTgyOTctNGRhYi1iZGM1LTY0ZTliNzQzOTU5MiJ9LCJlbWFpbCI6InNyaXByaXlhZGhhcnNoaW5pLnQuMjAyMy5jc2VAcml0Y2hlbm5haS5lZHUuaW4iLCJuYW1lIjoic3JpIHByaXlhZGhhcnNoaW5pIHQiLCJyb2xsTm8iOiIyMTE3MjMwMDIwMjIwIiwiYWNjZXNzQ29kZSI6IkJUQ0RxVCIsImNsaWVudElEIjoiYTQwMzYyZGItODI5Ny00ZGFiLWJkYzUtNjRlOWI3NDM5NTkyIiwiY2xpZW50U2VjcmV0IjoiVEVuR1JBTkFnQ3V2dm1lVSJ9.1QbaIXYq2Uqnoe3N6sy-Up48vXlpRT6OSJcCoOaHsXw";


const weights = {
  Placement: 3,
  Result: 2,
  Event: 1
};

async function getTopNotifications() {
  try {
    const response = await axios.get(
      "http://20.207.122.201/evaluation-service/notifications",
      {
        headers: {
          Authorization: TOKEN
        }
      }
    );

    const notifications = response.data.notifications;

    // 🔹 Sort by weight + recency
    const sorted = notifications.sort((a, b) => {
      const weightDiff = weights[b.Type] - weights[a.Type];

      if (weightDiff !== 0) return weightDiff;

      return new Date(b.Timestamp) - new Date(a.Timestamp);
    });

    const top10 = sorted.slice(0, 10);

    console.log("\nTop 10 Priority Notifications:\n");
    console.table(top10);

  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
  }
}

getTopNotifications();