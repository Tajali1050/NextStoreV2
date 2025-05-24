
export const getSiteBannerQuery =`
  query SiteBanner {
  metaobjects(type: "site", first: 1) {
    nodes {
      id
      settings: field(key: "banner_settings") {
        value
      }
    }
  }
}

`