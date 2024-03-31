import Lottie from "react-lottie";
import animationData from "../assets/Animation.json"; // Replace with the actual path
import "./animation.css"; // Add this line
const MyLottieAnimation = () => {
  const defaultOptions = {
    loop: true, // Whether the animation should loop continuously
    autoplay: true, // Whether the animation should start automatically
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice", // Optional aspect ratio settings
    },
  };

  return (
    <div className="animation">
      <Lottie options={defaultOptions} height={150} width={150} />
    </div>
  );
};

export default MyLottieAnimation;
