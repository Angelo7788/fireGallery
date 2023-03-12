import React from "react";

const Title = () => {
  return (
    <div>
      <div className="fl w-third pa3">
        <h2 className="i blue ba bw1 br3 pa1 mh4 avenir ">Firebase Gallery</h2>
      </div>
      <div className="fl w-two-thirds pa4">
        <h1 className="avenir i">Your photos</h1>
      </div>
      <div>
        <p>Load your photo and display it</p>
        <p>Select the photo to enlarge the view</p>
      </div>
    </div>
  );
};

export default Title;
