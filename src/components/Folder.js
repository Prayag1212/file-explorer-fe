import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addFileOrFolder, renameItem, deleteItem } from "../redux/folderSlice";
import File from "./File";
import styles from "../styles/folder.module.css";

const Folder = ({ data, setSelectedFile, selectedFile, level = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(data.name);
  const [isAdding, setIsAdding] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemType, setNewItemType] = useState("folder");

  const dispatch = useDispatch();

  const handleAddItem = () => {
    if (newItemName.trim() !== "") {
      dispatch(
        addFileOrFolder({
          parentId: data.id,
          name: newItemName,
          type: newItemType,
        })
      );
      setIsAdding(false);
      setNewItemName("");
    }
  };

  const handleRename = () => {
    dispatch(renameItem({ id: data.id, newName }));
    if (selectedFile?.path.startsWith(data.path)) {
      setSelectedFile({
        ...selectedFile,
        path: selectedFile.path.replace(data.path, newName),
      });
    }
    setIsRenaming(false);
  };

  const handleDelete = () => {
    if (selectedFile?.path.startsWith(data.path)) {
      setSelectedFile(null);
    }
    dispatch(deleteItem(data.id));
  };

  return (
    <div className={styles.folder} style={{ marginLeft: level * 15 + "px" }}>
      <div className={styles.folderHeader} onClick={() => setIsOpen(!isOpen)}>
        📂 {data.name}
        <div>
          <button
            className={styles.button}
            onClick={() => {
              setIsAdding(true);
              setNewItemType("folder");
            }}
          >
            📁
          </button>
          <button
            className={styles.button}
            onClick={() => {
              setIsAdding(true);
              setNewItemType("file");
            }}
          >
            📄
          </button>
          <button className={styles.button} onClick={() => setIsRenaming(true)}>
            ✏️
          </button>
          <button className={styles.button} onClick={handleDelete}>
            🗑️
          </button>
        </div>
      </div>

      {/* Rename Input */}
      {isRenaming && (
        <div className={styles.inputContainer}>
          <input
            type='text'
            value={newName}
            className={styles.inputBox}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button className={styles.button} onClick={handleRename}>
            ✔️
          </button>
          <button
            className={styles.button}
            onClick={() => setIsRenaming(false)}
          >
            ❌
          </button>
        </div>
      )}

      {/* Add Folder/File Input */}
      {isAdding && (
        <div className={styles.inputContainer}>
          <input
            type='text'
            value={newItemName}
            className={styles.inputBox}
            placeholder={`Enter ${newItemType} name`}
            onChange={(e) => setNewItemName(e.target.value)}
          />
          <button className={styles.button} onClick={handleAddItem}>
            ✔️
          </button>
          <button className={styles.button} onClick={() => setIsAdding(false)}>
            ❌
          </button>
        </div>
      )}

      {isOpen &&
        data.children?.map((item) =>
          item.type === "folder" ? (
            <Folder
              key={item.id}
              data={item}
              setSelectedFile={setSelectedFile}
              selectedFile={selectedFile}
              level={level + 1}
            />
          ) : (
            <File
              key={item.id}
              data={item}
              setSelectedFile={setSelectedFile}
              selectedFile={selectedFile}
            />
          )
        )}
    </div>
  );
};

export default Folder;
