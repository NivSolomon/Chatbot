import PropTypes from "prop-types";

// Component for displaying conversation
const ChatboxWindow = ({ conversation }) => {
  return (
    <div className="h-96 overflow-y-auto border border-gray-700 rounded-lg p-4 bg-gray-800 shadow-inner">
      {conversation.map((entry, index) => (
        <div
          key={index}
          className={`mb-4 ${
            entry.role === "user" ? "text-right" : "text-left"
          }`}
        >
          <p
            className={`inline-block px-4 py-3 rounded-lg ${
              entry.role === "user"
                ? "bg-blue-500 text-white"
                : "bg-gray-600 text-white"
            }`}
          >
            {entry.content}
          </p>
        </div>
      ))}
    </div>
  );
};

ChatboxWindow.propTypes = {
  conversation: PropTypes.arrayOf(
    PropTypes.shape({
      role: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ).isRequired,
};
ChatboxWindow.defaultProps = {
  conversation: [],
};

export default ChatboxWindow;
