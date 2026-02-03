import { useEffect, useState, useRef } from 'react'
import { Editor } from "@tinymce/tinymce-react"
// import { socket } from '../../socket.js'

function DocFile() {
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
      let finalans = null
      const dataall = tinyMCE.activeEditor.getContent()
      const contentreomve = editor.dom.get('user1');
      if (contentreomve?.outerHTML) {
        finalans = dataall.replace(contentreomve.outerHTML, '')
        if (finalans !== null) {
          socket.emit("content-all", {
            contentall: finalans
          })
        }
      }
      const selection = editor.selection.getRng();
      const rect = selection.getBoundingClientRect();

      socket.emit("cursor-move", {
        content: finalans,
        left: rect.left,
        right: rect.right,
        top: rect.top,
        bottom: rect.bottom,
        height: rect.height,
        id: editor?.editorUid,
        startOffset: selection.startOffset,
      });
    }

    socket.on("content-send", (incomingHTML) => {
      const editor = editorRef.current;
      let bookmark = null;
      bookmark = editor.selection.getBookmark(2, true);

      const currentHTML = editor.getContent();
      const removeNode = editor.dom.get("user1");

      let HTMLdata = currentHTML;
      if (removeNode?.outerHTML) {
        HTMLdata = currentHTML.replace(removeNode.outerHTML, "");
      }

      const parser = new DOMParser();
      const incomingDoc = parser.parseFromString(incomingHTML.contentall, "text/html");
      const ccincomingDoc = parser.parseFromString(HTMLdata, "text/html");
      const ccincomingParas = ccincomingDoc.body.children;
      const incomingParas = incomingDoc.body.children;

      for (let i = 0; i < incomingParas.length; i++) {
        if (!ccincomingParas[i]) {
          ccincomingDoc.body.appendChild(incomingParas[i].cloneNode(true));
        }
        else if (ccincomingParas[i].textContent !== incomingParas[i].textContent) {
          ccincomingParas[i].textContent = incomingParas[i].textContent;
        }
        if (ccincomingParas[i]?.children) {
          const selectionNode = editor.selection.getStart();
          if (!ccincomingParas[i].contains(selectionNode)) {
            ccincomingParas[i].replaceWith(incomingParas[i].cloneNode(true));
          }
          continue;
        }
      }
      editor.setContent(ccincomingDoc.body.innerHTML);
      editor.selection.moveToBookmark(bookmark);
    });

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
    return () => {
      socket.off("content-send");
    };
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

export default DocFile
