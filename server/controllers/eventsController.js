import { pool } from '../config/database.js';

export const getEventsByLocation = async (req, res) => {
  const { locationId } = req.params;
  try {
    const result = await pool.query('SELECT * FROM events WHERE location_id = $1', [locationId]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
