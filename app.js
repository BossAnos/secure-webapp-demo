// app.js - Ứng dụng Express đơn giản dùng để demo
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello from Secure Web Container Demo!');
});

// Endpoint kiểm tra health cho container orchestrator
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại cổng ${PORT}`);
});