import React, { useState } from "react";
import { useSelector } from "react-redux";
import FolderTree from "./FolderTree";
import FileContent from "./FileContent";
import styles from "../styles/folder.module.css";

const FileExplorer = () => {
  const files = useSelector((state) => state.fileSystem.files);
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <div className={styles.fileExplorer}>
      <div className={styles.explorerContainer}>
        <FolderTree
          data={files}
          setSelectedFile={setSelectedFile}
          selectedFile={selectedFile}
        />
        <FileContent file={selectedFile} />
      </div>
    </div>
  );
};

export default FileExplorer;
