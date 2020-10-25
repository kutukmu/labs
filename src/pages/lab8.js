import React,{useState, useEffect} from "react"
import Layout from "../components/layout"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {HuffmanCoding} from "../huffman"


toast.configure()


const Lab8 = () =>{

    const Huffman = new HuffmanCoding();
    console.log(Huffman.init("Missipi"))
    const [numOfNode, setNumOfNodes] = useState("")
    const [hide, setHide] = useState(false)
    const [show, setShow]   = useState(false)
    const [isResult, setResult] = useState(false)
    const [inputArr, setInputArr] = useState([])
    const alphabet = ['a','b','c','d','e','f','g','h','i','j']
    const [codeArr, setCodeArr] = useState([])
    const [nameArr, setNameArr] = useState([])
    const [freq, setFreq] = useState({});

    const sortfreq = (freqs) => {
        var letters = [];
        for (var ch in freqs){
            letters.push([freqs[ch],ch]);
        }
        return letters.sort();
    
    }

    const  buildtree = (letters) => {
        while(letters.length>1){
            var leasttwo = letters.slice(0,2);
            var therest = letters.slice(2,letters.length);
            var combfreq = letters[0][0] + letters[1][0];
            letters = therest;
            //console.log(letters);
            var two = [combfreq,leasttwo];
            letters.push(two);
            //console.log(letters);
            letters.sort();
    }
        return letters[0];
    }

    const  trimtree = (tree) => {
        var p = tree[1];
        if (typeof p === 'string'){
            return p;
    }
        else
    {
            return (Array(trimtree(p[0]),trimtree(p[1])));
    }
    }

    var codes = {}; 
function assigncodes(node,pat){
    pat = pat || "";
    if(typeof(node) == typeof("")){
        codes[node] = pat;
    }
    else{
        assigncodes(node[0],pat+"0");
        assigncodes(node[1],pat+"1");
    }
    setCodeArr(codes)
    return codes;
}


    

    const handleClick = (e)=>{

    setNumOfNodes(e.target.value)
    
   
    }

    const handleChange = (e, idx) => {

        e.persist()
        let val  = alphabet[idx].toUpperCase()
        setFreq(prev => {
            return {
                ...prev,
                 [val] : Number(e.target.value)/100
            }
        })
        
        console.log(freq)
        setInputArr(prev =>{
            return prev.map((item,id) => id === idx ? e.target.value: item)
        })
    }

    const handleCalculate = ()=>{
        let total = inputArr.reduce((a,c) => a + Number(c), 0)
       
        if(total !== 100){
            toast("Total Should be 100", {
                type: "error",
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              })
        }else{
            const tuple  = sortfreq(freq)
            console.log(tuple)
            const tree = buildtree(tuple)
            const node = trimtree(tree)
            const ass = assigncodes(node)
            setResult(true)
            setNameArr(Object.keys(ass))


        }
    }


    useEffect(()=>{
        setInputArr(Array.from({length: numOfNode}).fill(""))
    }, [numOfNode])



    return <Layout>
    <div className="huffman">
        <div className="enter-num">
        <h1>Huffman Coding</h1>
          {!hide &&  <form>
            <label>Please enter the number of nodes</label>
                <input value={numOfNode} onChange={handleClick}/>
                <button className="btn" onClick={()=>{
                    setHide(true)
                    setShow(true)
                    }}>Continue</button>
            </form>} 
        </div>

        {show && <div className="codes-inputs">
        <h3>Please enter the codes </h3>
        <div className="inputs">
        {inputArr.map((item, idx) =>{
                return <div className="input-container">
                <label>Code {alphabet[idx].toUpperCase()}</label>
                <input key={idx} value={item} onChange={(e) => handleChange(e,idx)}/>
                </div>
            })}
        </div>
           <button onClick={handleCalculate}>Calculate</button>
        </div> }


       {isResult && <div>
       <h3>Results</h3>
           {Object.values(codeArr).map((item,idx) => {
               return <div>
                    <span><b>{nameArr[idx].toUpperCase()}</b></span>
                    <span>:  </span>
                    <span>{item}</span>
               </div>
           })}
       </div>} 
    </div>
    </Layout>


}


export default Lab8