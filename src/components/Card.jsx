import PropTypes from "prop-types";
import classes from "./Card.module.css";

const Card = (props) => {
  const { className, children } = props;
  return <div className={`${classes.card} ${className}`}>{children}</div>;
};

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Card;
