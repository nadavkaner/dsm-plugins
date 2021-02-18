import { gql } from "@apollo/client";

const GET_SNAPSHOTS = gql`
  query GetSnapshots($organizationName: String, $styleguideName: String) {
    styleguide(
      organizationName: $organizationName
      styleguideName: $styleguideName
    ) {
      _id
      name
      snapshots {
        name
        styleguide {
          colors {
            _id
            name
            value
            externalLibraryId
            assetId
          }
        }
      }
    }
  }
`;

export { GET_SNAPSHOTS };
