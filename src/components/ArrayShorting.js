import React, { Component } from 'react'

export class ArrayShorting extends Component {
  constructor(props) {
    super(props)
    this.state = {
      maxNum: 1000,
      minNum: 1,
      arrayLength: 100,
      array: [],
    }
  }

  newArray() {
    this.state.array = []
    for (let i = 1; i <= this.state.arrayLength; i++) {
      var newArr = this.state.array.push(this.state.minNum + Math.floor((this.state.maxNum - this.state.minNum) * Math.random()))
      this.setState({ Array: newArr })
    }
  }

  JsSort() {
    var newArr = this.state.array.sort(function (a, b) { return a - b })
    this.setState({ array: newArr })
  }

  bubbleSort() {
    var newArray = this.state.array
    for (let i = 0; i < newArray.length; i++) {
      for (let j = 0; j < newArray.length - i; j++) {
        if (newArray[j] > newArray[j + 1]) {
          let temp = newArray[j]
          newArray[j] = newArray[j + 1]
          newArray[j + 1] = temp
        }
      }
    }
    this.setState({ array: newArray })
  }

  handleArrayLength(value) {
    this.setState({ arrayLength: value })
    this.newArray()
  }

  componentDidMount() {
    this.newArray()
  }

  render() {
    return (
      <div className='wrapper'>
        <div className='nav-bar'>
          <button className="btn" onClick={() => this.newArray()}>New Array</button>
          <input className="slider" type="range" max='200' min='10' defaultValue="100" onChange={(e) => this.handleArrayLength(e.target.value)} />
          <button className="btn" onClick={() => this.JsSort()}>JS Sort</button>
          <button className="btn" onClick={() => this.bubbleSort()}>Bubble Sort</button>
        </div>
        <ul className='bars-wrapper'>
          {
            this.state.array.map((e, key) => {
              return <li key={key} className='bar' style={{ height: `${(e * 100) / this.state.maxNum}%`, margin: `0px ${this.state.arrayLength < 100 ? 2 : 1}px` }}></li>
            })
          }
        </ul>
      </div >
    )
  }
}

export default ArrayShorting
