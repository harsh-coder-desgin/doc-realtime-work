import { useEffect, useState, useRef } from 'react'
import { Editor } from "@tinymce/tinymce-react"
import { socket } from '../socket.js'
import './App.css'

function App() {
  const editorRef = useRef(null);
  const [messageboard, Setmessageboard] = useState('')
  const [content, setContent] = useState("");


  socket.emit('message', 'connceted form client')

  socket.on('helloserver', (message) => {
    console.log(message);
  });

  socket.on('joined-room', (helloroom) => {
    Setmessageboard(helloroom)
  });

  const hanldejoin = () => {
    socket.emit("join-room", 'room1');
  }

  useEffect(() => {
    if (!editorRef.current) {
      // return
    }

    const editor = editorRef.current;

    if (editorRef.current) {
      // const handleCursorMove = () => {
      const selection = editor.selection.getRng();
      const rect = selection.getBoundingClientRect();

      socket.emit("cursor-move", {
        left: rect.left,
        right: rect.right,
        top: rect.top,
        bottom: rect.bottom,
        height: rect.height,
        id: editor?.editorUid,
        startOffset: selection.startOffset,
      });
    }
    // editor.on("keyup click", handleCursorMove);

    // return () => {
    //   editor.off("keyup click", handleCursorMove);
    // };
    socket.on('cursor-update', (data) => {

      const editor = editorRef.current;
      if (!editor) return;

      let cursor = data.id

      cursor = document.createElement("div");
      cursor.style.position = "absolute";
      cursor.textContent = "|"
      cursor.id = "user1"

      cursor.style.pointerEvents = "none";
      cursor.style.left = `${Math.floor(data.left)}px`;
      cursor.style.right = `${Math.floor(data.right)}px`;
      cursor.style.top = `${Math.floor(data.top)}px`;
      cursor.style.bottom = `${Math.floor(data.bottom)}px`;
      const ans = editor.dom.get('user1');

      if (ans) {
        ans.style.left = `${Math.floor(data.left)}px`;
        ans.style.right = `${Math.floor(data.right)}px`;
        ans.style.top = `${Math.floor(data.top)}px`;
        ans.style.bottom = `${Math.floor(data.bottom)}px`;
      } else {
        editor.getBody().appendChild(cursor);
      }
    });
  }, [content]);

  const handleEditorChange = (value) => {
    setContent(value);
  }

  return (
    <>
      <div className='w-full'>
        <button className='px-4 py-4 bg-green-400' onClick={hanldejoin}>Join room</button>
        {messageboard && <Editor
          onInit={(evt, editor) => {
            editorRef.current = editor;
          }}
          apiKey={import.meta.env.VITE_TINYMCE_KEY}
          init={{
            plugins: [
              // Core editing features
              'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
              // Your account includes a free trial of TinyMCE premium features
              // Try the most popular premium features until Jan 13, 2026:
              'checklist', 'mediaembed', 'casechange', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'advtemplate', 'ai', 'uploadcare', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown', 'importword', 'exportword', 'exportpdf'
            ],
            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
            tinycomments_mode: 'embedded',
            tinycomments_author: 'Author name',
            mergetags_list: [
              { value: 'First.Name', title: 'First Name' },
              { value: 'Email', title: 'Email' },
            ],
            ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
            uploadcare_public_key: '804a032e9fa49a824fb3',
          }}
          initialValue='Welcome to TinyMCE!'
          onEditorChange={handleEditorChange}
        />}
      </div>
    </>
  )
}

export default App
