import express from 'express';
import cors from 'cors';
import eventsRoutes from './routes/eventsRoutes.js';
import locationsRoutes from './routes/locationsRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

// Define API routes
app.use('/api/events', eventsRoutes);
app.use('/api/locations', locationsRoutes);

app.get('/', (req, res) => {
    res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">UnEarthed API</h1>')
  })

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server listening on http://localhost:${PORT}`)
   })
