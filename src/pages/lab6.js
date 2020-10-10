import React, { useState } from "react"
import Layout from "../components/layout"
import { BinarySearchTree } from "../BST"
import { IoIosCloseCircleOutline } from "react-icons/io"
const tree = new BinarySearchTree()

const Lab6 = () => {
  const [node, setNode] = useState("")
  const [bfs, setBfs] = useState([])
  const [dfs, setDfs] = useState([])

  const handleClick = e => {
    e.preventDefault()

    tree.insert(Number(node))
    setBfs(tree.BFS())
    setDfs(tree.DFSInOrder())
    setNode("")
  }

  const handleReset = () => {
    setBfs([])
    setDfs([])
  }

  return (
    <Layout>
      <div className="lab4">
        <div className="form">
          <form>
            <input
              type="text"
              value={node}
              onChange={e => setNode(e.target.value)}
              placeholder="Please enter the value"
            ></input>
            <button onClick={handleClick}>Insert to Tree</button>
          </form>
        </div>
        <div className="results">
          <h2>Results</h2>

          <h3>BFS</h3>
          <div className="bfs">[{bfs ? bfs.map(n => `${n},`) : null}]</div>
          <h3>DFS: </h3>
          <div className="dfs">[{dfs ? dfs.map(n => `${n},`) : null}]</div>

          <button className="btn red" onClick={handleReset}>
            <IoIosCloseCircleOutline className="icon black" /> Reset
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default Lab6
