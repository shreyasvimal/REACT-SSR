import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import path from "path";
import AppSSR from "./ssr-client/src/AppSSR";
import express from "express";
import fs from "fs";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { getDataFromTree } from "@apollo/client/react/ssr";

const app = express();
const port = 3009;

const bootstrapScripts = [];
const bootstrapCSS = [];
const staticPathRoot = "ssr-client/build/static";

const client = new ApolloClient({
  ssrMode: true,
  link: createHttpLink({
    uri: "https://flyby-router-demo.herokuapp.com/",
  }),
  cache: new InMemoryCache(),
});

const ReadDirectoryContentToArray = (folderPath, array) => {
  fs.readdir(path.join(__dirname, folderPath), (err, files) => {
    if (err) {
      return console.log(`Unable to scan this folder: ${folderPath}`);
    }

    files.forEach((fileName) => {
      if (
        (fileName.startsWith("main.") && fileName.endsWith(".js")) ||
        fileName.endsWith(".css")
      ) {
        array.push(`${folderPath}/${fileName}`);
      }
    });
  });
};

ReadDirectoryContentToArray(`${staticPathRoot}/js`, bootstrapScripts);
ReadDirectoryContentToArray(`${staticPathRoot}/css`, bootstrapCSS);

app.use(
  "/app/ssr-client/build/static",
  express.static(__dirname + "/ssr-client/build/static")
);
app.use(
  "/app/ssr-client/build",
  express.static(__dirname + "/ssr-client/build")
);

app.get("/app/*", (req, res) => {
  res.socket.on("error", (error) => console.log("Fatal error occured", error));

  let didError = false;

  getDataFromTree(
    <ApolloProvider client={client}>
      <StaticRouter location={req.url} basename="/app">
        <AppSSR bootStrapCSS={bootstrapCSS} bootStrapJS={bootstrapScripts} />
      </StaticRouter>
    </ApolloProvider>
  ).then((content) => {
    // console.log(client.cache);
    // console.log(content);
    const initialState = client.extract();

    // console.log(content);

    // console.log(initialState);
    // content =
    //   content +
    //   `
    //   <script>
    //     window.__APOLLO_STATE__=${JSON.stringify(initialState).replace(
    //       /</g,
    //       "\\u003c"
    //     )};
    //   </script>
    // `;
    // const stream = ReactDOMServer.renderToReadableStream(content);
    // res.statusCode = didError ? 500 : 200;
    // res.setHeader("Content-type", "text/html");
    // stream.push(res);

    // res.statusCode = didError ? 500 : 200;
    // res.setHeader("Content-type", "text/html");
    // res.send(content);
    // res.end();
    const stream = ReactDOMServer.renderToPipeableStream(
      <ApolloProvider client={client}>
        <StaticRouter location={req.url} basename="/app">
          <AppSSR bootStrapCSS={bootstrapCSS} state={initialState} />
        </StaticRouter>
      </ApolloProvider>,
      {
        bootstrapScripts,
        onShellReady: () => {
          res.statusCode = didError ? 500 : 200;
          res.setHeader("Content-type", "text/html");
          stream.pipe(res);
        },
        onError: (error) => {
          didError = true;
          console.log("Error", error);
        },
      }
    );
  });
});

app.get("/app", (req, res) => {
  res.redirect("/app/");
});

app.listen(port, () => {
  console.log(`Application started on port ${port}`);
});
