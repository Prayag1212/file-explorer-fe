import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  files: {
    id: "root",
    name: "root",
    type: "folder",
    children: [
      {
        id: "docs",
        name: "Documents",
        type: "folder",
        children: [
          { id: "resume", name: "resume.pdf", type: "file" },
          { id: "notes", name: "notes.txt", type: "file" },
          { id: "report", name: "monthly_report.docx", type: "file" },
        ],
      },
      {
        id: "pictures",
        name: "Pictures",
        type: "folder",
        children: [
          { id: "vacation", name: "vacation.jpg", type: "file" },
          { id: "profile", name: "profile_picture.png", type: "file" },
        ],
      },
      {
        id: "music",
        name: "Music",
        type: "folder",
        children: [
          { id: "song1", name: "song1.mp3", type: "file" },
          { id: "song2", name: "song2.mp3", type: "file" },
        ],
      },
      {
        id: "videos",
        name: "Videos",
        type: "folder",
        children: [
          { id: "trailer", name: "movie_trailer.mp4", type: "file" },
          { id: "tutorial", name: "react_tutorial.mp4", type: "file" },
        ],
      },
      {
        id: "code",
        name: "Code Projects",
        type: "folder",
        children: [
          {
            id: "react_project",
            name: "ReactApp",
            type: "folder",
            children: [
              { id: "index_js", name: "index.js", type: "file" },
              { id: "app_js", name: "App.js", type: "file" },
              { id: "styles_css", name: "styles.css", type: "file" },
            ],
          },
          {
            id: "python_scripts",
            name: "Python Scripts",
            type: "folder",
            children: [
              { id: "script1", name: "data_analysis.py", type: "file" },
              { id: "script2", name: "web_scraper.py", type: "file" },
            ],
          },
        ],
      },
      { id: "todo", name: "todo.txt", type: "file" },
      { id: "readme", name: "README.md", type: "file" },
    ],
  },
  searchTerm: "",
};

// Helper function to find a folder by ID
const findNodeById = (node, id) => {
  if (node.id === id) return node;
  for (let child of node.children || []) {
    if (child.type === "folder") {
      const found = findNodeById(child, id);
      if (found) return found;
    }
  }
  return null;
};

const folderSlice = createSlice({
  name: "fileSystem",
  initialState,
  reducers: {
    addFileOrFolder: (state, action) => {
      const { parentId, name, type } = action.payload;
      const parentFolder = findNodeById(state.files, parentId);
      if (parentFolder) {
        parentFolder.children.push({
          id: `${parentId}-${Date.now()}`, // Unique ID
          name,
          type,
          children: type === "folder" ? [] : undefined, // Only folders have children
        });
      }
    },

    renameItem: (state, action) => {
      const { id, newName } = action.payload;

      const renameNode = (node) => {
        if (node.id === id) {
          node.name = newName;
        } else if (node.children) {
          node.children.forEach(renameNode);
        }
      };

      renameNode(state.files);
    },

    deleteItem: (state, action) => {
      const idToDelete = action.payload;

      const deleteNode = (node) => {
        if (node.children) {
          node.children = node.children.filter(
            (child) => child.id !== idToDelete
          );
          node.children.forEach(deleteNode);
        }
      };

      deleteNode(state.files);
    },

    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { addFileOrFolder, renameItem, deleteItem, setSearchTerm } =
  folderSlice.actions;
export default folderSlice.reducer;
