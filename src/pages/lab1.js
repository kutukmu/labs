import React, { useState } from "react"
import Layout from "../components/layout"
import { IoMdSync, IoIosCloseCircleOutline } from "react-icons/io"
const Lab1 = () => {

    const [from, setFrom] = useState("binary");
    const [err, setErr] = useState(false);
    const [errval, setErrval] = useState("")
    const [to, setTo] = useState("decimal");
    const [fromval, setFromval] = useState("")
    const [obj, setObj] = useState([
        { name: "binary", value: "" },
        { name: "decimal", value: "" },
        { name: "hexa", value: "" }
    ])

    let arr = [from, to]
    const reset = () => {
        setObj([
            { name: "binary", value: "" },
            { name: "decimal", value: "" },
            { name: "hexa", value: "" }
        ])
    }

    const handleChange = (e) => {
        if (e.target.name === "from") {
            setFrom(e.target.value)

            setFromval("")
            reset()


        }

        if (e.target.name === "to") {
            setTo(e.target.value)
            reset()


        }

    }

    let strval = String(fromval)
    let strarr = strval.split("")

    const binaryError = (point) => {

        if (point === "binary" && strarr.some(n => (n > 1))) {
            setErr(true)
            setErrval("Binary values are just 0 and 1 ")
        }
    }

    const handleConvert = (point, target) => {

        binaryError(point)

        setTimeout(() => {
            setErr(false)
        }, 2000)

        reset()




        if (point === "binary" && (target === "decimal" || target === "hexa") && strarr.every(n => (n >= 0 && n <= 1))) {
            let decval = parseInt(fromval, 2)
            let hexval = decval.toString(16).toUpperCase();

            setObj(prev => {
                return prev.map(n => {
                    if (n.name === "decimal") {
                        return { name: "decimal", value: decval }
                    }

                    if (n.name === "hexa") {
                        return { name: "hexa", value: hexval }
                    } else {
                        return n
                    }
                })
            })

        }

        if (point === "decimal" && (target === "binary" || target === "hexa")) {
            let binval = Number(fromval).toString(2)
            let hexval = Number(fromval).toString(16).toUpperCase()
            console.log(hexval)
            setObj(prev => {
                return [

                    { name: "binary", value: binval },
                    { name: "hexa", value: hexval }
                ]
            })

        }

        if (point === "hexa" && (target === "binary" || target === "decimal")) {
            let binval = (parseInt(fromval, 16).toString(2)).padStart(8, '0');
            let decval = parseInt(fromval, 16);

            setObj(prev => {
                return [

                    { name: "binary", value: binval },
                    { name: "decimal", value: decval }
                ]
            })
        }








    }


    function handleInput(e) {
        setFromval(e.target.value)
    }

    function boxVal() {
        if (!arr.includes("hexa")) {
            return obj.find(n => n.name === "hexa").value
        } else if (!arr.includes("binary")) {
            return obj.find(n => n.name === "binary").value
        } else if (!arr.includes("decimal")) {
            return obj.find(n => n.name === "decimal").value
        }
    }

    const handleReset = () => {

        setFrom("binary");
        setTo("decimal")
        setFromval("")
        reset()



    }






    return (
        <Layout>
            <div className="lab1">
                <h1>Number Converter</h1>
                <div className={`error ${(err) ? "show" : null}`}>
                    <div className="error-text">
                        <p><b>Error</b> <br />  {errval}</p>
                    </div>
                </div>
                <div className="lab1-inner">

                    <div className="selectors">
                        <div className="from">
                            <h3>From</h3>
                            <select id="from" name="from" value={from} onChange={handleChange}>
                                <option value="binary">Binary</option>
                                <option value="decimal">Decimal</option>
                                <option value="hexa">Hexadecimal</option>
                            </select>
                        </div>

                        <div className="to">
                            <h3>To</h3>
                            <select id="to" name="to" onChange={handleChange} value={to}>
                                <option value="decimal">Decimal</option>
                                <option value="binary">Binary</option>
                                <option value="hexa">Hexadecimal</option>
                            </select>
                        </div>

                    </div>
                    <div className="card">
                        <div className="from">
                            <p>Enter {from} number</p>
                            <input type="text" value={fromval} name="from" onChange={handleInput} className="box" />
                            <span>Base {(from === "binary") ? "2" : (from === "decimal") ? "10" : (from === "hexa") ? "16" : null}</span>
                        </div>
                        <div className="buttons">

                            <button className="btn blue" onClick={() => handleConvert(from, to)}><IoMdSync className="icon" />Convert</button>
                            <button className="btn red" onClick={handleReset}><IoIosCloseCircleOutline className="icon black" />  Reset</button>

                        </div>

                        <div className="result">
                            <div className="inner first">
                                <p>{to[0].toUpperCase() + to.slice(1)} result</p>
                                <input className="box" value={obj.find(n => n.name === to).value}></input>
                                <span>Base {(to === "binary") ? "2" : (to === "decimal") ? "10" : (to === "hexa") ? "16" : null}</span>
                            </div>
                            <div className="inner second">
                                <p>{(!arr.includes("hexa")) ? "Hexa" : (!arr.includes("decimal")) ? "Decimal" : (!arr.includes("binary")) ? "Binary" : null} result</p>
                                <input className="box" value={boxVal()}></input>
                                <span>Base {(!arr.includes("hexa")) ? "16" : (!arr.includes("decimal")) ? "10" : (!arr.includes("binary")) ? "2" : null}</span>
                            </div>


                        </div>





                    </div>
                </div>
            </div>
        </Layout>
    )



}

export default Lab1