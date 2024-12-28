import app from './app.js';

const PORT = process.env.API_PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});