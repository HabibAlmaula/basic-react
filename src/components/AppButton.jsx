import PropTypes from 'prop-types';

function AppButton({ onClick, label, className }) {
  //handle onClick event of button

  return (
    <>
      <button
        className={`p-2 rounded-md ${className} min-w-[100px] mt-5 mb-2`}
        onClick={onClick}
      >
        {label || "Button"}
      </button>
    </>
  );
}

export default AppButton;

AppButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
};
