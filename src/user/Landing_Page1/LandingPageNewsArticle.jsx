import react from 'react';
import './LandingPageNewsArticle.css';


const LandingPageNewsArticle = ({ imageurl, Headline }) => {
    const articleStyle = {
      backgroundImage: `url(${imageurl})`,
      backgroundSize: 'cover',
      borderRadius: '25px',
      width: '80vw',
      height: '80vh',
      alignSelf: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: '4vh',
    };
  
    return (
      <div id="LandingPageNewsArticle" style={articleStyle}>
        <h1 id="Headline">{Headline}</h1>
        
        <button id="HeadlineButton" onClick={() => {
                          window.location.pathname = "/home_readmore";
                        }}>Read More</button>
      </div>
    );
  };
  

export default LandingPageNewsArticle;