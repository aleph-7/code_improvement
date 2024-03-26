import React from 'react';
import './LP2.css';
import NewsArticle from './NewsArticle.jsx';
import Header from "../Header";

const NewsArticleImage = './basketball_img.jpeg';
const NewsArticleHeadline='IITK BASKETBALL TEAM WINS THE INTER-IIT TOURNAMENT';
const NewsArticleText='Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Ls 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in ';

function LP2(){
  return (
    <div>
    <Header />
    <div id='NewsArticleMainDiv'>
      <NewsArticle NewsArticleHeadline={NewsArticleHeadline} NewsArticleText={NewsArticleText}/>
    </div>
    </div>
);
}

export default LP2;

