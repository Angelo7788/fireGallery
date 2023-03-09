import { useState, useEffect } from "react";
import {firestore} from '../firebase/config';
import {collection, getDocs} from '@firebase/firestore';
import { async } from "@firebase/util";

const useFirestore = async () => {

    let imagesUrl = [];

    useEffect(async() => {
      const querySnapshot = await getDocs(collection(firestore, "imagesUrl"));
      querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      imagesUrl.push(doc.data());
      console.log(imagesUrl);

    },[]);
    })

    
      

    return {imagesUrl}
}

export default useFirestore;
