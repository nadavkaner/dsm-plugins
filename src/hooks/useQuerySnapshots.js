import { gql, useLazyQuery } from "@apollo/client";

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

function useQuerySnapshots() {
  const [getSnapshots, { called, loading, data, error }] = useLazyQuery(
    GET_SNAPSHOTS,
    {
      fetchPolicy: "no-cache",
    }
  );

  return { getSnapshots, called, loading, data, error };
}

export { useQuerySnapshots };
