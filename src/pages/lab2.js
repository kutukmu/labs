import React, { Component } from "react"
import Layout from "../components/layout"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

toast.configure()

class lab2 extends Component {
  constructor(props) {
    super(props)

    this.state = {
      firstNum: "",
      firstDon: "",
      secondNum: "",
      secondDon: "",
      sumresult: "",
      subresult: "",
      multiresult: "",
      divresult: "",
      isOpen: false,
    }
  }

  multi = (x, y) => {
    return x * y
  }

  divide = (x, y) => {
    if (y !== 0) {
      return x / y
    } else {
      return "Not valid denominator"
    }
  }

  sum = (x, y) => {
    return x + y
  }

  sub = (x, y) => {
    return x - y
  }

  calc = (val1, val2) => {
    this.setState({
      sumresult: this.sum(val1, val2),
      subresult: this.sub(val1, val2),
      multiresult: this.multi(val1, val2),
      divresult: this.divide(val1, val2),
    })
  }

  numberToFraction = amount => {
    // This is a whole number and doesn't need modification.
    if (parseFloat(amount) === parseInt(amount)) {
      return amount
    }
    // Next 12 lines are cribbed from https://stackoverflow.com/a/23575406.
    var gcd = function (a, b) {
      if (b < 0.0000001) {
        return a
      }
      return gcd(b, Math.floor(a % b))
    }
    var len = amount.toString().length - 2
    var denominator = Math.pow(10, len)
    var numerator = amount * denominator
    var divisor = gcd(numerator, denominator)
    numerator /= divisor
    denominator /= divisor
    var base = 0
    // In a scenario like 3/2, convert to 1 1/2
    // by pulling out the base number and reducing the numerator.
    if (numerator > denominator) {
      base = Math.floor(numerator / denominator)
      numerator -= base * denominator
    }
    amount = Math.floor(numerator) + "/" + Math.floor(denominator)
    if (base) {
      amount = base + " " + amount
    }
    return amount
  }

  handleClick = e => {
    e.preventDefault()
    const { firstDon, secondDon } = this.state
    console.log(firstDon, secondDon)
    if (firstDon === "0" || secondDon === "0") {
      toast("Denominator can't be 0 ", {
        type: "error",
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else {
      const { firstNum, firstDon, secondNum, secondDon } = this.state
      this.val1 = firstNum / firstDon
      this.val2 = secondNum / secondDon
      this.calc(this.val1, this.val2)
      this.setState({ isOpen: true })
    }
  }

  render() {
    return (
      <Layout>
        <div className="lab2-second">
          <h1>Lab 2</h1>
          <div className="lab2-second-inner">
            <div className="ratios">
              <form className="first-form" onSubmit={this.handleClick}>
                <div className="rat">
                  <div className="first-ratio">
                    <h3>Ratio 2</h3>
                    <input
                      type="text"
                      required
                      name="firstNum"
                      value={this.state.firstNum}
                      placeholder="first numerator"
                      onChange={e =>
                        this.setState({ [e.target.name]: e.target.value })
                      }
                    />
                    <div className="line"></div>
                    <input
                      type="text"
                      name="firstDon"
                      required
                      value={this.state.firstDon}
                      placeholder="first denominator"
                      onChange={e =>
                        this.setState({ [e.target.name]: e.target.value })
                      }
                    />
                  </div>

                  <div className="first-ratio">
                    <h3>Ratio 2</h3>

                    <input
                      type="text"
                      name="secondNum"
                      required
                      value={this.state.secondNum}
                      placeholder="second numerator"
                      onChange={e =>
                        this.setState({ [e.target.name]: e.target.value })
                      }
                    />
                    <div className="line"></div>
                    <input
                      type="text"
                      name="secondDon"
                      required
                      value={this.state.secondDon}
                      placeholder="second denominator"
                      onChange={e =>
                        this.setState({ [e.target.name]: e.target.value })
                      }
                    />
                  </div>
                </div>

                <button className="calc-btn" type="submit">
                  Calulate
                </button>
              </form>
            </div>

            {this.state.isOpen && (
              <div className="results">
                <div className="result sum">
                  <h4>Sum result</h4>
                  <div className="answer">
                    <h4>
                      Ratio1 + Ratio2 = {this.state.sumresult.toFixed(2)} ~
                      {this.numberToFraction(this.state.sumresult.toFixed(2))}
                    </h4>
                  </div>
                </div>
                <div className="result sub">
                  <h4>Substract result</h4>
                  <div className="answer">
                    <h4>
                      Ratio1 - Ratio2 = {this.state.subresult.toFixed(2)} ~ -{" "}
                      {this.numberToFraction(
                        this.state.subresult.toFixed(2) * -1
                      )}
                    </h4>
                  </div>
                </div>
                <div className="result multi">
                  <h4>Multiplation result</h4>
                  <div className="answer">
                    <h4>
                      Ratio1 * Ratio2 = {this.state.multiresult.toFixed(2)} ~
                      {this.numberToFraction(this.state.multiresult.toFixed(1))}
                    </h4>
                  </div>
                </div>
                <div className="result divide">
                  <h4>Division result</h4>
                  <div className="answer">
                    <h4>
                      Ratio1 / Ratio2 ={" "}
                      {typeof this.state.divresult == "string"
                        ? this.state.divresult
                        : `${this.state.divresult.toFixed(
                            2
                          )} ~ ${this.numberToFraction(
                            this.state.divresult.toFixed(2)
                          )}`}
                    </h4>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Layout>
    )
  }
}

export default lab2
