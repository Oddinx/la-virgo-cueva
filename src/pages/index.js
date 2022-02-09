import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";

import PostSlider from "../components/Slider/PostSlider";

import CentralMenu from "../components/CentralBar/CentralMenu";

import PostSection from "../components/PostsSection/PostSection";
import TopBackGround from "../components/BackGrounds/TopBackGround";

const Index = ({ data }) => {
  return (
    <Layout className="virgomain">
      <TopBackGround data={data.contentfulGeneralmedia} />

      {data.contentfulSiteInformation.menus
        .filter((item) => item === "Blogs")
        .map((t) => {
          return <PostSlider key="Blogs" data={data.allContentfulBlogs} />;
        })}

      <CentralMenu></CentralMenu>

      {data.contentfulSiteInformation.menus
        .filter((item) => item === "Blogs")
        .map((t) => {
          return <PostSection key="Blogs" data={data.allContentfulBlogs} />;
        })}
    </Layout>
  );
};

export default Index;

export const pageQuery = graphql`
  query {
    allContentfulBlogs(limit: 8) {
      edges {
        node {
          title
          slug
          imagen {
            gatsbyImageData(width: 360)
            file {
              url
            }
          }
          descripcion {
            descripcion
          }
        }
      }
    }

    contentfulGeneralmedia {
      background {
        gatsbyImageData
      }
    }

    contentfulSiteInformation {
      menus
    }
  }
`;
