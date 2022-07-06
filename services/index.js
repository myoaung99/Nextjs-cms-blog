import { gql, GraphQLClient } from "graphql-request";

const url = `https://api-ap-northeast-1.graphcms.com/v2/${process.env.id}/master`;

const graphcms = new GraphQLClient(url);

export const getPosts = async () => {
  const query = gql`
    {
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
