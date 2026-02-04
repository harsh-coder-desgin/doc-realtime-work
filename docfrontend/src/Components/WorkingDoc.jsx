import React from 'react'
import { Editor } from "@tinymce/tinymce-react"
import { Button } from './index.js'
import authdoc from '../auth/authdoc.js'

function WorkingDoc() {

  const handlesavedoc = async()=>{
    const data = tinyMCE.activeEditor.getContent();
    console.log(data);
   const saveddoc= localStorage.getItem("Doc")
    if (saveddoc) {
      const save = await authdoc.newdocsave({docid:saveddoc,doc:data})
      console.log(save);
      localStorage.removeItem("Doc");
    }
  }

  return (
    <div>
      <div className='text-center'>
      <Button className='px-4 py-1 text-lg mt-1 mb-1 hover:bg-green-700 rounded-md' bgColor='bg-green-600'onClick={handlesavedoc}>Save</Button>
      </div>
      <div className='w-full border border-gray-500 rounded-[10px]'>
        <Editor
          apiKey={import.meta.env.VITE_TINYMCE_KEY}
          init={{
            height: 600,
            plugins: [
              'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'link', 'lists', 'media', 'searchreplace',
              'table', 'visualblocks', 'wordcount',
            ],
            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
            tinycomments_mode: 'embedded',
            tinycomments_author: 'Author name',
            mergetags_list: [
              { value: 'First.Name', title: 'First Name' },
              { value: 'Email', title: 'Email' },
            ],
          }}
          initialValue="Hello User"
        />
      </div>
    </div>
  )
}

export default WorkingDoc
