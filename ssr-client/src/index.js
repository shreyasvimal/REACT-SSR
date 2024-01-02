import React from "react";
import ReactDOMClient from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import "./index.css";
import App from "./App";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

const client = new ApolloClient({
  ssrMode: true,
  uri: "https://flyby-router-demo.herokuapp.com/",
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
});

// const client = ...

// client
//   .query({
//     query: gql`
//       query GetLocations {
//         locations {
//           id
//           name
//           description
//           photo
//         }
//       }
//     `,
//   })
//   .then((result) => console.log(result));

ReactDOMClient.hydrateRoot(
  document.getElementById("root"),
  <ApolloProvider client={client}>
    <BrowserRouter basename="/app">
      <App />
    </BrowserRouter>
  </ApolloProvider>
);
