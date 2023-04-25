import React from "react";

import "../styles/slider.css";

export function Slider(props) {
  const { images } = props;

  const handleTextChange = (event) => {
    props.onChange(event);
  };

  return (
    <div className="slider">
      <div className="slider-wrapper">
        <ul>
          {images.map((item, index) => (
            <li key={(!!item.id && item.id) || index}>
              <img
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
