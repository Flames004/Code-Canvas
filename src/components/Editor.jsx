import React, { useEffect, useState } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import { Controlled as ControlledEditor } from "react-codemirror2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompressAlt, faExpandAlt } from "@fortawesome/free-solid-svg-icons";
import { IoCopyOutline } from "react-icons/io5";

const Editor = (props) => {
  const { language, displayName, value, onChange, iconName, iconColor } = props;
  const [isClicked, setisClicked] = useState(false);

  const handleChange = (editor, data, value) => {
    onChange(value);
  };

  const copyToClipboard = (value) => {
    navigator.clipboard.writeText(value).then(() => {
      setisClicked(true);
      setTimeout(() => {
        setisClicked(false);
      }, 1000);
    });
  };

  const [open, setopen] = useState(true);

  return (
    <div
      className={`editor-container ${
        open ? "flex-grow" : "flex-grow-0 scroll-absolute"
      } flex flex-col py-3 px-2 bg-neutral-800`}
    >
      <div className="editor-title flex justify-between bg-zinc-900 text-white py-1 pl-4 pr-3 rounded-t-lg">
        <div className="flex gap-2 items-center mr-3">
          <span className={iconColor}>{iconName}</span>
          {displayName}
        </div>
        <div className="buttons flex items-center justify-between">
          <button
            onClick={() => {
              copyToClipboard(value);
            }}
            className={`cursor-pointer outline-none border-none text-lg ${
              isClicked ? "text-green-500" : "text-white"
            }`}
          >
            <IoCopyOutline />
          </button>
          <button
            onClick={() => setopen((prevOpen) => !prevOpen)}
            type="button"
            className="ml-2 cursor-pointer text-sm outline-none border-none"
          >
            <FontAwesomeIcon icon={open ? faCompressAlt : faExpandAlt} />
          </button>
        </div>
      </div>
      <ControlledEditor
        onBeforeChange={handleChange}
        value={value}
        className="code-mirror-wrapper flex-grow overflow-hidden rounded-b-lg"
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          lineNumbers: true,
          theme: "material",
        }}
      />
    </div>
  );
};

export default Editor;
