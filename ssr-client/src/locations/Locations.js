// Import everything needed to use the `useQuery` hook
import { useQuery, gql } from "@apollo/client";

const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      id
      name
      description
      photo
    }
  }
`;

function DisplayLocations() {
  const { loading, error, data } = useQuery(GET_LOCATIONS, {
    ssr: true,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.locations.map(({ id, name, description, photo }) => (
    <div key={id}>
      <h3 onClick={() => alert("I am clicked " + name)}>{name}</h3>
      <img width="400" height="250" alt="location-reference" src={`${photo}`} />
      <br />
      <b>About this location:</b>
      <p>{description}</p>
      <br />
    </div>
  ));
}

const Locations = () => {
  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
      <br />
      <DisplayLocations />
    </div>
  );
};

export default Locations;
