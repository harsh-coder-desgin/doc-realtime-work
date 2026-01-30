import { Editor } from "@tinymce/tinymce-react"

function TinyMceDoc({valueonly}) {
    return (
        <div>
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
                    initialValue={valueonly}
                />
            </div>
        </div>
    )
}

export default TinyMceDoc
