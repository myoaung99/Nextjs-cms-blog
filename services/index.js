import { gql, GraphQLClient } from "graphql-request";

const url = `https://api-ap-northeast-1.graphcms.com/v2/${process.env.id}/master`;

const graphcms = new GraphQLClient(url);

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featurePhoto {
              url
            }
            categories {
              name
              slug
            }
            featurePost
          }
        }
      }
    }
  `;

  const result = await graphcms.request(query);
  return result.postsConnection.edges;
};

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails {
      posts(orderBy: createdAt_ASC, last: 3) {
        title
        featurePhoto {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const result = await graphcms.request(query);
  return result.posts;
};

export const getSimilarPosts = async () => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        featurePhoto {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const result = await graphcms.request(query);
  return result.posts;
};

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `;

  const result = await graphcms.request(query);
  return result.categories;
};
