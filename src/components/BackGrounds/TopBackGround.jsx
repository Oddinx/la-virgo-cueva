import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import arcade from "../../images/carl-raw-m3hn2Kn5Bns-unsplash.jpg";

export default class TopBackGround extends Component {
  render() {
    const { data } = this.props;
    return (
      <>
        <Container>
          <GatsbyImage
            className="page-background-top"
            image={data.background.gatsbyImageData}
            loading="lazy"
          />
        </Container>
      </>
    );
  }
}
