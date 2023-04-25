import React, { useState } from "react";

import "../styles/slider.css";

export function Slider(props) {
  const { images } = props;

  const [currentSelect, setCurrentSelect] = useState(
    !!images[0].id ? images[0].id : ""
  );

  return (
    <div className="slider">
      <div className="slider-wrapper">
        <ul>
          {images.map((item, index) => (
            <li key={(!!item.id && item.id) || index}>
              <img
                className={item.id === currentSelect ? "selected" : ""}
                src={item.src}
                alt={(!!item.alt && item.src.toString()) || "image"}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  //   return (
  //     <div className="slider">
  //       <div className="slider-wrapper">
  //         {images.map((item) => (
  //           <img
  //             key={item.toString()}
  //             src={item.src}
  //             alt={!!item.alt && item.src.toString()}
  //           />
  //         ))}
  //       </div>
  //     </div>
  //   );
}
