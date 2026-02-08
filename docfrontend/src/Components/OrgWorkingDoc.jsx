import React, { useEffect, useRef } from 'react'
import { Editor } from "@tinymce/tinymce-react"
import { Button, Input } from './index.js'
import authdoc from '../auth/authdoc.js'
import { useParams } from 'react-router-dom';
import { useState } from 'react';

function OrgWorkingDoc() {
  const { id } = useParams();
  const ref = useRef(null);
  const [docdata, Setdocdata] = useState("Hello User")
  const [open, setOpen] = useState(false);
  const [message, SetMessage] = useState({ text: "", type: "" });
  // const [Document, SetDocument] = useState([]);
  const [aidata, SetAidata] = useState("")
  const [chataidata, SetChataidata] = useState([])
  const [messageaidata, SetMessageaidata] = useState([])
  const [docname, setdocname] = useState("New Document");

  const allcontent = [{ id: 1, name: "Letter", content: "<p>Your Name<br /> 123 Your Street<br /> Your City, ST 12345<br /> (123) 456-7890<br /> no_reply@example.com</p><p>4th September 20XX</p><p>Ronny Reader<br />CEO, Company Name<br />123 Address St<br />Anytown, ST 12345</p><p>Dear Ms. Reader,</p><p>I am writing this letter to demonstrate how your content will appear once you start editing your document. This sample text helps you understand the layout, spacing, and overall structure of the letter before you replace it with your own information.</p><p>You can click anywhere in this document and begin typing. Feel free to change the wording, adjust the formatting, or add new sections as needed. This editor supports basic text styling such as bold, italics, alignment, and bullet points.</p><p>This letter is only a placeholder and is not meant to be used as final content. Once you are satisfied with your edits, you can save the document, preview it, or download it as a PDF for sharing or printing.</p><p>Sincerely,</p><p><br /><br />Your Name</p>" },
  { id: 2, name: "Resume", content: '<h1>Your Name</h1><p><em>Full-Stack Developer | Problem Solver | Tech Enthusiast</em><br />123 Your Street | Your City, ST 12345<br />(123) 456-7890 | yourname@email.com</p><hr /><h2>EXPERIENCE</h2><p><strong>ABC Technologies, Remote — Software Developer</strong><br /><em>June 2023 – Present</em><br />Developed and maintained web applications using modern JavaScript frameworks. Collaborated with cross-functional teams to deliver features on time and improve application performance and user experience.</p><p><strong>XYZ Solutions, City — Junior Developer</strong><br /><em>Jan 2022 – May 2023</em><br />Assisted in building responsive user interfaces, fixing bugs, and writing clean, maintainable code. Gained hands-on experience working with real-world production systems.</p><p><strong>Startup Studio, City — Intern</strong><br /><em>Jun 2021 – Dec 2021</em><br />Supported senior developers in developing internal tools and learned best practices for version control, debugging, and documentation.</p><h2>EDUCATION</h2><p><strong>University Name, Location — Bachelor of Computer Science</strong><br /><em>2018 – 2022</em><br />Studied core computer science subjects including data structures, algorithms, databases, and web development.</p><p><strong>Higher Secondary School, Location — Science Stream</strong><br /><em>2016 – 2018</em><br />Completed coursework with a strong foundation in mathematics and problem-solving.</p><h2>PROJECTS</h2><p><strong>Online Food Delivery App — Full-Stack Project</strong><br />Built a complete food delivery platform with user authentication, restaurant dashboards, order management, and real-time updates using modern web technologies.</p><h2>SKILLS</h2><ul><li>JavaScript, HTML, CSS</li><li>React, Next.js</li><li>Node.js, Express</li><li>MongoDB, REST APIs</li></ul><h2>AWARDS</h2><p><strong>Best Final Year Project</strong><br />Awarded for designing and implementing a scalable web application as part of the final academic project.</p><p><strong>Hackathon Participation Certificate</strong><br />Recognized for active participation and teamwork in a national-level hackathon.</p><h2>LANGUAGES</h2><p>English, Hindi, Gujarati</p>' },
  { id: 3, name: "Resume Template 2", content: '<h1>Hello</h1><h2>I’m Your Name</h2><p>123 Your Street<br />Your City, ST 12345<br />(123) 456-7890<br />yourname@email.com</p><h3>Skills</h3><p>Strong foundation in web development with experience building responsive user interfaces, writing clean code, and solving real-world problems using modern technologies.</p><h3>Experience</h3><p><strong>June 2023 – Present</strong><br />ABC Tech, Remote — Frontend Developer</p><ul><li>Designed and implemented reusable UI components for web applications.</li><li>Worked closely with designers and backend developers to deliver features.</li><li>Improved website performance and accessibility across devices.</li></ul><p><strong>Jan 2022 – May 2023</strong><br />XYZ Solutions, City — Junior Developer</p><ul><li>Assisted in developing and maintaining client-facing web applications.</li><li>Fixed bugs and enhanced existing features based on user feedback.</li></ul><p><strong>Jun 2021 – Dec 2021</strong><br />Startup Studio, City — Software Intern</p><ul><li>Supported senior developers in daily development tasks.</li><li>Learned version control, debugging, and code review practices.</li><li>Contributed to internal tools and documentation.</li></ul><h3>Education</h3><p><strong>2018 – 2022</strong><br />University Name, Location — Bachelor of Computer Science</p><p>Completed coursework in data structures, algorithms, databases, and full-stack web development.</p><h3>Awards</h3><p>Academic Excellence Award for consistent performance and project work.<br />Recognized for teamwork and active participation in technical events.</p>' },
  { id: 4, name: "Project Prosposal", content: '<img src="/project.png"/><h1>Project Name</h1><p>09.04.20XX</p><p>─</p><p><strong>Your Name</strong><br />Your Company<br />123 Your Street<br />Your City, ST 12345</p><h2>Overview</h2><p>This project proposal outlines the scope, objectives, and execution plan for building a practical and user-focused solution. The goal is to deliver a reliable product that meets business requirements while remaining scalable and easy to maintain.</p><h2>Goals</h2><ul><li>Define clear project objectives and expected outcomes.</li><li>Deliver a solution that improves efficiency and user experience.</li></ul><h2>Specifications</h2><p>The project will be developed using modern tools and best practices. The system will focus on performance, security, and maintainability while allowing room for future enhancements based on user feedback.</p><h3>Technical Approach</h3><p>The solution will follow a structured development process including planning, design, implementation, testing, and deployment. Regular reviews will ensure quality and timely delivery.</p><h2>Milestones</h2><p><strong>Planning & Design</strong><br />Gather requirements, define architecture, and create initial designs to align with project goals.</p><p><strong>Development & Delivery</strong><br />Implement core features, perform testing, and prepare the final deliverable for launch.</p>' },
  { id: 5, name: "Brochure", content: '<p><strong>Your Company</strong><br />123 Your Street<br />Your City, ST 12345<br />(123) 456-7890</p><h1>Product Brochure</h1><p>September 04, 20XX</p><h2>Product Overview</h2><p>This brochure provides an overview of our product, highlighting its key features, benefits, and use cases. It is designed to help customers quickly understand how the product solves real problems and adds value to their daily work.</p><img src="/Brochure.png"/><h3>Key Features</h3><p>The product offers an intuitive interface, reliable performance, and flexible configuration options. It is built to adapt to different business needs while remaining easy to use.</p><h3>Why Choose This Product</h3><p>Customers choose this product for its simplicity, scalability, and strong support. It helps teams work more efficiently and reduces the time spent on manual processes.</p><h3>Use Cases</h3><p>The product can be used by individuals, small teams, and large organizations to streamline workflows, improve collaboration, and deliver consistent results.</p><h2>Details</h2><p>Developed using modern technologies and best practices, the product focuses on security, performance, and long-term reliability. Regular updates ensure continued improvement based on customer feedback.</p><p>For more information, pricing details, or a personalized demo, please contact our team using the details provided above.</p>' },
  { id: 6, name: "Report", content: '<p style="text-align: center;"><strong>COURSE NAME</strong><br /><strong>REPORT TITLE</strong><br />A Study on Practical Concepts and Applications</p><img src="/report.png" style="margin-left:490px"/><h2>Introduction</h2><p>This report presents an overview of the selected topic and explains its importance within the course curriculum. The objective is to understand key concepts, analyze their applications, and connect theoretical knowledge with real-world examples in a structured manner.</p><h3>Background and Context</h3><p>The topic covered in this report has significant relevance in today’s academic and professional environments. It provides foundational knowledge while also encouraging critical thinking and problem-solving skills. Through this study, the reader gains clarity on how core ideas are developed and applied.</p><p>In addition, the report highlights important observations gathered during research and learning activities. These insights help strengthen understanding and improve the ability to apply concepts effectively.</p><h3>Discussion and Analysis</h3><p>This section discusses the main findings and explains them in detail using clear examples. The analysis focuses on interpreting results, identifying patterns, and drawing meaningful conclusions that align with the objectives of the report.</p>' },
  ]

  const handlesavedoc = async () => {
    try {
      const data = tinyMCE.activeEditor.getContent();
      const saveddoc = localStorage.getItem("OrgDoc")
      if (saveddoc) {
        const save = await authdoc.orgsavedoc({ id: saveddoc, doc: data })
        if (save) {
          SetMessage({ text: "✅ Doc Saved successfully!", type: "success" });
        }
        localStorage.removeItem("Doc");
      } else {
        const old_doc = await authdoc.orgsavedoc({ doc: data, id: id })
        if (old_doc) {
          SetMessage({ text: "✅ Doc Saved successfully!", type: "success" });
        }
      }
    } catch (error) {
      SetMessage({ text: "Some error Please try again later", type: "error" });
    }
  }

  const newname = async () => {
    const saveddoc = localStorage.getItem("OrgDoc")
    if (saveddoc) {
      const changedocnamelocal = await authdoc.orgrenamedoc({ docname: docname, id: saveddoc })
      localStorage.removeItem("OrgDoc");
    } else {
      console.log(docname,id);
      
      const changedocname = await authdoc.orgrenamedoc({ docname: docname, id: id })
      console.log(changedocname);
    }
  }

  const handleKeyDown = async (event) => {
    const checkspace = (aidata.replace(/\s/g, ""))
    if (checkspace.length > 1) {
      if (event.key === 'Enter') {
        event.preventDefault();
        SetChataidata((prev) => ([
          ...prev,
          {
            userchat: aidata,
            aichat: ""
          }
        ]))
        const senddatatoai = await authdoc.airesponse({ usermessage: aidata })
        if (senddatatoai) {
          SetMessageaidata((prev)=>([
            ...prev,
            {
              aichat: senddatatoai.data.data
            }
          ]))
        }
        console.log(senddatatoai);
        SetAidata("")
      }
    }
  };

  useEffect(() => {
    authdoc.orggetdoc(id).then((data) => {
      console.log(data);
      setdocname(data?.data?.Docname)
      // SetDocument(data) 
      if (data?.data?.data?.Doc) {
        Setdocdata(data?.data?.Doc);
      }
    })
      .catch((err) => {
        console.log(err);
      })
    const getdefaultdoc = allcontent.find(item => (item.id == id))
    if (getdefaultdoc) {
      Setdocdata(getdefaultdoc.content)
    }

    if (message.text.length > 0) {
      setTimeout(() => {
        SetMessage({ text: "", type: "" });
      }, 3000);
    }
  }, [message.text.length])
  console.log(chataidata);

  return (
    <div>
      {message.text && (
        <h1 className={`text-center text-lg font-semibold mt-3 p-3 transition-all duration-300
              ${message.type === "success" ? "bg-green-100 text-green-700 border border-green-400" : ""}
              ${message.type === "error" ? "bg-red-100 text-red-700 border border-red-400" : ""}`}>
          {message.text}
        </h1>
      )}
      <div className="flex items-center gap-3 px-4 mt-2">
        <Input placeholder="Doc name" className="flex-1 h-12 rounded-md bg-gray-100 px-3 text-black"
          onBlur={newname} onChange={(e) => setdocname(e.target.value)} value={docname ?? "New Document"} />
        <Button className="h-12 px-4 w-35 -mt-2 text-lg flex items-center justify-center hover:bg-green-700 rounded-md"
          bgColor="bg-green-600" onClick={handlesavedoc}>
          Save Doc
        </Button>
        <div className="relative" ref={ref}>
          <Button className="h-12 -mt-2 px-4 w-25 text-lg flex items-center justify-center gap-2 leading-none hover:bg-blue-900 rounded-md"
            bgColor="bg-blue-800" onClick={() => setOpen((prev) => !prev)}>
            Use AI
          </Button>
          {open && (
            <div className="overflow-y-auto scrollbar absolute right-0 mt-2 w-[550px] h-140 bg-blue-900 border rounded-lg shadow-xl z-50">
              <div className="px-3 py-2 border-b font-semibold text-sm text-white bg-blue-700">
                AI Assistant
              </div>
              <div className="p-3 border-b border-gray-200">
                <Input
                  type="text"
                  onKeyDown={handleKeyDown}
                  value={aidata}
                  onChange={(e) => SetAidata(e.target.value)}
                  placeholder="Ask AI anything..."
                  className="bg-white w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {chataidata?.map((item, index) => (
                <div className="flex justify-end mr-3 mt-2" key={index}>
                  <div className="bg-blue-600 text-white px-3 py-2 rounded-lg max-w-[75%]">
                    {item.userchat}
                  </div>
                </div>
              ))}
              {messageaidata.map((item,index) => (
                <div className="max-h-60 overflow-y-auto p-3 space-y-3 text-sm -mt-3" key={index}>
                  <div className="flex justify-start">
                    <div className="bg-gray-100 px-3 py-2 rounded-lg max-w-[75%]">
                      {item.aichat}
                    </div>
                  </div>
                </div>
              ))}
              <div className="border-t px-3 py-2 text-xs text-gray-200 text-center">
                AI responses are suggestions
              </div>
            </div>
          )}
        </div>
      </div>

      <div className='w-full border border-gray-500 rounded-[10px]'>
        {/* <Editor
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
          initialValue={docdata}
        /> */}
      </div>
    </div>
  )
}
export default OrgWorkingDoc
