var path = require("path");

const { paginate } = require("gatsby-awesome-pagination");

var _ = require("lodash");

const PAGE_SIZE = 9;

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const blogtemplate = path.resolve("./src/Templates/blogtemplate.jsx");
  const blogListTemplate = path.resolve(`src/Templates/BlogList.js`);

  const JuegosListTemplate = path.resolve(`src/Templates/JuegosList.js`);

  const ReviewListTemplate = path.resolve(`src/Templates/ReviewList.jsx`);

  const result = await graphql(`
    {
      allContentfulBlogs(limit: 100) {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    );
    return;
  }

  let chunks = _.chunk(result.data.allContentfulBlogs.edges, PAGE_SIZE);
  const posts = result.data.allContentfulBlogs.edges;
  const numPages = Math.ceil(posts.length / PAGE_SIZE);

  chunks.forEach((chunk, index) => {
    if (index == 0) {
      createPage({
        path: `BlogList`,
        component: blogListTemplate,
        context: {
          skip: PAGE_SIZE * index,
          limit: PAGE_SIZE,
          pageNumber: index + 1,
          hasNextPage: index != chunks.length - 1,
          nextPageLink: `/BlogList/${index + 2}`,

          numPages,
        },
      });
    }
    createPage({
      path: `BlogList/${index + 1}`,
      component: blogListTemplate,
      context: {
        skip: PAGE_SIZE * index,
        limit: PAGE_SIZE,
        pageNumber: index + 1,
        hasNextPage: index != chunks.length - 1,
        nextPageLink: `/BlogList/${index + 2}`,
        hasPrevious: index != 0,
        previousPageLink: `/BlogList/${index--}`,
        isOne: index != 1,

        numPages,
      },
    });
  });

  result.data.allContentfulBlogs.edges.forEach((edge) => {
    createPage({
      path: edge.node.slug,
      component: blogtemplate,
      context: {
        slug: edge.node.slug,
      },
    });
  });

  const Juegos = await graphql(`
    {
      allContentfulBlogs(
        filter: {
          metadata: { tags: { elemMatch: { name: { eq: "Juegos" } } } }
        }
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
    }
  `);

  if (Juegos.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      Juegos.errors
    );
    return;
  }

  let Jogos = _.chunk(Juegos.data.allContentfulBlogs.edges, PAGE_SIZE);
  const Juegosposts = Juegos.data.allContentfulBlogs.edges;
  const JuegosnumPages = Math.ceil(Juegosposts.length / PAGE_SIZE);

  Jogos.forEach((chunk, index) => {
    if (index == 0) {
      createPage({
        path: `JuegosList`,
        component: JuegosListTemplate,
        context: {
          skip: PAGE_SIZE * index,
          limit: PAGE_SIZE,
          pageNumber: index + 1,
          hasNextPage: index != Jogos.length - 1,
          nextPageLink: `/JuegosList/${index + 2}`,

          JuegosnumPages,
        },
      });
    }
    createPage({
      path: `JuegosList/${index + 1}`,
      component: JuegosListTemplate,
      context: {
        skip: PAGE_SIZE * index,
        limit: PAGE_SIZE,
        pageNumber: index + 1,
        hasNextPage: index != Jogos.length - 1,
        nextPageLink: `/JuegosList/${index + 2}`,
        hasPrevious: index != 0,
        previousPageLink: `/JuegosList/${index--}`,
        isOne: index != 1,

        JuegosnumPages,
      },
    });
  });

  const Reviews = await graphql(`
    {
      allContentfulBlogs(
        filter: {
          metadata: { tags: { elemMatch: { name: { eq: "Reviews" } } } }
        }
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
    }
  `);

  if (Reviews.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      Reviews.errors
    );
    return;
  }

  let Reseñas = _.chunk(Reviews.data.allContentfulBlogs.edges, PAGE_SIZE);
  const Reviewposts = Reviews.data.allContentfulBlogs.edges;
  const ReviewnumPages = Math.ceil(Reviewposts.length / PAGE_SIZE);

  Jogos.forEach((chunk, index) => {
    if (index == 0) {
      createPage({
        path: `ReviewList`,
        component: ReviewListTemplate,
        context: {
          skip: PAGE_SIZE * index,
          limit: PAGE_SIZE,
          pageNumber: index + 1,
          hasNextPage: index != Reseñas.length - 1,
          nextPageLink: `/ReviewList/${index + 2}`,

          ReviewnumPages,
        },
      });
    }
    createPage({
      path: `ReviewList/${index + 1}`,
      component: ReviewListTemplate,
      context: {
        skip: PAGE_SIZE * index,
        limit: PAGE_SIZE,
        pageNumber: index + 1,
        hasNextPage: index != Reseñas.length - 1,
        nextPageLink: `/ReviewList/${index + 2}`,
        hasPrevious: index != 0,
        previousPageLink: `/ReviewList/${index--}`,
        isOne: index != 1,

        ReviewnumPages,
      },
    });
  });
};
