// TitleChanger.js
import { useEffect } from "react";

const TitleChanger = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
  return null;
};

export default TitleChanger;
