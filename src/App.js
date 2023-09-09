import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const numbers = new Array(24).fill(null).map((_, i) => i + 1);
  const lastDrink = new Array(24).fill(null).map((_, i) => i + 1);

  const [weight, setWeight] = useState("0");
  const [gender, setGender] = useState("male");
  const [bottleAmount, setBottles] = useState("0");
  const [time, setTime] = useState("0");
  const [result, setResult] = useState("0");

  const calculate = () => {
    // Calculation Formula here 🏎️
    const litres = bottleAmount * 0.33;
    const grams = litres * 8 * 4.5;
    //Console.log Time:0 bugfix, without const Validtime the results won't show up correctly (0.57 prommilles)
    const validTime = time > 0 ? time : 1;
    const burning = weight / 10;
    const gramsLeft = grams - (burning * validTime);


    let calculatedResult;

    if (gender === "male") {
      calculatedResult = gramsLeft / (weight * 0.7);
    } else {
      calculatedResult = gramsLeft / (weight * 0.6);
    }


    calculatedResult = Math.max(0, calculatedResult);

    setResult(calculatedResult.toFixed(2));

    console.log("Weight:", weight);
    console.log("Bottle Amount:", bottleAmount);
    console.log("Time:", time);
  }

  return (
    <div id="container">
      <h3>Calculating Alcohol Blood Level</h3>
      <div>
        <label>Weight</label>
        <input type="number" value={weight} onChange={e => setWeight(e.target.value)} />
      </div>
      <div>
        <label>Bottles</label>
        <select value={bottleAmount} onChange={e => setBottles(e.target.value)}>
          {numbers.map((bottle) => (
            <option key={bottle} value={bottle}>
              {bottle} Bottles
            </option>
          ))}
        </select>
        <div>
          <label>Time</label>
          <select value={time} onChange={e => setTime(e.target.value)}>
            {lastDrink.map((time) => (
              <option key={time} value={time}>
                {time} Hours
              </option>
            ))}
          </select>
          <div>
            <label>Gender</label>
            <input class="form-check-input" type="radio" name="inlineRadioOptions" value="male" checked onChange={e => setGender(e.target.value)} /><label>Male</label>
            <input class="form-check-input" type="radio" name="inlineRadioOptions" value="female" onChange={e => setGender(e.target.value)} /><label>Female</label>
          </div>
          <label>Result</label>
          <output style={{ color: result >= 0.5 && result < 1 ? '#D66538' : result < 0.5 ? '#088E0E' : result >= 1 ? '#F01212' : '' }}>
            {result} promilles
          </output>
        </div>
        <div>
          <button type="button" class="btn btn-outline-dark" onClick={calculate}>Calculate</button>
        </div>
      </div>
    </div>

  );
}

export default App;
