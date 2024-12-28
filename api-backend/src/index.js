import app from './app.js'; // Import app default export
import sequelize from './config/database.js';

const PORT = process.env.API_PORT || 3000;

sequelize.sync({ force: false }).then(() => {
  console.log('Database connected');
  app.listen(PORT, () => { // Call listen on the app instance
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Error connecting to the database:', err);
});