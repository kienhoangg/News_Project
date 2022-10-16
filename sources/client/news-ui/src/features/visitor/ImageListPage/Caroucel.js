import React from "react";
import "./caroucel.scss";

/**
 * Component caroucel
 * @author TDBA (15/10/2022)
 */
function Caroucel(props) {
  const { data, indexItem, marginLeftItem } = props;

  return (
    <div className="caroucel">
      <div className="caroucel__wrap">
        <div
          className="caroucel__wrap__list"
          style={{
            width: `calc(100% * ${data?.length})`,
            left: `calc(-100% * ${indexItem} + ${marginLeftItem || 0}px )`,
          }}
        >
          {data?.map((url, index) => (
            <div
              className={`caroucel__wrap__list__item ${
                index === indexItem ? "caroucel__wrap__list__item--focus" : ""
              }`}
              style={{
                marginLeft: marginLeftItem || 0,
              }}
            >
              <img src={url} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Caroucel;
