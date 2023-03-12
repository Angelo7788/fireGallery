import { useState, useEffect } from "react";
import { firestore } from "../firebase/config";
import { collection, getDocs, query, orderBy } from "@firebase/firestore";

const useFirestore = (dbName) => {
  const [docs, setDocs] = useState([]);

  const getImeages = async (dbName) => {
    let documents = [];

    const q = query(
      collection(firestore, dbName),
      orderBy("timestamp", "desc")
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      documents.push({ ...doc.data(), id: doc.id });
    });
    setDocs(documents);
  };

  useEffect(() => {
    getImeages(dbName);
  }, [dbName]);

  return { docs };
};

export default useFirestore;
