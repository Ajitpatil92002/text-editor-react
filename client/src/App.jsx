import TextEditor from "./components/TextEditor";
function App() {
  return (
    <>
      <div className="container m-10">
        <h1 className="text-2xl font-bold">
          Rich Text Editor, What ever You Type it get saves permanently in databse{" "}
        </h1>
        <TextEditor />
      </div>
    </>
  );
}

export default App;
