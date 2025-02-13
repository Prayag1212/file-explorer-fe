import { configureStore } from "@reduxjs/toolkit";
import folderReducer from "./folderSlice";
export const store = configureStore({
  reducer: {
    fileSystem: folderReducer,
  },
});
