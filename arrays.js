const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;

app.use(bodyParser.json());

app.post('/api/array-functions', (req, res) => {
  const array = req.body.array;
  if (!Array.isArray(array)) {
    return res.status(400).send('Invalid payload');
  }

  // Example array functions
  const arrayLength = array.length;
  const arraySum = array.reduce((acc, val) => acc + val, 0);
  const arraySorted = [...array].sort((a, b) => a - b);
  const arrayFiltered = array.filter(val => val > 10);

  res.json({
    length: arrayLength,
    sum: arraySum,
    sorted: arraySorted,
    filtered: arrayFiltered,
  });
});

app.listen(port, () => {
  console.log(`Array functions server running on http://localhost:${port}`);
});
