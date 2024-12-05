import { useState } from "react";
import PropTypes from "prop-types";
import pdfToText from "react-pdftotext";
import mammoth from "mammoth";

// Component for uploading and processing documents
const DocumentUploader = ({ onDocumentProcessed }) => {
  const [fileName, setFileName] = useState("");

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]; // Get the uploaded file
    if (!file) return;

    setFileName(file.name);

    try {
      const text = await extractTextFromFile(file);
      onDocumentProcessed(text); // Pass extracted text to the parent component
    } catch (error) {
      console.error("Error processing file:", error);
    }
  };

  const extractTextFromFile = async (file) => {
    const fileType = file.type;

    if (fileType === "application/pdf") {
      return await extractTextFromPDFFile(file);
    } else if (fileType === "text/plain") {
      return await file.text();
    } else if (fileType.includes("word")) {
      return await extractTextFromDOCX(file);
    } else {
      throw new Error("Unsupported file type");
    }
  };

  const extractTextFromPDFFile = async (file) => {
    const text = await pdfToText(file);
    return text;
  };

  const extractTextFromDOCX = async (file) => {
    const arrayBuffer = await file.arrayBuffer(); // Read the file as an array buffer using the File API
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  };

  return (
    <div>
      <input
        type="file"
        accept=".pdf,.txt,.docx"
        onChange={handleFileUpload}
        className="border border-gray-300 p-2 rounded-lg bg-white"
      />
      {fileName && (
        <p className="mt-2 text-sm text-gray-400">Uploaded: {fileName}</p>
      )}
    </div>
  );
};

DocumentUploader.propTypes = {
  onDocumentProcessed: PropTypes.func.isRequired,
};

export default DocumentUploader;
