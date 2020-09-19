import React, { Component } from "react"
import Layout from "../components/layout"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
toast.configure()
class Lab1 extends Component {
  constructor(props) {
    super(props)

    this.state = {
      express: "",
      result: "",
    }
  }

  handleClick = e => {
    this.setState({ result: "" })
    e.preventDefault()
    this.stack = []
    let arr = this.state.express.split(" ")
    for (let item of arr) {
      let num = Number(item)
      if (num) {
        this.stack.push(num)
      } else {
        let val1 = this.stack.pop()
        let val2 = this.stack.pop()
        let result = this.calc(val2, val1, item)
        this.stack.push(result)
      }
    }

    if (
      this.stack.length === 1 &&
      !Number.isNaN(this.stack[0]) &&
      Number.isFinite(this.stack[0])
    ) {
      this.setState({ result: this.stack[0] })
    } else {
      toast("Not valid Expression ", {
        type: "error",
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  calc = (a, b, symbol) => {
    switch (symbol) {
      case "+":
        return a + b
      case "-":
        return a - b
      case "*":
        return a * b
      case "/":
        return a / b
      default:
        return symbol
    }
  }

  render() {
    return (
      <Layout>
        <div className="lab4">
          <div className="form">
            <form>
              <input
                type="text"
                value={this.state.value}
                onChange={e =>
                  this.setState({
                    express: e.target.value,
                  })
                }
                placeholder="Please enter the expressions"
              ></input>
              <button onClick={this.handleClick}>Calculate</button>
            </form>
          </div>

          <div className="result">
            <h3>Result: {this.state.result}</h3>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Lab1
