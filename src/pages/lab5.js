import React, { useState } from "react"
import Layout from "../components/layout"
import { IoMdSync } from "react-icons/io"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
toast.configure()
const Lab5 = () => {
  const [from, setFrom] = useState("decimal")
  const [to, setTo] = useState("binary")
  const [fromval, setFromval] = useState("")
  const [obj, setObj] = useState([
    { name: "decimal", value: "" },
    { name: "binary", value: "" },

    { name: "hexa", value: "" },
  ])

  let arr = [from, to]

  const handleChange = e => {
    if (e.target.name === "from") {
      setFrom(e.target.value)

      setFromval("")
      setObj([
        { name: "decimal", value: "" },
        { name: "binary", value: "" },
        { name: "hexa", value: "" },
      ])
    }

    if (e.target.name === "to") {
      setTo(e.target.value)

      setObj([
        { name: "binary", value: "" },
        { name: "decimal", value: "" },
        { name: "hexa", value: "" },
      ])
    }
  }

  const handleConvert = (point, target) => {
    // if (point === "binary" && (target === "decimal" || target === "hexa")) {
    //   let decval = parseInt(fromval, 2)
    //   let hexval = decval.toString(16).toUpperCase()

    //   setObj(prev => {
    //     return prev.map(n => {
    //       if (n.name === "decimal") {
    //         return { name: "decimal", value: decval }
    //       }

    //       if (n.name === "hexa") {
    //         return { name: "hexa", value: hexval }
    //       } else {
    //         return n
    //       }
    //     })
    //   })
    // }

    if (point === "decimal" && (target === "binary" || target === "hexa")) {
      const decToBi = num => {
        if (!isNaN(num)) {
          return num === 0 ? 0 : (num % 2) + 10 * decToBi(Math.floor(num / 2))
        } else {
          setObj([
            { name: "binary", value: "" },
            { name: "decimal", value: "" },
          ])
          toast("Not valid Input ", {
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

      const val = decToBi(Number(fromval))
      if (val) {
        setObj(prev => {
          return [{ name: "binary", value: val }]
        })
      }
    }

    // if (point === "hexa" && (target === "binary" || target === "decimal")) {
    //   let binval = parseInt(fromval, 16).toString(2).padStart(8, "0")
    //   let decval = parseInt(fromval, 16)

    //   setObj(prev => {
    //     return [
    //       { name: "binary", value: binval },
    //       { name: "decimal", value: decval },
    //     ]
    //   })
    // }
  }

  function handleInput(e) {
    setFromval(e.target.value)
  }

  return (
    <Layout>
      <div className="lab5">
        <div className="lab5-inner">
          <div className="selectors">
            <div className="from">
              <h3>From</h3>
              <select
                id="from"
                name="from"
                value={from}
                onChange={handleChange}
              >
                <option value="decimal">Decimal</option>
              </select>
            </div>

            <div className="to">
              <h3>To</h3>
              <select id="to" name="to" onChange={handleChange} value={to}>
                <option value="binary">Binary</option>
              </select>
            </div>
          </div>
          <div className="card">
            <div className="from">
              <p>Enter {from} number</p>
              <input
                type="text"
                value={fromval}
                name="from"
                onChange={handleInput}
                className="box"
              />
              <span>
                Base{" "}
                {from === "binary"
                  ? "2"
                  : from === "decimal"
                  ? "10"
                  : from === "hexa"
                  ? "16"
                  : null}
              </span>
            </div>
            <div className="buttons">
              <button
                className="btn blue"
                onClick={() => handleConvert(from, to)}
              >
                <IoMdSync className="icon" />
                Convert
              </button>
            </div>

            <div className="result">
              <div className="inner first">
                <p>{to[0].toUpperCase() + to.slice(1)} result</p>
                <input
                  className="box"
                  value={obj.find(n => n.name === to).value}
                ></input>
                <span>
                  Base{" "}
                  {to === "binary"
                    ? "2"
                    : to === "decimal"
                    ? "10"
                    : to === "hexa"
                    ? "16"
                    : null}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Lab5
