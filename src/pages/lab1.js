import React, { Component } from "react"
import Layout from "../components/layout"
import { IoMdSync, IoIosCloseCircleOutline } from "react-icons/io"
class Lab1 extends Component {
  constructor(props) {
    super(props)

    this.state = {
      studentNumber: "",
      scores: [],
      secondScores: [],
      scoreInput: "",
      isValid: true,
      isHidden: false,
    }
  }

  addScore = () => {
    let count = 0
    while (count < this.state.studentNumber) {
      this.setState(prev => {
        return {
          scores: [...prev.scores, this.createRandomNum(100)],
        }
      })
      count++
    }
  }

  handleClick = () => {
    this.setState(
      {
        studentNumber: "",
        scores: [],
      },
      () => {
        this.setState(
          {
            studentNumber: 10,
          },
          this.addScore
        )
      }
    )
  }

  createRandomNum = val => {
    const number = Math.floor(Math.random() * val) + 1

    return number
  }

  handleSubmit = e => {
    e.preventDefault()
    if (this.state.scoreInput > 100 || this.state.scoreInput < 0) {
      this.setState({
        isValid: false,
      })

      setTimeout(() => {
        this.setState({
          isValid: true,
          scoreInput: "",
        })
      }, 1000)
    } else {
      this.setState(prev => {
        return {
          secondScores: [...prev.secondScores, this.state.scoreInput],
          scoreInput: "",
        }
      })
    }
  }

  handleDelete = id => {
    this.setState(prev => {
      return {
        secondScores: prev.secondScores.filter((n, idx) => id !== idx),
      }
    })
  }

  render() {
    return (
      <Layout>
        <div className="lab1">
          <div className="lab1-first">
            <h1>Lab1 - 1a</h1>
            <div className="second-container">
              <div className="add-list">
                <h3 style={{ color: "White" }}>Student Score List</h3>
                {this.state.secondScores.length !== 0 ? (
                  <div className="score-list">
                    {this.state.secondScores.map((n, idx) => {
                      return (
                        <div className="student-score">
                          <div className="score-info">
                            <h4>
                              <b>Name:</b> Student{`${idx + 1}`}
                            </h4>
                            <h4
                              className={`scr ${
                                n >= 80
                                  ? "green"
                                  : n >= 60 && n < 80
                                  ? "orange"
                                  : n > 0 && n < 60
                                  ? "red"
                                  : ""
                              }`}
                            >
                              <span>Score: </span>
                              {n}
                            </h4>
                          </div>

                          <button
                            className="btn-delete"
                            onClick={() => this.handleDelete(idx)}
                          >
                            Delete
                          </button>
                        </div>
                      )
                    })}
                  </div>
                ) : null}
                <form onSubmit={this.handleSubmit}>
                  <div className="input-container">
                    <input
                      type="text"
                      autoComplete="off"
                      name="score"
                      required
                      placeholder="Enter the Score"
                      value={this.state.scoreInput}
                      onChange={e =>
                        this.setState({
                          scoreInput: e.target.value,
                        })
                      }
                    />
                    {!this.state.isValid && (
                      <div className="error">
                        <h4>Please enter the valid score</h4>
                      </div>
                    )}
                  </div>

                  <button type="submit" className="lab1-btn sm">
                    Add The List
                  </button>
                </form>

                <button
                  className="lab1-btn"
                  onClick={() =>
                    this.setState({ isHidden: !this.state.isHidden })
                  }
                >
                  Show Avarage
                </button>

                {this.state.isHidden && (
                  <div className="avg">
                    <h3>
                      Number of Students: {this.state.secondScores.length}
                    </h3>
                    <h3>
                      Total points:{" "}
                      {this.state.secondScores.reduce(
                        (a, c) => Number(a) + Number(c),
                        0
                      )}
                    </h3>
                    <h3>
                      Avarage Score:{" "}
                      {(
                        this.state.secondScores.reduce(
                          (a, c) => Number(a) + Number(c),
                          0
                        ) / this.state.secondScores.length
                      ).toFixed(2)}
                    </h3>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="lab1-second">
            <h1 className="title">Lab 1 - 1b</h1>
            <div className="fist-container">
              <button className="lab1-btn" onClick={this.handleClick}>
                Random Avarage
              </button>
              <div className="random-info">
                <h3>
                  Number of Students:{" "}
                  {this.state.studentNumber ? this.state.studentNumber : 0}
                </h3>
                <h3>
                  Total points:{" "}
                  {this.state.scores.length
                    ? this.state.scores.reduce((a, c) => a + c)
                    : 0}
                </h3>
                <h3>
                  Avarage Score:{" "}
                  {this.state.scores.length
                    ? (
                        this.state.scores.reduce((a, c) => a + c) /
                        this.state.studentNumber
                      ).toFixed(2)
                    : 0}
                </h3>
                <h3>
                  Students Scores: [{" "}
                  {this.state.scores
                    ? this.state.scores.map(
                        (score, idx) =>
                          `${score}${
                            idx !== this.state.scores.length - 1 ? ", " : ""
                          }`
                      )
                    : "[]"}{" "}
                  ]
                </h3>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Lab1
