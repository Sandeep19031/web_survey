import React from "react";
import { Header } from "./common/Header";
import { Images } from "./utils";
import { CardExplore } from "./common/CardExplore";
import { CardExploreCheckbox } from "./common/CardExploreCheckbox";
import { CardQuestions } from "./common/CardQuestions";
import { InputText } from "./common/InputText";
import { SelectOption } from "./common";
import ExploreScreen from "./Component/ExploreScreen/ExploreScreen";
import BadgeExplore from "./Component/BadgeExplore/BadgeExplore";
import Singleton from "./common/Singleton";
import ApiStore from "./Stores/ApiStore";
function App() {
  const items = ["Value1", "Value2"];
  return (
    <div className="App">
      <Header
        title="Test"
        leftIcon
        onPressLeftLink={() => {
          console.log("Pressed left link");
          console.log("path");
        }}
        iconLeft={Images.arrow_back_header}
      />
      <CardExplore
        title="test"
        isChecked={false}
        onPress={() => {
          console.log("CardExplore worked fine");
        }}
      />
      <CardExploreCheckbox
        keyVal={1}
        title="card explore check box"
        isChecked={true}
        onPress={() => {
          console.log("CardExplore check box worked fine");
        }}
      />
      <CardQuestions questionNumber={1} question="this is a question" />

      <InputText
        placeholder="enter text"
        maxLength={120}
        editable={true}
        multiline={true}
        inputstyle={{
          minHeight: 40,
          maxHeight: 120,
          height: undefined,
          paddingTop: 15,
          paddingBottom: 15,
          marginBottom: 10,
          marginHorizontal: 10,
        }}
      ></InputText>

      <SelectOption value="SelectOption" />
    </div>
  );
}

export default App;
