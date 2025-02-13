import React from "react";
import styles from "../styles/folder.module.css";

const FileContent = ({ file }) => {
  return (
    <div className={styles.fileContent}>
      <h3>📄 File Preview</h3>
      {file ? (
        <div>
          <h4>{file.name}</h4> {/* Subheading */}
          <p>Type: {file.type}</p>
          <p>Content preview not available</p>
        </div>
      ) : (
        <p>Select a file to preview</p>
      )}
    </div>
  );
};

export default FileContent;
