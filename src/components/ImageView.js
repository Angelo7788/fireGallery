import React, { useEffect, useState } from "react";
import {motion} from 'framer-motion';
import {firestore, storage} from '../firebase/config';
import {collection, query, onSnapshot, orderBy, doc, deleteDoc, updateDoc} from '@firebase/firestore';
import {ref, deleteObject} from '@firebase/storage';
import { CiTrash } from "react-icons/ci";
import { AiOutlineLike } from "react-icons/ai";
import Button from '@mui/material/Button';

const ImageView = ({setSelectedImg}) => {

    // const {docs} = useFirestore('imagesUrl');
    // useFirestore hook not working with realtime data

    const [docs, setDocs] = useState([]);

    const deleteImage = async (fileName, docId) => {
        const imageRef = ref(storage, `${fileName}`);
        deleteObject(imageRef).then(()=> {
            console.log('image deleted')
        }).catch((error)=> {
            alert('error')
        })
        deleteDoc(doc(firestore, 'imagesUrl', `${docId}`));
    }

    const updateLike = (docId, prevLike) => {
        const updateRef = doc(firestore, 'imagesUrl', `${docId}`);
        updateDoc(updateRef,{
            like: prevLike + 1,
        })
    }

    useEffect(()=>{
        const q = query(collection(firestore, 'imagesUrl'), orderBy('timestamp','desc') );
        const unsubscribe = onSnapshot(q, (querySnapshot)=> {
            let documents = [];
            querySnapshot.forEach((doc) => {
                documents.push({...doc.data(), id: doc.id});
            });
            setDocs(documents);
        });

    })
   

    return (
        <div className="img-grid">
            { docs && docs.map((doc)=>(
                <div key={doc.fileName} >
                    <Button 
                        variant="outlined" 
                        startIcon={<CiTrash />} 
                        style={{marginBottom: 20}}
                        onClick={() =>{
                            deleteImage(doc.fileName, doc.id);
                        }}>Delete
                    </Button>
                    <Button 
                        variant="outlined" 
                        startIcon={<AiOutlineLike />} 
                        style={{marginBottom: 20, marginLeft: 10}}
                        onClick={() =>{
                            updateLike(doc.id, doc.like);
                        }}>{doc.like}
                    </Button>
                <motion.div 
                    layout
                    whileHover={{ opacity: 1}}
                    className="img-wrap" 
                    key={doc.id} 
                    onClick={()=>{setSelectedImg(doc.url)}}
                    >
                    <motion.img src={doc.url} alt='uploaded pic' 
                        initial={{ opacity:0}}
                        animate={{ opacity:1}}
                        transition={{ delay: 1}}
                    />
                </motion.div>
                </div>
            ))}
        </div>
    )
}

export default ImageView;
