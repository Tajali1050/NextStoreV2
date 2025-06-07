export const getVideosQuery = `
  query getVideos($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Video {
        id
        sources {
          url
          format
        }
      }
    }
  }
`;
