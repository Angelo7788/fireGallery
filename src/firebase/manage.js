import {updateDoc, doc, deleteDoc} from '@firebase/firestore';
import { firestore, storage } from "./config";
import {deleteObject, ref} from '@firebase/storage';

export const COLLECTION = 'imagesUrl';

export const updateLike = (docId, prevLike) => {
    const updateRef = doc(firestore, 'imagesUrl', `${docId}`);
    updateDoc(updateRef,{
        like: prevLike + 1,
    })
}

export const deleteImage = async (fileName, docId) => {
    const imageRef = ref(storage, `${fileName}`);
    deleteObject(imageRef).then(()=> {
        console.log('image deleted')
    }).catch((error)=> {
        alert('error')
    })
    deleteDoc(doc(firestore, `${COLLECTION}` , `${docId}`));
}
