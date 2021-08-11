import { TextareaAutosize } from "@material-ui/core";
import React from "react";

const TextArea = () => {
  return (
    <TextareaAutosize
      maxRows={4}
      style={{
        width: "100%",
        minHeight: 100,
        border: "1px solid grey",
        resize: "none",
        padding: 10,
        borderRadius: 5,
        fontFamily: "Nunito",
      }}
      aria-label="maximum height"
      placeholder="Apa yang anda pikirkan?"
    />
  );
};

export default TextArea;
