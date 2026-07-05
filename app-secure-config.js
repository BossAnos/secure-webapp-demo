const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

function readSecret(envVarName, filePath) {
  try {
    if (filePath && fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, 'utf8').trim();
    }
    if (process.env[envVarName]) {
      return process.env[envVarName];
    }
    throw new Error(`Khong tim thay secret: ${envVarName}`);
  } catch (err) {
    console.error('LOI doc secret:', err.message);
    process.exit(1);
  }
}

const config = {
  dbHost:     process.env.DB_HOST || 'localhost',
  dbPassword: readSecret('DB_PASSWORD', '/etc/secrets/DB_PASSWORD'),
  jwtSecret:  readSecret('JWT_SECRET',  '/etc/secrets/JWT_SECRET'),
};

console.log('Cau hinh da duoc nap thanh cong');
console.log('DB Host:', config.dbHost);
console.log('DB Password:', config.dbPassword ? '[DA NAP - AN GIA TRI]' : '[THIEU]');

app.get('/', (req, res) => {
  res.send('Hello from Secure Web Container Demo!');
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    dbConfigured: !!config.dbPassword,
    jwtConfigured: !!config.jwtSecret,
  });
});

app.listen(PORT, () => {
  console.log(`Server dang chay tai cong ${PORT}`);
});