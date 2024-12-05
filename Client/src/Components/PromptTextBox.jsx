import PropTypes from 'prop-types';

 // Textbox for user input
const PromptTextBox = ({ userInput, setUserInput }) => {
  return (
    <input
      type="text"
      value={userInput} // Bind input value to state
      onChange={(e) => setUserInput(e.target.value)}
      placeholder="Ask me anything..."
      className="flex-grow p-4 text-lg border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-gray-700"
    />
  );
};

PromptTextBox.propTypes = {
  userInput: PropTypes.string.isRequired,
  setUserInput: PropTypes.func.isRequired,
};

export default PromptTextBox;
