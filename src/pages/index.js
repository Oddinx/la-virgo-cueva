import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";

import PostSlider from "../components/Slider/PostSlider";

import CentralMenu from "../components/CentralBar/CentralMenu";

import PostSection from "../components/PostsSection/PostSection";
import TopBackGround from "../components/BackGrounds/TopBackGround";
import { Container } from "react-bootstrap";

import SEO from "../components/SEO";

import Juegos from "../components/PostsSection/Juegos";

import Reviews from "../components/PostsSection/Reviews";

const Index = ({ data }) => {
  return (
    <Layout className="virgomain" data={data}>
      <SEO
        title={data.contentfulSiteInformation.siteName}
        keywords={[
          `Oddinx`,
          `Comics`,
          `Manga`,
          `VideoJuegos`,
          `Gamer`,
          `Anime`,
          `Friki`,
          `Otaku`,
        ]}
      />
      <Container>
        <TopBackGround data={data.contentfulGeneralmedia} />
        {data.contentfulSiteInformation.menus
          .filter((item) => item === "Blogs")
          .map((t) => {
            return <PostSlider key="Blogs" data={data.allContentfulBlogs} />;
          })}
      </Container>
      <CentralMenu></CentralMenu>

      {data.contentfulSiteInformation.menus
        .filter((item) => item === "Blogs")
        .map((t) => {
          return <PostSection key="Blogs" data={data.allContentfulBlogs} />;
        })}

      {data.contentfulSiteInformation.menus
        .filter((item) => item === "Blogs")
        .map((t) => {
          return <Juegos key="Blogs" data={data.Juegos} />;
        })}

      {data.contentfulSiteInformation.menus
        .filter((item) => item === "Blogs")
        .map((t) => {
          return <Reviews key="Blogs" data={data.Reviews} />;
        })}
    </Layout>
  );
};

export default Index;

export const pageQuery = graphql`
  query {
    allContentfulBlogs(
      limit: 4
      filter: { metadata: { tags: { elemMatch: { name: { eq: "Blogs" } } } } }
    ) {
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

    Reviews: allContentfulBlogs(
      limit: 4
      filter: { metadata: { tags: { elemMatch: { name: { eq: "Reviews" } } } } }
    ) {
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

    Juegos: allContentfulBlogs(
      limit: 4
      filter: { metadata: { tags: { elemMatch: { name: { eq: "Juegos" } } } } }
    ) {
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
      siteName
      siteUrl
      siteDescription
    }
  }
`;
