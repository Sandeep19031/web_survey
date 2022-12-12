import React from "react";
import "./LayoutCard.scss";

const LayoutCard = ({ title, children, subTitle }) => {
  return (
    <div className="layout-card">
      {title && !subTitle && <h2 className="layout-card__title">{title}</h2>}
      {title && subTitle && (
        <h2 className="layout-card__titleSubtitle">
          {title}
          <p>{subTitle}</p>
        </h2>
      )}
      <div className="layout-card__inner">{children}</div>
    </div>
  );
};

export default LayoutCard;
