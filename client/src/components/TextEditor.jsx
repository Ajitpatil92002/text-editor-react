import React, { useEffect, useState } from "react";
import FeatureButtons from "./buttons";

const TextEditor = () => {
  const [content, setContent] = useState("enter a content");
  const [contentid, setContentid] = useState(null);

  const [activeBtn, setActiveBtn] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData(url) {
      const resp = await fetch(url);
      const { data } = await resp.json();
      setContent(data.content);
      setContentid(data._id);
      document.getElementById("editor").innerHTML = data.content;
    }
    getData(import.meta.env.VITE_API_URL);
    setLoading(false);
  }, []);

  function editContent(params) {
    async function putData(url) {
      let bodyContent = JSON.stringify({
        editcontent: `${content}`,
        id: contentid,
      });
      let headersList = {
        "Content-Type": "application/json",
      };

      let resp = await fetch(url+"edit", {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      });
      const { data } = await resp.json();

      setContent(data);
      document.getElementById("editor").innerHTML = data;
      setLoading(true);
      setLoading(false);
    }
    putData(import.meta.env.VITE_API_URL);
  }

  function handleTextEditor(cmd, value = "", id) {
    if (activeBtn === id) {
      setActiveBtn(null);
    } else {
      if (document.queryCommandSupported(cmd)) {
        document.execCommand(cmd, false, value);
        setActiveBtn(id);
      } else {
        alert("your browser is not supported");
      }
    }
  }

  const handleContentChange = (event) => {
    setContent(event.target.innerHTML);
  };

  return (
    <>
      {!loading ? (
        <>
          <div className="border border-black mt-4 w-[1000px] ">
            <div className="flex justify-start items-center p-4 w-[800px] space-x-1">
              {FeatureButtons.map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => {
                    handleTextEditor(btn.cmd, btn.value, btn.id);
                  }}
                  className={`p-2 hover:bg-slate-200 ${
                    activeBtn === btn.id && "bg-slate-300"
                  }`}
                >
                  {btn.icon ? (
                    <btn.icon size={20} fontWeight={300} />
                  ) : (
                    btn.value
                  )}
                </button>
              ))}
            </div>
            <div className="p-1 border-t border-t-black">
              <div
                contentEditable={"true"}
                suppressContentEditableWarning
                onInput={(e) => handleContentChange(e)}
                spellCheck={false}
                id="editor"
                className="w-[800px] h-[400px] p-4"
              ></div>
            </div>
          </div>
          <button
            onClick={() => editContent()}
            className="border border-black px-6 py-4 my-4 hover:bg-slate-100"
          >
            Save
          </button>
        </>
      ) : (
        "loading please wait ..."
      )}
    </>
  );
};

export default TextEditor;
