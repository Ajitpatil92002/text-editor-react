import React, { useEffect, useState } from "react";
import FeatureButtons from "./buttons";

const TextEditor = () => {
  const [content, setContent] = useState("enter a content");
  const [contentid, setContentid] = useState(null);

  const [activeBtn, setActiveBtn] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // handle text Editor using web api

  function handleTextEditor(cmd, value = "", id) {

    if (activeBtn === id) {
      // removing the active to inactive by setting null
      setActiveBtn(null);
    } else {

      //  checking whether the cmd is supported to the browser
      if (document.queryCommandSupported(cmd)) {

        document.execCommand(cmd, false, value);
        // setting active btn by its id
        setActiveBtn(id);
        
      } else {
        // alert if cmd is not supported
        alert("your browser is not supported");
      }
    }
  }

  const handleContentChange = (event) => {
    setContent(event.target.innerHTML);
  };

  useEffect(() => {
    // function to get data from database using express api
    async function getData(url) {
      const resp = await fetch(url);
      const { data } = await resp.json();
      
      // setting loding false because to innnerHTML
      setLoading(false);
      //adding data to the state with _id (just use some hacks to work properly)
      setContent(data.content);
      setContentid(data._id);

      // inserting data to the html element
      document.getElementById("editor").innerHTML = data.content;

      setLoading(false);
    }
    // calling get data function once the components is render with api url form env
    getData(import.meta.env.VITE_API_URL);
  }, []);


  //Edit content function which makes post request for api to save the changes of the content
  function editContent(params) {
    async function putData(url) {
      let bodyContent = JSON.stringify({
        editcontent: `${content}`,
        id: contentid,
      });
      let headersList = {
        "Content-Type": "application/json",
      };

      let resp = await fetch(url + "edit", {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      });
      const { data } = await resp.json();
      setContent(data);
      document.getElementById("editor").innerHTML = data;
    }
    putData(import.meta.env.VITE_API_URL);
  }

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
