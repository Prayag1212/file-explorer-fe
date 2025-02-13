import React from "react";
import Folder from "./Folder";
import styles from "../styles/folder.module.css";

const FolderTree = ({ data, setSelectedFile }) => {
  return (
    <div className={styles.folderTree}>
      <Folder data={data} setSelectedFile={setSelectedFile} />
    </div>
  );
};

export default FolderTree;
