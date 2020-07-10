import React, { useState } from "react"
import Layout from "../components/layout"
import { IoMdSync, IoIosCloseCircleOutline } from "react-icons/io"
const Lab2 = () => {

    let [val, setVal] = useState("");
    let [valObj, setObj] = useState({
        version: "",
        headerlength: "",
        totalLength: "",
        protocol: "",
        ip: "",
        dest: ""
    })
    const handleChange = (e) => {
        setVal(e.target.value);
    }

    const convert = (str) => {
        let newstr = ""
        for (let i = 0; i < str.length; i++, i++) {

            let val = str.slice(i, i + 2);
            newstr = newstr + `${parseInt(val, 16)}${(i === str.length - 2) ? "" : "."}`;


        }

        return newstr

    }

    const handleClick = () => {
        if (val.length === 40 && !/[G-Z]/g.test(`${val}`)) {
            setObj({

                version: val[0],
                headerlength: val[1] * 4,
                totalLength: parseInt(val.slice(4, 8), 16),
                protocol: parseInt(val.slice(18, 20), 16),
                ip: convert(val.slice(24, 32)),
                dest: convert(val.slice(32, 40))

            })
        } else {
            alert("Please enter valid value")
            setObj({

                version: "",
                headerlength: "",
                totalLength: "",
                protocol: "",
                ip: "",
                dest: ""

            })

        }

    }

    const handleReset = () => {
        setObj({

            version: "",
            headerlength: "",
            totalLength: "",
            protocol: "",
            ip: "",
            dest: ""

        })

        setVal("")
    }

    return (
        <Layout>
            <div className="lab2">
                <h1>Ip Datagram Converter</h1>
                <div className="lab2-inner">
                    <div className="card">
                        <div className="from">
                            <p>Enter number</p>
                            <input onChange={handleChange} value={val} type="text" name="from" className="box" />

                        </div>
                        <div className="buttons">

                            <button className="btn blue" onClick={handleClick} ><IoMdSync className="icon" />Convert</button>
                            <button className="btn red" onClick={handleReset}><IoIosCloseCircleOutline className="icon black" />  Reset</button>

                        </div>
                        <div className="result">
                            <div className="version">
                                <span>Verion :{valObj.version}</span>
                            </div>
                            <div className="answer length">
                                <span>Header Length : {valObj.headerlength}</span>
                            </div>
                            <div className="answer total">
                                <span>Total Length : {valObj.totalLength}</span>
                            </div>
                            <div className="answer data">
                                <span>Data size: {valObj.totalLength - valObj.headerlength}</span>
                            </div>
                            <div className="answer protocol">
                                <span>Protocol: {valObj.protocol}</span>
                            </div>

                            <div className="adress ip">
                                <input className="box" value={valObj.ip}></input>
                                <span>Source Ip adress</span>
                            </div>

                            <div className="adress dest">
                                <input className="box" value={valObj.dest}></input>
                                <span>Destination Ip adress</span>
                            </div>

                        </div>







                    </div>
                </div>


            </div>

        </Layout>
    )



}

export default Lab2