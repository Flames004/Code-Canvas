import React, { useEffect, useState } from "react";
import Editor from "./Editor";
import useLocalStorage from "../hooks/useLocalStorage";

import { FaCode } from "react-icons/fa6";
import { DiCssTricks } from "react-icons/di";
import { PiBracketsCurlyBold } from "react-icons/pi";

const App = () => {
  const [html, sethtml] = useLocalStorage("html", "");
  const [css, setcss] = useLocalStorage("css", "");
  const [js, setjs] = useLocalStorage("js", "");
  const [srcDoc, setsrcDoc] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setsrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `);
    }, 500);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <>
      <div className="pane top-pane flex h-[49vh] bg-neutral-800">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={sethtml}
          iconName={<FaCode />}
          iconColor = "text-red-500"
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setcss}
          iconName={<DiCssTricks />}
          iconColor = "text-sky-500"
        />
        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setjs}
          iconName={<PiBracketsCurlyBold />}
          iconColor = "text-yellow-300"
        />
      </div>
      <div className="pane h-[51vh]">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  );
};

export default App;
