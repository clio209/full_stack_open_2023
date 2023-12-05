import { useState } from 'react'
import './App.css'

const Statistics = ({good, neutral, bad}) => { 
  if (good + neutral + bad === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  } else {
    return (
      <div style={{textAlign: "left"}}>
        <h1>statistics</h1>
        <StatisticLine text="good" counter={good} />
        <StatisticLine text="neutral" counter={neutral} />
        <StatisticLine text="bad" counter={bad} />
        <StatisticLine text="all" counter={good + neutral + bad} />
        <StatisticLine text="average" counter={(good - bad) / (good + neutral + bad)} />
        <div style={{display: "flex", alignItems: "center"}}>
        <StatisticLine text="positive" counter={good / (good + neutral + bad) * 100} /><p>%</p>
        </div>
      </div>
    )
  }
} 

const StatisticLine = ({text, counter}) => {
  return (
    <div> {text} {counter}</div>
  )
}

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const App = () => {
  const [counter, setCounter] = useState({good: 0, neutral: 0, bad: 0})
  const increaseByGood = () => {
    const newCounter = {
      ...counter,
      good: counter.good + 1
    }
    setCounter(newCounter)
  }

  const increaseByNeutral = () => {
    const newCounter = {
      ...counter,
      neutral: counter.neutral + 1
    }
    setCounter(newCounter)
  }

  const increaseByBad = () => {
    const newCounter = {
      ...counter,
      bad: counter.bad + 1
    }
    setCounter(newCounter)
  }

  return (
    <div style={{textAlign: "left"}}>
      <h1>give feedback</h1>
      <Button onClick={increaseByGood} text="good" />
      <Button onClick={increaseByNeutral} text="neutral" />
      <Button onClick={increaseByBad} text="bad" />
      <Statistics good={counter.good} neutral={counter.neutral} bad={counter.bad} />
    </div>
  )
} 

export default App
