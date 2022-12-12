import React from "react";
import BadgeExplore from "./Component/BadgeExplore/BadgeExplore";

import { NotificationContainer } from "react-notifications";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrimaryLayout from "./Component/Layout/PrimaryLayout";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "./Component/Redux/store";

let persistor = persistStore(store);

const App = () => {
  const navigation = {
    addListener: () => {},
    state: {
      params: {
        badge_id: 6,
        surveyName: "Survey",
      },
    },
  };
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NotificationContainer />
          <BrowserRouter>
            <PrimaryLayout>
              <Routes>
                <Route
                  path="/"
                  element={<BadgeExplore navigation={navigation} />}
                />
                <Route path={"*"} />
              </Routes>
            </PrimaryLayout>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
