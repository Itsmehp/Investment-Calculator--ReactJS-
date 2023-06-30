import Header from "./Components/Header/Header";
import Userinput from "./Components/Userinput/Userinput";
import Results from "./Components/Results/Results";
import { useState } from "react";
function App() {
  const [userInput, setUserInput] = useState(null);
  const calculateHandler = (userInput) => {
    setUserInput(userInput);
  };
  const yearlyData = []; // per-year results
  if (userInput) {
    let currentSavings = +userInput["current-savings"];
    const yearlyContribution = +userInput["yearly-contribution"];
    const expectedReturn = +userInput["expected-return"] / 100;
    const duration = +userInput["duration"];

    // The below code calculates yearly results (total savings, interest etc)
    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        // feel free to change the shape of the data pushed to the array!
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }
  }
  return (
    <div>
      <Header />

      <Userinput onCalculate={calculateHandler} />

      {!userInput && (
        <p style={{ textAlign: "center" }}>No investment calculated yet.</p>
      )}

      {userInput && (
        <Results
          data={yearlyData}
          intitialInvestment={userInput["current-savings"]}
        />
      )}
    </div>
  );
}

export default App;
