import React from "react"
import Layout from "../components/layout"
import Img from "gatsby-image"

const IndexPage = ({ data }) => {
  // const { file: { childImageSharp: { fluid: fluid } } } = data

  return (
    <Layout>
      <div className="home">
        <div className="csu-logo">
          <Img fluid={data.file.childImageSharp.fluid} className="csu-img" />
        </div>
        <h1>Chicago State University</h1>
        <h3>Fall 2020</h3>
        <h3>5820 Alg. Software Eng. Web App Labs</h3>
        <h3>Instructor: Dr. John Chern</h3>
      </div>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  {
    file(relativePath: { eq: "csu_logo.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
