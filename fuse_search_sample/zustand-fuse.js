import Fuse from 'fuse.js';
import { create } from 'zustand';
import fs from 'fs';

// Load data from file
const fridges = JSON.parse(fs.readFileSync('./fridges.json', 'utf-8'));

// Flatten nested fields for easier search
const flattenedFridges = fridges.map((f) => ({
  ...f,
  city: f.location.city,
  state: f.location.state,
  condition: f.latestFridgeReport?.condition || '',
}));

// Single Fuse instance for fuzzy searching on text fields
// Can also assign weights to the keys which would impact the sorting order
// Example: keys: [{ name: "name", weight: 0.6 }, { name: "city", weight: 0.3 }, { name: "state", weight: 0.1 }],
const fuse = new Fuse(flattenedFridges, {
  keys: ['name', 'city', 'state'],
  includeScore: true,
  threshold: 0.3, // adjust for more/less fuzzy matching
});

const useFridgeStore = create((set, get) => ({
  fridges: flattenedFridges,

  // Search function: fuzzy search user input, AND filter by condition
  search: ({ query, condition } = {}) => {
    // Step 1: Fuzzy search on query if provided
    const fuzzyResults = query
      ? fuse.search(query).map((r) => r.item)
      : flattenedFridges;

    // Step 2: AND filter by condition if provided
    const finalResults = condition
      ? fuzzyResults.filter(
          (f) => f.condition.toLowerCase() === condition.toLowerCase()
        )
      : fuzzyResults;

    return finalResults;
  },
}));

// Example usage
const store = useFridgeStore.getState();

console.log("Search for 'Brooklyn' with condition 'good':");
console.log(store.search({ query: 'Brooklyn', condition: 'good' }));

console.log("Search for 'Brooklyn' with condition 'dirty':");
console.log(store.search({ query: 'Brooklyn', condition: 'dirty' }));

console.log("Search with Typo 'Brookln' with condition 'dirty':");
console.log(store.search({ query: 'Brookln', condition: 'dirty' }));

// console.log("Search for 'Brooklyn' without condition:")
// console.log(store.search({ query: "Brooklyn" }))
