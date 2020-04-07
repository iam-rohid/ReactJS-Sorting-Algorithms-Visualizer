import React, { Component } from 'react'

export class ArrayShorting extends Component {
  constructor(props) {
    super(props)
    this.state = {
      maxNum: 1000,
      minNum: 1,
      maxLength: 300,
      minLenth: 30,
      arrayLength: null,
      bar1: null,
      but2: null,
      solvedBars: [],
      array: [],
      arraySolvedComplete: false
    }
  }

  newArray() {
    this.setState({
      array: [],
      solvedBars: [],
      bar1: null,
      bar2: null,
      arraySolvedComplete: false,
    }, () => {
      for (let i = 1; i <= this.state.arrayLength; i++) {
        var newArr = this.state.array.push(this.state.minNum + Math.floor((this.state.maxNum - this.state.minNum) * Math.random()))
        this.setState({ Array: newArr })
      }
    })

  }

  bubbleSort() {
    var newArray = this.state.array
    var newSolvedBars = this.state.solvedBars
    for (let i = 0; i < newArray.length; i++) {
      for (let j = 0; j < newArray.length - i; j++) {
        setTimeout(() => {
          if (newArray[j] > newArray[j + 1]) {
            let temp = newArray[j]
            newArray[j] = newArray[j + 1]
            newArray[j + 1] = temp
          }
          if (!newSolvedBars.includes(newArray.length - i)) {
            newSolvedBars.push(newArray.length - i)
            if (newArray.length - i === 1) {
              newSolvedBars.push(0)
              this.setState({
                arraySolvedComplete: true
              })
            }
          }
          console.log(newSolvedBars)
          this.setState({
            solvedBars: newSolvedBars,
            array: newArray,
            bar1: j,
            bar2: j + 1
          })
        }, 0.1);
      }
    }
  }

  handleArrayLength(value) {
    this.setState({ arrayLength: value })
    this.newArray()
  }

  componentDidMount() {
    this.setState({
      arrayLength: this.state.minLenth
    })
    this.newArray()
  }

  render() {
    return (
      <div className='wrapper'>
        <div className='nav-bar'>
          <button className="btn" onClick={() => this.newArray()}>New Array</button>
          <div className="slider-wrapper">
            <label htmlFor="slider">{this.state.arrayLength}</label>
            <input id="slider" className="slider" type="range" max={this.state.maxLength} min={this.state.minLenth} defaultValue={this.state.minLenth} onChange={(e) => this.handleArrayLength(e.target.value)} />
          </div>
          <button className="btn" onClick={() => this.bubbleSort()} disabled={this.state.arraySolvedComplete}>Bubble Sort</button>
        </div>
        <ul className='bars-wrapper'>
          {
            this.state.array.map((e, key) => {
              return (
                <li
                  key={key}
                  className='bar'
                  style={{
                    height: `${(e * 100) / this.state.maxNum}%`,
                    backgroundColor: `${this.state.solvedBars.includes(key) ? '#696FFB' : (key === this.state.bar1 || key === this.state.bar2) && !this.state.solvedBars.includes(key) ? '#fe346e' : '#1F2940'}`,
                    margin: `${this.state.arrayLength < 50 ? '0px 6px' : this.state.arrayLength < 100 ? '0px 4px' : this.state.arrayLength < 150 ? '0px 2px' : '0px 1px'}`
                  }}
                >
                </li>
              )
            })
          }
        </ul>
      </div >
    )
  }
}

export default ArrayShorting
