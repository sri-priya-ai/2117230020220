import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Button,
  Select,
  MenuItem,
  Card,
  CardContent,
  Typography
} from "@mui/material";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzcmlwcml5YWRoYXJzaGluaS50LjIwMjMuY3NlQHJpdGNoZW5uYWkuZWR1LmluIiwiZXhwIjoxNzc4MDUxODIxLCJpYXQiOjE3NzgwNTA5MjEsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJhNzBmYWE0OC04N2Q3LTRkMWUtOGM3My1lZDI1MDhiMzRlYmQiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJzcmkgcHJpeWFkaGFyc2hpbmkgdCIsInN1YiI6ImE0MDM2MmRiLTgyOTctNGRhYi1iZGM1LTY0ZTliNzQzOTU5MiJ9LCJlbWFpbCI6InNyaXByaXlhZGhhcnNoaW5pLnQuMjAyMy5jc2VAcml0Y2hlbm5haS5lZHUuaW4iLCJuYW1lIjoic3JpIHByaXlhZGhhcnNoaW5pIHQiLCJyb2xsTm8iOiIyMTE3MjMwMDIwMjIwIiwiYWNjZXNzQ29kZSI6IkJUQ0RxVCIsImNsaWVudElEIjoiYTQwMzYyZGItODI5Ny00ZGFiLWJkYzUtNjRlOWI3NDM5NTkyIiwiY2xpZW50U2VjcmV0IjoiVEVuR1JBTkFnQ3V2dm1lVSJ9.x-980R5DK0UgAxnLmTmkMn-XooLgnjIRIJtUm9kiRdg";

const weight = {
  placement: 3,
  result: 2,
  event: 1
};

function App() {
  const [data, setData] = useState([]);
  const [mode, setMode] = useState("all");
  const [type, setType] = useState("all");
  const [page, setPage] = useState(1);
  const [seen, setSeen] = useState([]);

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `http://20.207.122.201/evaluation-service/notifications?limit=10&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setData(res.data.notifications || []);
    } catch (err) {
      setData([
        {
          ID: "1",
          Type: "Placement",
          Message: "Tesla Inc. hiring",
          Timestamp: "2026-05-05 18:32:25"
        },
        {
          ID: "2",
          Type: "Result",
          Message: "mid-sem",
          Timestamp: "2026-05-05 21:02:13"
        },
        {
          ID: "3",
          Type: "Event",
          Message: "cult-fest",
          Timestamp: "2026-05-06 06:02:17"
        }
      ]);
    }
  };

  const normalize = (val) => (val || "").toLowerCase();

  const getPriority = () => {
    return [...data]
      .sort((a, b) => {
        const aType = normalize(a.Type);
        const bType = normalize(b.Type);

        if ((weight[bType] || 0) !== (weight[aType] || 0)) {
          return (weight[bType] || 0) - (weight[aType] || 0);
        }

        return new Date(b.Timestamp) - new Date(a.Timestamp);
      })
      .slice(0, 10);
  };

  const applyFilter = (list) => {
    if (type === "all") return list;
    return list.filter(
      (item) => normalize(item.Type) === type
    );
  };

  const display =
    mode === "all"
      ? applyFilter(data)
      : applyFilter(getPriority());

  return (
    <Container style={{ marginTop: "20px" }}>
      <Typography variant="h5">
        Campus Notifications
      </Typography>

      <div style={{ marginTop: "15px" }}>
        <Button
          variant="contained"
          onClick={() => setMode("all")}
          style={{ marginRight: "10px" }}
        >
          All
        </Button>

        <Button
          variant="contained"
          onClick={() => setMode("priority")}
        >
          Priority
        </Button>
      </div>

      <div style={{ marginTop: "15px" }}>
        <Select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="placement">Placement</MenuItem>
          <MenuItem value="result">Result</MenuItem>
          <MenuItem value="event">Event</MenuItem>
        </Select>
      </div>

      <div style={{ marginTop: "15px" }}>
        <Button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Prev
        </Button>

        <Button onClick={() => setPage(page + 1)}>
          Next
        </Button>
      </div>

      <div style={{ marginTop: "20px" }}>
        {display.length === 0 ? (
          <Typography>No notifications</Typography>
        ) : (
          display.map((item) => (
            <Card
              key={item.ID}
              onClick={() =>
                setSeen((prev) => [...prev, item.ID])
              }
              style={{
                marginBottom: "10px",
                backgroundColor: seen.includes(item.ID)
                  ? "#d3d3d3"
                  : "#ffffff",
                cursor: "pointer"
              }}
            >
              <CardContent>
                <Typography variant="h6">
                  {item.Type}
                </Typography>
                <Typography>
                  {item.Message}
                </Typography>
                <Typography variant="body2">
                  {item.Timestamp}
                </Typography>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </Container>
  );
}

export default App;