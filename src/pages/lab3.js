import React, { Component } from "react"
import LinkedList from "../linked/linkedlist"
class lab3 extends Component {
  constructor(props) {
    super()
    this.state = {
      arr: [],
      genNum: [],
    }

    this.sortarr = []
    this.newarr = []
  }

  getValues = list => {
    let arr = []
    for (let i = 0; i < list.length; i++) {
      arr.push(list.get(i).value)
    }

    return arr
  }

  handleClick = () => {
    this.setState({
      arr: [],
      genNum: [],
    })

    this.sortarr = []
    this.newarr = []

    let newList = new LinkedList()
    for (let i = 0; i < 10; i++) {
      let random = Math.floor(Math.random() * 101)
      let num = Math.random() > 0.5 ? random : random * -1
      this.newarr.push(num)
      newList.insertSort(num)
      this.sortarr.push([...this.getValues(newList)])
    }

    console.log(this.sortarr)
    this.setState({
      arr: this.sortarr,
      genNum: this.newarr,
    })
  }

  render() {
    return (
      <div>
        <div className="arr-list">
          {this.state.genNum.map((num, idx) => {
            return (
              <div key={idx}>
                <h2>Generated Number: {num}</h2>
                <div>{[...this.state.arr[idx]].map(item => `${item} ,`)}</div>
              </div>
            )
          })}
        </div>

        <button onClick={this.handleClick}>Create List</button>
      </div>
    )
  }
}

export default lab3
