import React from "react";
import {motion} from 'framer-motion';

const Modal = ({selectedImg, setSelectedImg}) => {

    const closeModal = (e) => {
        if (e.target.classList.contains('backdrop')){
        setSelectedImg(null);  
        }   
    }

    return(
        <motion.div 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            className="backdrop" 
            onClick={closeModal} >
            <motion.img 
                src={selectedImg} 
                alt='enlarged pic'
                initial={{ y: '-100vh'}}
                animate={{ y: 0}}
                />
        </motion.div>
    )
}

export default Modal;

// initial={{ y: '-100vh'}} y=vertical start from -100 px above the view height
// animate={{ y: 0}} finish at the definite position