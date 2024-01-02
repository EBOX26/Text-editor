// Import the openDB function from the "idb" library.
import { openDB } from "idb";

// Function to initialize the IndexedDB database.
const initdb = async () =>
  openDB("jate", 1, {
    // Upgrade function is called if the database version changes.
    upgrade(db) {
      // Check if the object store named "jate" already exists.
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      // If "jate" object store doesn't exist, create it with a keyPath of "id" and auto-increment.
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// Function to open a connection to the database.
const openDatabaseConnection = async () => {
  return await openDB("jate", 1);
};

// Function to add data to the database.
export const putDb = async (content) => {
  // Open a connection to the database.
  const db = await openDatabaseConnection();
  // Start a new read-write transaction.
  const tx = db.transaction("jate", "readwrite");
  // Open the "jate" object store.
  const store = tx.objectStore("jate");
  // Add the content to the store.
  store.add(content);
  // Add a predefined entry with id: 1 and tx: content for additional information.
  const request = store.add({ id: 1, tx: content });
  // Wait for the request to complete and log the result.
  const result = await request;
  console.log("data saved to the database", result);
};

// Function to retrieve data from the database.
export const getDb = async () => {
  console.log("GET from the database");
  // Open a connection to the database.
  const db = await openDatabaseConnection();
  // Start a new read-only transaction.
  const tx = db.transaction("jate", "readonly");
  // Open the "jate" object store.
  const store = tx.objectStore("jate");
  // Use the getAll method to retrieve all data in the object store.
  const request = store.getAll();
  // Wait for the request to complete and log the result.
  const result = await request;
  console.log("result.value", result);
  // If result.value is not null, return the values; otherwise, log a message and return the result.
  if (result.value !== null) {
    return result.value;
  } else {
    console.log("result.value is null");
    return result;
  }
};

// Start the database initialization process.
initdb();



