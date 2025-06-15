import { loadStripe } from "@stripe/stripe-js";

// Replace with your actual Stripe publishable key
const stripePromise = loadStripe("pk_test_51QWqy7A20xTHMqZJAVbdGFKJwOCqFCJ9jE5VUKH15vXkgOcPVUOIiNJAPP7qMJFIUwwOWHH8bQHGNPQ2IjryGdJG00O0aQrHCv");

export default stripePromise;