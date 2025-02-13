import React from "react";
import styles from "../styles/folder.module.css";

const File = ({ data, setSelectedFile, selectedFile }) => {
  return (
    <div
      className={`${styles.file} ${
        selectedFile?.id === data.id ? styles.selectedFile : ""
      }`}
      onClick={() => setSelectedFile(data)}
    >
      📄 {data.name}
    </div>
  );
};

export default File;

// import React from "react";
// import styles from "../styles/folder.module.css";

// const File = ({ data, setSelectedFile }) => {
//   return (
//     <div className={styles.file} onClick={() => setSelectedFile(data)}>
//       📄 {data.name}
//     </div>
//   );
// };

// export default File;
