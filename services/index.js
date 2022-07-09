import { gql, GraphQLClient } from "graphql-request";
import slug from "../pages/post/[slug]";

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

export const getPostDetail = async (slug) => {
  const query = gql`
    query getPostDetail($slug: String!) {
      post(where: { slug: $slug }) {
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
        content {
          raw
        }
      }
    }
  `;

  const result = await graphcms.request(query, { slug });
  return result.post;
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

export const getSimilarPosts = async (
  currentPostSlug,
  currentPostCategories
) => {
  const query = gql`
    query GetPostDetails(
      $currentPostSlug: String!
      $currentPostCategories: [String!]
    ) {
      posts(
        where: {
          slug_not: $currentPostSlug
          AND: { categories_some: { slug_in: $currentPostCategories } }
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

  const result = await graphcms.request(query, {
    currentPostSlug,
    currentPostCategories,
  });
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

export const postComment = async (comment) => {
  const response = await fetch('/api/comment', {
    method: 'POST',
    body: JSON.stringify(comment),
    headers: {
      'Content-Type': 'application/json',
    }
  })

  return response.json();
}

export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: {post: {slug: $slug}}) {
        name
        createdAt
        comment
      }
    }
     `;

  const result = await graphcms.request(query, {slug});
  return result.comments;
}

export const getFeaturedPosts = async () => {
  const query = gql`
    query GetCategoryPost() {
      posts(where: {featurePost: true}) {
        author {
          name
          photo {
            url
          }
        }
        featurePhoto {
          url
        }
        title
        slug
        createdAt
      }
    }
  `;

  const result = await graphcms.request(query);

  return result.posts;
};

export const getCategoryPosts = async (slug) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      posts(where: {categories_some :{slug:  $slug}}) {
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
        
      }
    }
  `;

  const result = await graphcms.request(query, {slug});
  return result.posts;
};