import React from 'react';
import './NewsArticle.css'; // Import your styles
import basketballImage from './basketball_img.jpeg'; // Import the image

const NewsArticle = ({ NewsArticleHeadline, NewsArticleText }) => {
  return (
    <div id="NewsArticle">
      <div id="NewsArticleHeading">
        <h1>{NewsArticleHeadline}</h1>
      </div>
      <div id="NewsArticleContent">
        <div id="NewsArticleImageDiv">
            <img id="imgnews" src={basketballImage} alt="NewsArticleImage" />
        </div>
        <div id="NewsArticleTextDiv">
            <p>{NewsArticleText}</p>
        </div>
      </div>
    </div>
  );
};

export default NewsArticle;
