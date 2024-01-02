import App from "./App";
import PropTypes from "prop-types";

const AppSSR = ({ bootStrapCSS, bootStrapJS, state = {} }) => {
  console.log("Rendering App component on server-side");
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>SSR React 18 example</title>
        {bootStrapCSS.map((cssPath) => (
          <link key={cssPath} rel="stylesheet" href={cssPath}></link>
        ))}
      </head>
      <body>
        <div id="root">
          <App />
        </div>
      </body>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(
            /</g,
            "\\u003c"
          )};`,
        }}
      />
      {/* {bootStrapJS.map((jsPath) => (
        <script key={jsPath} src={jsPath}></script>
      ))} */}
    </html>
  );
};

AppSSR.propTypes = {
  bootStrapCSS: PropTypes.arrayOf(PropTypes.string).isRequired,
  bootStrapJS: PropTypes.arrayOf(PropTypes.string).isRequired,
  state: PropTypes.any,
};

export default AppSSR;
