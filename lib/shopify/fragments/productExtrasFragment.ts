export const productExtrasFragment = `
  fragment productExtrasFragment on Product {
  subtitle: metafield(namespace: "custom", key: "subtitle") {
    value
  }
  benefits: metafield(namespace: "custom", key: "benefits") {
    value
  }
  ratingAverage: metafield(namespace: "custom", key: "ratingAverage") {
    value
  }
  internalRatings: metafield(namespace: "custom", key: "internalRatings") {
    value
  }
  videos: metafield(namespace: "PDP", key: "videos") {
    value
  }
  beforeafter: metafield(namespace: "custom", key: "beforeafter") {
    value
  }
}
`;
