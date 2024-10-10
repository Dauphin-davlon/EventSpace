import { pool } from './database.js';
import './dotenv.js';
import { faker } from '@faker-js/faker';

// Generate fake data for locations
const createFakeLocation = () => ({
  name: faker.address.city()
});

// Generate fake data for events
const createFakeEvent = (locationId) => ({
  name: faker.lorem.words(3),
  date: faker.date.soon(),
  location_id: locationId
});

// Create tables for locations and events
const createTables = async () => {
  const createTablesQuery = `
    DROP TABLE IF EXISTS events;
    DROP TABLE IF EXISTS locations;

    CREATE TABLE IF NOT EXISTS locations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      location_id INTEGER REFERENCES locations(id),
      name VARCHAR(255) NOT NULL,
      date TIMESTAMP NOT NULL
    );
  `;

  try {
    await pool.query(createTablesQuery);
    console.log('🎉 Tables created successfully');
  } catch (err) {
    console.error('⚠️ Error creating tables', err);
  }
};

// Seed locations table with fake data
const seedLocationsTable = async () => {
  const fakeLocations = Array.from({ length: 5 }, createFakeLocation);

  for (const location of fakeLocations) {
    const insertLocationQuery = {
      text: 'INSERT INTO locations (name) VALUES ($1) RETURNING id',
      values: [location.name]
    };

    try {
      const res = await pool.query(insertLocationQuery);
      const locationId = res.rows[0].id;
      console.log(`✅ Location "${location.name}" added successfully with ID: ${locationId}`);

      // After creating each location, create some events for that location
      await seedEventsTable(locationId);
    } catch (err) {
      console.error(`⚠️ Error inserting location "${location.name}"`, err);
    }
  }
};

// Seed events table with fake data
const seedEventsTable = async (locationId) => {
  const fakeEvents = Array.from({ length: 3 }, () => createFakeEvent(locationId));

  for (const event of fakeEvents) {
    const insertEventQuery = {
      text: 'INSERT INTO events (name, date, location_id) VALUES ($1, $2, $3)',
      values: [event.name, event.date, event.location_id]
    };

    try {
      await pool.query(insertEventQuery);
      console.log(`✅ Event "${event.name}" added for location ID: ${locationId}`);
    } catch (err) {
      console.error(`⚠️ Error inserting event "${event.name}" for location ID: ${locationId}`, err);
    }
  }
};

// Seed the database by creating tables and inserting data
const seedDatabase = async () => {
  await createTables();
  await seedLocationsTable();
  pool.end();  // Close the pool after everything is done
};

seedDatabase();
