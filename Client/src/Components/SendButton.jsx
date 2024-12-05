import PropTypes from "prop-types";

// Button to send user input
const SendButton = ({ handleSend }) => {
  return (
    <button
      onClick={handleSend}
      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
    >
      Send
    </button>
  );
};

SendButton.propTypes = {
  handleSend: PropTypes.func.isRequired,
};

export default SendButton;
