import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./user";
import favoritesReducer from "./favorites";
import searchReducer from "./searchResult";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    user: persistedReducer,
    favorites: favoritesReducer,
    search: searchReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
