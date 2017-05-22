import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

export default function BoilingVerdict(props) {
  let willBoilText;
  const willBoil = props.celsius >= 100;
  const textColorClass = cx({
    "text-success": willBoil,
    "text-info": !willBoil
  });
  if (willBoil) {
    willBoilText = `Вода закипит`;
  } else willBoilText = `Вода не закипит`;
  return (
    <div className="row converter-component-main-div">
      <div className="col-xs-12 col-sm-4">
        <p className={cx("lead text-right", textColorClass)}>
          {willBoilText}
        </p>
      </div>
      <div className="col-xs-12 col-sm-4" />
    </div>
  );
}
BoilingVerdict.PropTypes = {
  celsius: PropTypes.number
};
