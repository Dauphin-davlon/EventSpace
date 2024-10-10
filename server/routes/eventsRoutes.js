import express from 'express';
import { getEventsByLocation } from '../controllers/eventsController.js';

const router = express.Router();

router.get('/:locationId', getEventsByLocation);

export default router;
