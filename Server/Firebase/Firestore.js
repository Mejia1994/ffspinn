import admin from "./Admin";

const db = admin.firestore();

const playersCollection = db.collection('players');
const rafflesCollection = db.collection('raffles');
const ticketsCollection = db.collection('tickets');

export {playersCollection, rafflesCollection, ticketsCollection};