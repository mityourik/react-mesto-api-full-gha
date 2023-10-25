import React from "react";
import doneIcon from "../images/infoTooltip__done-icon.svg";
import errorIcon from "../images/infoTooltip__error-icon.svg";
import Popup from "./Popup";

function InfoTooltip({ tooltipIcon, title, isOpen, onClose }) {
  return (
    <Popup isOpen={isOpen} name="tooltip" onClose={onClose}>
      <div className="popup__icon-tooltip">
        {tooltipIcon === "success" && (
          <img src={doneIcon} alt="Изображение Выполнено" />
        )}
        {tooltipIcon === "error" && <img src={errorIcon} alt="Изображение Ошибка" />}
      </div>
      <h2 className="popup__title-tooltip">{title}</h2>
    </Popup>
  );
}

export default InfoTooltip;