import { Box, Grid, Paper, Typography } from "@material-ui/core";
import React, { useRef } from "react";
import { useState } from "react";
import AceEditor from "react-ace";
// import 'ace-builds'
// import 'ace-builds/webpack-resolver';
import ReactDOM from "react-dom";
import Layout from "../../../components/Layout";
import "ace-builds/src-min-noconflict/mode-javascript";
import "ace-builds/src-min-noconflict/theme-tomorrow_night_eighties";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-min-noconflict/ext-spellcheck";
import "ace-builds/src-min-noconflict/snippets/javascript";
import "ace-builds/src-min-noconflict/ext-searchbox";
// import "ace-builds/webpack-resolver";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/worker-html";
import "ace-builds/src-noconflict/worker-javascript";
import "ace-builds/src-noconflict/snippets/html";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-xcode";

const ace = require("ace-builds/src-noconflict/ace");
ace.config.set(
  "basePath",
  "https://cdn.jsdelivr.net/npm/ace-builds@1.4.3/src-noconflict/"
);
ace.config.setModuleUrl(
  "ace/mode/javascript_worker",
  "https://cdn.jsdelivr.net/npm/ace-builds@1.4.3/src-noconflict/worker-javascript.js"
);

const HTMLEditorPage = () => {
  const aceEditorRef = useRef();
  const [value, setValue] = useState(`<!DOCTYPE html>
<html>
    <head>
      <meta http-equiv="content-type" content="text/html; charset=utf-8" />
      <title>HTML Editor</title>
      <style>
        table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
        }

        td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
        }

        tr:nth-child(even) {
        background-color: #dddddd;
        }
      </style>
    </head>
    <body>
      <main>
        <h2>HTML Table</h2>
        <table>
            <tr>
            <th>Company</th>
            <th>Contact</th>
            <th>Country</th>
            </tr>
            <tr>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Germany</td>
            </tr>
            <tr>
            <td>Centro comercial Moctezuma</td>
            <td>Francisco Chang</td>
            <td>Mexico</td>
            </tr>
            <tr>
            <td>Ernst Handel</td>
            <td>Roland Mendel</td>
            <td>Austria</td>
            </tr>
            <tr>
            <td>Island Trading</td>
            <td>Helen Bennett</td>
            <td>UK</td>
            </tr>
            <tr>
            <td>Laughing Bacchus Winecellars</td>
            <td>Yoshi Tannamuri</td>
            <td>Canada</td>
            </tr>
            <tr>
            <td>Magazzini Alimentari Riuniti</td>
            <td>Giovanni Rovelli</td>
            <td>Italy</td>
            </tr>
        </table>
      </main>
    </body>
</html>`);
  const onChange = (value) => {
    ReactDOM.findDOMNode(aceEditorRef.current).innerHTML = value;
  };

  const onPaste = (event) => {
    setValue(event.text);
  };

  return (
    <div>
      <Box marginBottom={2}>
        <Typography
          variant="h5"
          style={{ fontWeight: 700 }}
          color="textPrimary"
          gutterBottom
        >
          HTML Editor
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Belajar HTML menjadi semakin mudah!
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid xs={12} md={6} item>
          <AceEditor
            mode="html"
            theme="xcode"
            name="awesome-code"
            style={{
              width: "100%",
            }}
            ref={aceEditorRef}
            onChange={onChange}
            onPaste={onPaste}
            fontSize={14}
            showPrintMargin={true}
            focus={true}
            editorProps={{ $blockScrolling: true }}
            wrapEnabled={true}
            highlightActiveLine={true}
            autoScrollEditorIntoView={true}
            value={value}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 2,
              showGutter: true,
            }}
          />
        </Grid>
        <Grid xs={12} md={6} item>
          <Paper style={{ padding: 15 }}>
            <div ref={aceEditorRef} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Layout(HTMLEditorPage, "HTML Editor");
