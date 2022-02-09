import React, { Component } from "react";
import Container from "react-bootstrap/Container";

import arcade from "../../images/carl-raw-m3hn2Kn5Bns-unsplash.jpg";
import { GatsbyImage } from "gatsby-plugin-image";
export default class BlogBackGround extends Component {
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
