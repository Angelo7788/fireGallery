import React from "react";

const Title = () => {
    return (
        <div  className="bw1 ma4 black">
            <div className="fl w-third pa3">
                <h2 className="i blue ba bw1 br3 pa1 avenir "
                >Firebase Gallery</h2>
            </div>
            <div className="fl w-two-thirds pa2">
                <h1 className="avenir i " 
                >Your photos</h1>
            </div>
            <div>
                <p>Load your photo and display it, select the photo to enlarge the view</p>
            </div>
        </div>
        
    )
}

export default Title;
