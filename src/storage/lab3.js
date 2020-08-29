import React, { useState } from "react"
import Layout from "../components/layout"
import Graph from "../graph/graph.js"
import GraphEdge from "../graph/graphEdge.js"
import GraphVertex from "../graph/graphVertex.js"
import Bellman from "../graph/bellman.js"

import {
  IoMdSync,
  IoIosCloseCircleOutline,
  IoIosArrowRoundForward,
} from "react-icons/io"
const Lab3 = () => {
  const [state, setstate] = useState({
    arr: Array.from({ length: 5 }).map(n => {
      return Array.from({ length: 5 }).fill("")
    }),
  })

  const [isresult, setResult] = useState(false)

  const [listobj, setListObj] = useState({
    arr: [],
  })

  const [name, setName] = useState({
    tablearr: [],
  })

  const [hide, setHide] = useState(false)
  const [nodes, setNodes] = useState("1")
  const [nodeName, setNodeName] = useState({
    namearr: Array.from({ length: 1 }).fill("A"),
  })
  const [isEntered, setEnter] = useState(false)
  const [isSelected, setSelect] = useState(false)
  const [isChecked, setChecked] = useState("option1")

  //   const { distances:distances1, previousVertices:previousVertices1 } = Bellman(graph, vertexA);
  //   const { distances:distances2, previousVertices:previousVertices2 } = Bellman(graph, vertexB);
  //   const { distances:distances3, previousVertices:previousVertices3 } = Bellman(graph, vertexC);
  //   const { distances:distances4, previousVertices:previousVertices4 } = Bellman(graph, vertexD);
  //   const { distances:distances5, previousVertices:previousVertices5 } = Bellman(graph, vertexE);

  const handleChange = e => {
    let strarr = e.target.name.split("-")
    let idx1 = strarr[0]
    let id1 = strarr[1]
    let val = e.target.value

    setstate(prev => {
      return {
        arr: prev.arr.map((n, idx) => {
          return n.map((m, id) => {
            if (idx1 == idx && id1 == id) {
              return val
            } else {
              return m
            }
          })
        }),
      }
    })
  }

  const selectChange = e => {
    setNodes(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    setHide(true)
    setSelect(true)

    setNodeName({
      namearr: Array.from({ length: nodes }).fill("A"),
    })
  }

  const handleNameChange = e => {
    let name = e.target.name
    let val = e.target.value

    setNodeName(prev => {
      return {
        namearr: prev.namearr.map((n, idx) => {
          if (String(idx) === name) {
            return val.toUpperCase()
          } else {
            return n
          }
        }),
      }
    })
  }

  const handleNameSubmit = e => {
    e.preventDefault()

    setName(prev => {
      return {
        tablearr: [" ", ...nodeName.namearr],
      }
    })
    setSelect(false)
    setEnter(true)
  }

  const vertexArr = []
  const edgeArr = []
  let listarr = []
  const listobjSecond = []

  const handleClick = () => {
    //console.log(state.arr)

    name.tablearr.slice(1).forEach(n => {
      window["vertex" + n] = new GraphVertex(n)
      vertexArr.push(window["vertex" + n])
    })

    state.arr.forEach((n, id) => {
      let firstName = name.tablearr.slice(1)[id]
      n.forEach((m, idx) => {
        if (m > 0 && m < 1000) {
          let secondName = name.tablearr.slice(1)[idx]
          window["edge" + firstName + secondName] = new GraphEdge(
            vertexArr[id],
            vertexArr[idx],
            Number(m)
          )
          edgeArr.push(window["edge" + firstName + secondName])
        }
      })
    })

    const graph = new Graph()

    edgeArr.forEach(n => {
      graph.addEdge(n)
    })

    vertexArr.forEach((n, id) => {
      const {
        distances: distances1,
        previousVertices: previousVertices1,
        list: list1,
      } = Bellman(graph, vertexArr[id])
      listarr.push(list1)
    })

    for (let i = 0; i < listarr.length; i++) {
      let objarr = []

      for (let j = 0; j < listarr.length; j++) {
        objarr.push(listarr[j][i])
      }

      listobjSecond.push(objarr)
    }

    const lastarr = listobjSecond[listobjSecond.length - 2]

    const arr = listobjSecond[listobjSecond.length - 1].map((n, idx) => {
      if (!n) {
        console.log(listarr[idx])
        return lastarr[idx]
      } else {
        return n
      }
    })

    const sarr = Array.from({ length: nodes }).map((n, idx) => {
      return Array.from({ length: nodes }).map((m, id) => {
        if (idx === id) {
          return 0
        } else {
          return "Infinity"
        }
      })
    })

    let newarr = [sarr, ...listobjSecond.slice(1, -1), arr]

    setListObj(prev => {
      return {
        arr: [...newarr],
      }
    })

    setResult(true)

    //  const edgeAB = new GraphEdge(vertexA, vertexB, 4);
    // const edgeAC = new GraphEdge(vertexA, vertexC, 2);
    // const edgeBE = new GraphEdge(vertexB, vertexE, 2);
    // const edgeBD = new GraphEdge(vertexB, vertexD, 3);
    // const edgeCD = new GraphEdge(vertexC, vertexD, 5)

    //   graph
    //   .addEdge(edgeAB)
    //   .addEdge(edgeAC)
    //     .addEdge(edgeBD)
    //   .addEdge(edgeCD)
    //   .addEdge(edgeBE)
  }

  if (listobj.arr.length > 2) {
    // const lastarr = listobj.arr[listobj.arr.length -2]
    // const arr = listobj.arr[listobj.arr.length-1].map((n,idx)=>{
    //                 if(!n){
    //                     return lastarr[idx]
    //                 }else {
    //                     return n
    //                 }
    // })
    // console.log(listobj.arr)
  }

  return (
    <Layout>
      <div className="lab3">
        <h1>Network Routing</h1>
        <div className="lab3-inner">
          <div className="lab3-input">
            <div className="node-number">
              {!hide && (
                <form className="select-form" onSubmit={handleSubmit}>
                  <label htmlFor="numnode">
                    Please Select the Number of Nodes{" "}
                  </label>
                  <select id="numnode" onChange={selectChange}>
                    <option value="1"> 1 </option>
                    <option value="2"> 2</option>
                    <option value="3"> 3 </option>
                    <option value="4"> 4 </option>
                    <option value="5"> 5 </option>
                    <option value="6"> 6 </option>
                    <option value="7"> 7 </option>
                  </select>
                  <div className="buttons">
                    <button type="submit" className="btn blue">
                      Continue <IoIosArrowRoundForward className="icon" />
                    </button>
                  </div>
                </form>
              )}
            </div>
            <div className="node-name">
              {isSelected && <h3>Please Enter The Node Names</h3>}
              {isSelected && (
                <form onSubmit={handleNameSubmit}>
                  {nodeName.namearr.map((n, idx) => {
                    return (
                      <input
                        name={`${idx}`}
                        onChange={handleNameChange}
                        value={n}
                        type="text"
                      />
                    )
                  })}
                  <div className="buttons">
                    <button type="submit" className="btn blue">
                      Continue <IoIosArrowRoundForward className="icon" />
                    </button>
                  </div>
                </form>
              )}
            </div>
            {isEntered && (
              <div className="input-box">
                <h3>Please enter the Original Cost</h3>
                <table>
                  <thead>
                    <tr>
                      {name.tablearr.map((n, idx) => {
                        return <th key={idx}>{n}</th>
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {name.tablearr.slice(1).map((n, idx) => {
                      return (
                        <tr key={idx}>
                          <th>{n}</th>
                          {name.tablearr.slice(1).map((n, id) => {
                            return (
                              <td key={id}>
                                <input
                                  type="text"
                                  name={`${idx}-${id}`}
                                  value={state.arr[idx][id]}
                                  onChange={handleChange}
                                ></input>
                              </td>
                            )
                          })}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>

                <div className="buttons">
                  <button className="btn blue" onClick={handleClick}>
                    <IoMdSync className="icon" />
                    Convert
                  </button>
                </div>
              </div>
            )}

            {isresult && listobj.arr.length > 0 && (
              <div className="results">
                {Array.from({ length: nodes }).map((item, num) => {
                  return (
                    <table>
                      <h3>t = {`${num}`}</h3>
                      <thead>
                        <tr>
                          {name.tablearr.map((n, idx) => {
                            return <th key={idx}>{n}</th>
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {name.tablearr.slice(1).map((m, idx) => {
                          return (
                            <tr key={idx}>
                              <th>{m}</th>
                              {Object.values(listobj.arr[num][idx]).map(val => {
                                return (
                                  <td>
                                    <span>{val}</span>
                                  </td>
                                )
                              })}
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Lab3
