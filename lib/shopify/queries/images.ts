import imageFragment from "../fragments/image";

export const getImagesQuery = /* GraphQL */ `
  ${imageFragment}
  query getImages($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on MediaImage {
        id
        image {
          ...image
        }
      }
    }
  }
`;
