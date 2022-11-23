require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const corsOptions = require('./config/corsOptions');
const errorHandler = require('./middleware/errorHandler');
const routes = require('./routes/index');
// const userRoute = require("./routes/userRoute");

const app = express();

const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

// Routes
app.use('/', express.static(path.join(__dirname, '/public')));

app.use('/', routes);

app.all('*', (req, res) => {
  res.status(404);

  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ message: '404 Not Found' });
  } else {
    res.type('txt').send('404 not Found');
  }
});

// Error Middleware
app.use(errorHandler);

// Connect to database
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(`${error} did not connect`));
