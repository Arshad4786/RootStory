const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); // Import body-parser

const app = express();
const PORT = 4000;

app.use(cors());

// --- THE FIX: Teach the server to understand both JSON and Form data ---
// This teaches the "clerk" how to read JSON mail
app.use(express.json()); 
// This teaches the "clerk" how to read standard web form mail (x-www-form-urlencoded)
// This is the format most webhooks use.
app.use(bodyParser.urlencoded({ extended: true }));

// --- We will keep the endpoint as '/' since that is what the webhook is calling ---
app.post('/', (req, res) => {
  // Improved logging to see the entire data packet
  console.log('✅ --- SMS Webhook Data Received! --- ✅');
  console.log('Full Request Body:', req.body);
  
  // Now, you can access the data based on what the log shows.
  // The field names might be different, e.g., 'from_number', 'message', etc.
  const sender = req.body.from || req.body.sender || 'Unknown Sender';
  const message = req.body.body || req.body.message || 'No Message Content';

  console.log('Sender:', sender);
  console.log('Message:', message);
  console.log('---------------------------------------');
  
  res.status(200).json({ success: true, message: "Webhook data received successfully." });
});

app.listen(PORT, () => {
  console.log(`SMS Gateway Simulator is running on http://localhost:${PORT}`);
});

