import { useState } from "react";


export  const DescriptionCell = ({ description }) => {
   const [isExpanded, setIsExpanded] = useState(false);
   const toggleExpansion = () => {
      setIsExpanded(!isExpanded);
   };

   return (
      <td className="description-cell">
         <div className={isExpanded ? 'expanded' : 'collapsed'}>
            {description}
         </div>
         <div className="button">
         <button onClick={toggleExpansion} 
         >
            {isExpanded ? 'Show Less' : 'Show More'}
         </button>
         </div>
      </td>
   );
};
