import PropTypes from "prop-types";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function AppButton({ onClick, label, className, disabled = false, isLoading }) {
  //handle onClick event of button

  return (
    <>
      <button
        className={`p-2 rounded-md ${className} min-w-[100px] mt-5 mb-2`}
        onClick={onClick}
        disabled={disabled || isLoading}
      >
        {isLoading ? (
          <>
            Loading...
            <AiOutlineLoading3Quarters className="animate-spin object-contain" />
          </>
        ) : (
          label
        )}
      </button>
    </>
  );
}

export default AppButton;

AppButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
};
