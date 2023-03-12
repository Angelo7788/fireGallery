import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { firestore } from "../firebase/config";
import { collection, query, onSnapshot, orderBy } from "@firebase/firestore";
import { CiTrash } from "react-icons/ci";
import { AiOutlineLike } from "react-icons/ai";
import Button from "@mui/material/Button";
import { updateLike, deleteImage, COLLECTION } from "../firebase/manage";

const ImageView = ({ setSelectedImg }) => {
  // const {docs} = useFirestore('imagesUrl');
  // useFirestore hook not working with realtime data

  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const q = query(
      collection(firestore, `${COLLECTION}`),
      orderBy("timestamp", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let documents = [];
      querySnapshot.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
      });
      setDocs(documents);
    });
  });

  return (
    <div className="img-grid">
      {docs &&
        docs.map((doc) => (
          <div key={doc.fileName}>
            <Button
              variant="outlined"
              startIcon={<CiTrash />}
              style={{ marginBottom: 20 }}
              onClick={() => {
                deleteImage(doc.fileName, doc.id);
              }}
            >
              Delete
            </Button>
            <Button
              variant="outlined"
              startIcon={<AiOutlineLike />}
              style={{ marginBottom: 20, marginLeft: 10 }}
              onClick={() => {
                updateLike(doc.id, doc.like);
              }}
            >
              {doc.like}
            </Button>
            <motion.div
              layout
              whileHover={{ opacity: 1 }}
              className="img-wrap"
              key={doc.id}
              onClick={() => {
                setSelectedImg(doc.url);
              }}
            >
              <motion.img
                src={doc.url}
                alt="uploaded pic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              />
            </motion.div>
          </div>
        ))}
    </div>
  );
};

export default ImageView;
