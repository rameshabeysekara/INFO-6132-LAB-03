import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { firebaseConfig } from "./firebaseConfig";

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const dbCollection = collection(db, "transactions");

// Get data from the "transactions" collection
export const getData = async () => {
  try {
    const querySnapshot = await getDocs(dbCollection);
    const transactionsList = [];
    querySnapshot.forEach((doc) => {
      transactionsList.push({
        id: doc.id,
        name: doc.data().name,
        amount: doc.data().amount,
        location: doc.data().location,
        date: doc.data().date,
      });
    }); 
    return transactionsList;
  } catch (error) {
    console.error("Error getting documents: ", error);
    throw error;
  }
};

// Add a document to the "transactions" collection
export const addData = async (name, amount, location, date) => {
  try {
    const docRef = await addDoc(dbCollection, {
      name: name,
      amount: amount,
      location: location,
      date: date,
    });
    console.log("Document successfully added!");
    return docRef.id; // Return the ID of the added document
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

// Update a document in the "transactions" collection
export const updateData = async (documentId, name, amount, location, date) => {
  try {
    const docRef = doc(db, "transactions", documentId);
    await updateDoc(docRef, {
      name: name,
      amount: amount,
      location: location,
      date: date,
    });
    console.log("Document successfully updated!");
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
};

// Delete a document from the "transactions" collection
export const deleteData = async (documentId) => {
  try {
    const docRef = doc(db, "transactions", documentId);
    await deleteDoc(docRef);
    console.log("Document successfully deleted!");
  } catch (error) {
    console.error("Error deleting document: ", error);
    throw error;
  }
};
