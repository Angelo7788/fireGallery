import { firestore, storage } from "./config";
import { deleteObject, ref } from "@firebase/storage";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
  deleteDoc,
} from "@firebase/firestore";

export const COLLECTION = "imagesUrl";

export const updateLike = (docId, prevLike) => {
  const updateRef = doc(firestore, `${COLLECTION}`, `${docId}`);
  updateDoc(updateRef, {
    like: prevLike + 1,
  });
};

export const deleteImage = async (fileName, docId) => {
  const imageRef = ref(storage, `${fileName}`);
  deleteObject(imageRef)
    .then(() => {
      console.log("image deleted");
    })
    .catch((error) => {
      alert("error");
    });
  deleteDoc(doc(firestore, `${COLLECTION}`, `${docId}`));
};

export const addToFirestoreDB = async (downloadURL, fileName) => {
  try {
    const docRef = await addDoc(collection(firestore, `${COLLECTION}`), {
      url: downloadURL,
      timestamp: serverTimestamp(),
      fileName: fileName,
      like: 0,
    });
  } catch {
    console.log("error");
  }
};
