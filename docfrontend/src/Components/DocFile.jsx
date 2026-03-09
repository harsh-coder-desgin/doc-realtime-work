import { useEffect, useState, useRef } from 'react'
import { Editor } from "@tinymce/tinymce-react"
import { socket } from '../../socket.js'

function DocFile() {
  const editorRef = useRef(null);
  const [messageboard, Setmessageboard] = useState('')
  const [content, setContent] = useState("");

  socket.emit('message', 'connceted form client')

  // socket.on('helloserver', (message) => {
  //   console.log(message);
  // });

  socket.on('joined-room', (helloroom) => {
    Setmessageboard(helloroom)
  });

  const hanldejoin = () => {
    socket.emit("join-room", 'room1');
  }

useEffect(() => {
  const editor = editorRef.current;
  if (!editor) return;

  // -------- SEND CONTENT --------
  let content = editor.getContent();

  const cursors = editor.getBody().querySelectorAll("[id^='cursor-']");
  cursors.forEach((cursor) => {
    content = content.replace(cursor.outerHTML, "");
  });

  socket.emit("content-all", {
    contentall: content
  });

  // -------- SEND CURSOR --------
  const selection = editor?.selection?.getRng();
  if (!selection) return;

  let rect = selection.getBoundingClientRect();

  // if (!rect || rect.height === 0) {
  //   const rects = selection.getClientRects();
  //   if (rects.length > 0) rect = rects[0];
  // }

  if (!rect) return;

  const scrollTop2 = editor.getDoc().documentElement.scrollTop;
  const scrollLeft2 = editor.getDoc().documentElement.scrollLeft;

  socket.emit("cursor-move", {
    id: socket.id,
    left: rect.left,
    top: rect.top,
    height: rect.height,
    scrollTop2,
    scrollLeft2
  });

}, [content]);



useEffect(() => {

  // -------- RECEIVE CONTENT --------
  const handleContent = (data) => {

    if (data.id === socket.id) return;

    const editor = editorRef.current;
    if (!editor) return;

    let bookmark = editor.selection?.getBookmark(2, true);

    let currentHTML = editor.getContent();

    const cursors = editor.getBody().querySelectorAll("[id^='cursor-']");
    cursors.forEach((c) => {
      currentHTML = currentHTML.replace(c.outerHTML, "");
    });

    const parser = new DOMParser();

    const incomingDoc = parser.parseFromString(data.contentall, "text/html");
    const currentDoc = parser.parseFromString(currentHTML, "text/html");

    const currentParas = currentDoc.body.children;
    const incomingParas = incomingDoc.body.children;

    for (let i = 0; i < incomingParas.length; i++) {

      if (!currentParas[i]) {
        currentDoc.body.appendChild(incomingParas[i].cloneNode(true));
        continue;
      }

      if (currentParas[i].textContent !== incomingParas[i].textContent) {

        const selectionNode = editor.selection?.getStart();

        if (!selectionNode || !currentParas[i].contains(selectionNode)) {
          currentParas[i].replaceWith(incomingParas[i].cloneNode(true));
        }

      }
    }

    editor.setContent(currentDoc.body.innerHTML);

    if (bookmark) {
      editor.selection.moveToBookmark(bookmark);
    }

  };

  // -------- RECEIVE CURSOR --------
  const handleCursor = (data) => {

    if (data.id === socket.id) return;

    const editor = editorRef.current;
    if (!editor) return;

    const id = `cursor-${data.id}`;
    let cursor = editor.dom.get(id);

    if (!cursor) {

      cursor = document.createElement("div");
      cursor.id = id;
      cursor.setAttribute("data-cursor", "true");

      cursor.style.position = "absolute";
      cursor.style.pointerEvents = "none";
      cursor.style.zIndex = "1000";

      const label = document.createElement("div");
      label.textContent = data.name || "User";

      label.style.backgroundColor = "red";
      label.style.color = "white";
      label.style.fontSize = "12px";
      label.style.padding = "2px 6px";
      label.style.borderRadius = "4px";
      label.style.position = "absolute";
      label.style.top = "-18px";
      label.style.left = "0";

      const line = document.createElement("div");
      line.className = "cursor-line";
      line.style.width = "2px";
      line.style.height = "20px";
      line.style.backgroundColor = "red";

      cursor.appendChild(label);
      cursor.appendChild(line);

      editor.getBody().append(cursor);
    }

    cursor.style.left = `${Math.floor(data.left + data.scrollLeft2)}px`;
    cursor.style.top = `${Math.floor(data.top + data.scrollTop2)}px`;

    const line = cursor.querySelector(".cursor-line");
    if (line && data.height) {
      line.style.height = `${data.height}px`;
    }

  };

  socket.on("content-send", handleContent);
  socket.on("cursor-update", handleCursor);

  return () => {
    socket.off("content-send", handleContent);
    socket.off("cursor-update", handleCursor);
  };

}, []);

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
              // 'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
              // Your account includes a free trial of TinyMCE premium features
              // Try the most popular premium features until Jan 13, 2026:
              // 'checklist', 'mediaembed', 'casechange', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'advtemplate', 'ai', 'uploadcare', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown', 'importword', 'exportword', 'exportpdf'
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

//Old file code 
// import { useEffect, useState, useRef } from 'react'
// import { Editor } from "@tinymce/tinymce-react"
// // import { socket } from '../../socket.js'

// function DocFile() {
//   const editorRef = useRef(null);
//   const [messageboard, Setmessageboard] = useState('')
//   const [content, setContent] = useState("");

//   socket.emit('message', 'connceted form client')

//   socket.on('helloserver', (message) => {
//     console.log(message);
//   });

//   socket.on('joined-room', (helloroom) => {
//     Setmessageboard(helloroom)
//   });

//   const hanldejoin = () => {
//     socket.emit("join-room", 'room1');
//   }

//   useEffect(() => {
//     if (!editorRef.current) {
//       // return
//     }

//     const editor = editorRef.current;

//     if (editorRef.current) {
//       let finalans = null
//       const dataall = tinyMCE.activeEditor.getContent()
//       const contentreomve = editor.dom.get('user1');
//       if (contentreomve?.outerHTML) {
//         finalans = dataall.replace(contentreomve.outerHTML, '')
//         if (finalans !== null) {
//           socket.emit("content-all", {
//             contentall: finalans
//           })
//         }
//       }
//       const selection = editor.selection.getRng();
//       const rect = selection.getBoundingClientRect();

//       socket.emit("cursor-move", {
//         content: finalans,
//         left: rect.left,
//         right: rect.right,
//         top: rect.top,
//         bottom: rect.bottom,
//         height: rect.height,
//         id: editor?.editorUid,
//         startOffset: selection.startOffset,
//       });
//     }

//     socket.on("content-send", (incomingHTML) => {
//       const editor = editorRef.current;
//       let bookmark = null;
//       bookmark = editor.selection.getBookmark(2, true);

//       const currentHTML = editor.getContent();
//       const removeNode = editor.dom.get("user1");

//       let HTMLdata = currentHTML;
//       if (removeNode?.outerHTML) {
//         HTMLdata = currentHTML.replace(removeNode.outerHTML, "");
//       }

//       const parser = new DOMParser();
//       const incomingDoc = parser.parseFromString(incomingHTML.contentall, "text/html");
//       const ccincomingDoc = parser.parseFromString(HTMLdata, "text/html");
//       const ccincomingParas = ccincomingDoc.body.children;
//       const incomingParas = incomingDoc.body.children;

//       for (let i = 0; i < incomingParas.length; i++) {
//         if (!ccincomingParas[i]) {
//           ccincomingDoc.body.appendChild(incomingParas[i].cloneNode(true));
//         }
//         else if (ccincomingParas[i].textContent !== incomingParas[i].textContent) {
//           ccincomingParas[i].textContent = incomingParas[i].textContent;
//         }
//         if (ccincomingParas[i]?.children) {
//           const selectionNode = editor.selection.getStart();
//           if (!ccincomingParas[i].contains(selectionNode)) {
//             ccincomingParas[i].replaceWith(incomingParas[i].cloneNode(true));
//           }
//           continue;
//         }
//       }
//       editor.setContent(ccincomingDoc.body.innerHTML);
//       editor.selection.moveToBookmark(bookmark);
//     });

//     socket.on('cursor-update', (data) => {

//       const editor = editorRef.current;
//       if (!editor) return;

//       let cursor = data.id

//       cursor = document.createElement("div");
//       cursor.style.position = "absolute";
//       cursor.textContent = "|"
//       cursor.id = "user1"

//       cursor.style.pointerEvents = "none";
//       cursor.style.left = `${Math.floor(data.left)}px`;
//       cursor.style.right = `${Math.floor(data.right)}px`;
//       cursor.style.top = `${Math.floor(data.top)}px`;
//       cursor.style.bottom = `${Math.floor(data.bottom)}px`;
//       const ans = editor.dom.get('user1');

//       if (ans) {
//         ans.style.left = `${Math.floor(data.left)}px`;
//         ans.style.right = `${Math.floor(data.right)}px`;
//         ans.style.top = `${Math.floor(data.top)}px`;
//         ans.style.bottom = `${Math.floor(data.bottom)}px`;
//       } else {
//         editor.getBody().appendChild(cursor);
//       }
//     });
//     return () => {
//       socket.off("content-send");
//     };
//   }, [content]);

//   const handleEditorChange = (value) => {
//     setContent(value);
//   }    
//   return (
//     <>
//       <div className='w-full'>
//         <button className='px-4 py-4 bg-green-400' onClick={hanldejoin}>Join room</button>
//         {messageboard && <Editor
//           onInit={(evt, editor) => {
//             editorRef.current = editor;
//           }}
//           apiKey={import.meta.env.VITE_TINYMCE_KEY}
//           init={{
//             plugins: [
//               // Core editing features
//               'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
//               // Your account includes a free trial of TinyMCE premium features
//               // Try the most popular premium features until Jan 13, 2026:
//               'checklist', 'mediaembed', 'casechange', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'advtemplate', 'ai', 'uploadcare', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown', 'importword', 'exportword', 'exportpdf'
//             ],
//             toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
//             tinycomments_mode: 'embedded',
//             tinycomments_author: 'Author name',
//             mergetags_list: [
//               { value: 'First.Name', title: 'First Name' },
//               { value: 'Email', title: 'Email' },
//             ],
//             ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
//             uploadcare_public_key: '804a032e9fa49a824fb3',
//           }}
//           initialValue='Welcome to TinyMCE!'
//           onEditorChange={handleEditorChange}
//         />}
//       </div>
//     </>
//   )
// }

// export default DocFile


