import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import authdoc from '../auth/authdoc'
import { Button } from '../Components/index.js'

function PersonalDoc({ data }) {
  const [alldoc, Setalldoc] = useState([])
  const doc = [{ id: 11, name: "New Document", img: "" }, { id: 1, name: "Letter", img: "/coverimage-1.png" }, { id: 2, name: "Resume", img: "/coverimage-2.png" }, { id: 3, name: "Resume Template 2", img: "/coverimage-3.png" }, { id: 4, name: "Project Prosposal", img: "/coverimage-4.png" },
  { id: 5, name: "Brochure", img: "/coverimage-5.png" }, { id: 6, name: "Report", img: "/coverimage-6.png" }]
  const allcontent = [{ id: 11, name: "New Document", img: "Hello user" }, { id: 1, name: "Letter", content: "<p>Your Name<br /> 123 Your Street<br /> Your City, ST 12345<br /> (123) 456-7890<br /> no_reply@example.com</p><p>4th September 20XX</p><p>Ronny Reader<br />CEO, Company Name<br />123 Address St<br />Anytown, ST 12345</p><p>Dear Ms. Reader,</p><p>I am writing this letter to demonstrate how your content will appear once you start editing your document. This sample text helps you understand the layout, spacing, and overall structure of the letter before you replace it with your own information.</p><p>You can click anywhere in this document and begin typing. Feel free to change the wording, adjust the formatting, or add new sections as needed. This editor supports basic text styling such as bold, italics, alignment, and bullet points.</p><p>This letter is only a placeholder and is not meant to be used as final content. Once you are satisfied with your edits, you can save the document, preview it, or download it as a PDF for sharing or printing.</p><p>Sincerely,</p><p><br /><br />Your Name</p>" },
  { id: 2, name: "Resume", content: '<h1>Your Name</h1><p><em>Full-Stack Developer | Problem Solver | Tech Enthusiast</em><br />123 Your Street | Your City, ST 12345<br />(123) 456-7890 | yourname@email.com</p><hr /><h2>EXPERIENCE</h2><p><strong>ABC Technologies, Remote — Software Developer</strong><br /><em>June 2023 – Present</em><br />Developed and maintained web applications using modern JavaScript frameworks. Collaborated with cross-functional teams to deliver features on time and improve application performance and user experience.</p><p><strong>XYZ Solutions, City — Junior Developer</strong><br /><em>Jan 2022 – May 2023</em><br />Assisted in building responsive user interfaces, fixing bugs, and writing clean, maintainable code. Gained hands-on experience working with real-world production systems.</p><p><strong>Startup Studio, City — Intern</strong><br /><em>Jun 2021 – Dec 2021</em><br />Supported senior developers in developing internal tools and learned best practices for version control, debugging, and documentation.</p><h2>EDUCATION</h2><p><strong>University Name, Location — Bachelor of Computer Science</strong><br /><em>2018 – 2022</em><br />Studied core computer science subjects including data structures, algorithms, databases, and web development.</p><p><strong>Higher Secondary School, Location — Science Stream</strong><br /><em>2016 – 2018</em><br />Completed coursework with a strong foundation in mathematics and problem-solving.</p><h2>PROJECTS</h2><p><strong>Online Food Delivery App — Full-Stack Project</strong><br />Built a complete food delivery platform with user authentication, restaurant dashboards, order management, and real-time updates using modern web technologies.</p><h2>SKILLS</h2><ul><li>JavaScript, HTML, CSS</li><li>React, Next.js</li><li>Node.js, Express</li><li>MongoDB, REST APIs</li></ul><h2>AWARDS</h2><p><strong>Best Final Year Project</strong><br />Awarded for designing and implementing a scalable web application as part of the final academic project.</p><p><strong>Hackathon Participation Certificate</strong><br />Recognized for active participation and teamwork in a national-level hackathon.</p><h2>LANGUAGES</h2><p>English, Hindi, Gujarati</p>' },
  { id: 3, name: "Resume Template 2", content: '<h1>Hello</h1><h2>I’m Your Name</h2><p>123 Your Street<br />Your City, ST 12345<br />(123) 456-7890<br />yourname@email.com</p><h3>Skills</h3><p>Strong foundation in web development with experience building responsive user interfaces, writing clean code, and solving real-world problems using modern technologies.</p><h3>Experience</h3><p><strong>June 2023 – Present</strong><br />ABC Tech, Remote — Frontend Developer</p><ul><li>Designed and implemented reusable UI components for web applications.</li><li>Worked closely with designers and backend developers to deliver features.</li><li>Improved website performance and accessibility across devices.</li></ul><p><strong>Jan 2022 – May 2023</strong><br />XYZ Solutions, City — Junior Developer</p><ul><li>Assisted in developing and maintaining client-facing web applications.</li><li>Fixed bugs and enhanced existing features based on user feedback.</li></ul><p><strong>Jun 2021 – Dec 2021</strong><br />Startup Studio, City — Software Intern</p><ul><li>Supported senior developers in daily development tasks.</li><li>Learned version control, debugging, and code review practices.</li><li>Contributed to internal tools and documentation.</li></ul><h3>Education</h3><p><strong>2018 – 2022</strong><br />University Name, Location — Bachelor of Computer Science</p><p>Completed coursework in data structures, algorithms, databases, and full-stack web development.</p><h3>Awards</h3><p>Academic Excellence Award for consistent performance and project work.<br />Recognized for teamwork and active participation in technical events.</p>' },
  { id: 4, name: "Project Prosposal", content: '<img src="/project.png"/><h1>Project Name</h1><p>09.04.20XX</p><p>─</p><p><strong>Your Name</strong><br />Your Company<br />123 Your Street<br />Your City, ST 12345</p><h2>Overview</h2><p>This project proposal outlines the scope, objectives, and execution plan for building a practical and user-focused solution. The goal is to deliver a reliable product that meets business requirements while remaining scalable and easy to maintain.</p><h2>Goals</h2><ul><li>Define clear project objectives and expected outcomes.</li><li>Deliver a solution that improves efficiency and user experience.</li></ul><h2>Specifications</h2><p>The project will be developed using modern tools and best practices. The system will focus on performance, security, and maintainability while allowing room for future enhancements based on user feedback.</p><h3>Technical Approach</h3><p>The solution will follow a structured development process including planning, design, implementation, testing, and deployment. Regular reviews will ensure quality and timely delivery.</p><h2>Milestones</h2><p><strong>Planning & Design</strong><br />Gather requirements, define architecture, and create initial designs to align with project goals.</p><p><strong>Development & Delivery</strong><br />Implement core features, perform testing, and prepare the final deliverable for launch.</p>' },
  { id: 5, name: "Brochure", content: '<p><strong>Your Company</strong><br />123 Your Street<br />Your City, ST 12345<br />(123) 456-7890</p><h1>Product Brochure</h1><p>September 04, 20XX</p><h2>Product Overview</h2><p>This brochure provides an overview of our product, highlighting its key features, benefits, and use cases. It is designed to help customers quickly understand how the product solves real problems and adds value to their daily work.</p><img src="/Brochure.png"/><h3>Key Features</h3><p>The product offers an intuitive interface, reliable performance, and flexible configuration options. It is built to adapt to different business needs while remaining easy to use.</p><h3>Why Choose This Product</h3><p>Customers choose this product for its simplicity, scalability, and strong support. It helps teams work more efficiently and reduces the time spent on manual processes.</p><h3>Use Cases</h3><p>The product can be used by individuals, small teams, and large organizations to streamline workflows, improve collaboration, and deliver consistent results.</p><h2>Details</h2><p>Developed using modern technologies and best practices, the product focuses on security, performance, and long-term reliability. Regular updates ensure continued improvement based on customer feedback.</p><p>For more information, pricing details, or a personalized demo, please contact our team using the details provided above.</p>' },
  { id: 6, name: "Report", content: '<p style="text-align: center;"><strong>COURSE NAME</strong><br /><strong>REPORT TITLE</strong><br />A Study on Practical Concepts and Applications</p><img src="/report.png" style="margin-left:490px"/><h2>Introduction</h2><p>This report presents an overview of the selected topic and explains its importance within the course curriculum. The objective is to understand key concepts, analyze their applications, and connect theoretical knowledge with real-world examples in a structured manner.</p><h3>Background and Context</h3><p>The topic covered in this report has significant relevance in today’s academic and professional environments. It provides foundational knowledge while also encouraging critical thinking and problem-solving skills. Through this study, the reader gains clarity on how core ideas are developed and applied.</p><p>In addition, the report highlights important observations gathered during research and learning activities. These insights help strengthen understanding and improve the ability to apply concepts effectively.</p><h3>Discussion and Analysis</h3><p>This section discusses the main findings and explains them in detail using clear examples. The analysis focuses on interpreting results, identifying patterns, and drawing meaningful conclusions that align with the objectives of the report.</p>' },
  ]

  const createdoc = async (Id) => {
    const getdefaultdoc = allcontent.find(item => (item.id == Id))
    const createdoc = await authdoc.createdoc({ docname: getdefaultdoc.name, doc: getdefaultdoc.content })
    if (createdoc) {
      localStorage.setItem("Doc", createdoc.data.data._id)
    }
  }

  const handledeletedoc = async (ID) =>{    
    const deletedoc = await authdoc.docdelete(ID)
    if (deletedoc) {
      const getnewall = await authdoc.alldoc()
      Setalldoc(getnewall.data.data)  
    }
  }

  useEffect(() => {
    authdoc.alldoc().then((data) => {
      console.log(data.data.data);
      Setalldoc(data.data.data)
    })
      .catch((err) => {
        console.log(err);
      })
    const localdoc = localStorage.getItem("Doc")
    if (localdoc) {
      localStorage.removeItem("Doc");
    }
  }, [])

  return (
    <div>
      <h1 className='ml-18 text-2xl mt-8 text-blue-900'>Create New {data} Document</h1>
      <div>
        <div className='grid grid-cols-7 text-center mt-5 w-353 ml-20 gap-y-15 gap-x-7'>
          {doc.map((item) => (
            <Link to={`/dashboard/workingdoc/${item.id}`} key={item.id}>
              <div onClick={() => createdoc(item.id)}>
                <div className='border'>
                  {!item.img ? <div className="h-60 w-50 flex items-center justify-center"><p className="text-4xl mr-4">+</p></div> :
                    <img src={item.img} className='h-60 w-50' />}
                </div>
                <h1 className=''>{item.name}</h1>
              </div>
            </Link>
          ))}
        </div>
        <div className='mb-22'>
          <h1 className='text-xl ml-17 mt-5 mb-5'>All {data} Document</h1>
          <div className='-ml-10'>
            {alldoc?.map((item, index) => (
              <div className="flex justify-between" key={item._id}>
                <Link to={`/dashboard/workingdoc/${item._id}`}>
                  <div className='flex justify-between'>
                    <div className='flex mt-2 ml-32 space-x-1'>
                      <p className="text-xl w-12 text-right">{index + 1}.</p>
                      <img src="/featureimg1.png" className='w-10 h-10 ml-3' />
                      <p className='mt-[3px] ml-3'>{item.Docname}</p>
                    </div>
                  </div>
                </Link>
                <div className='flex mt-1'>
                  <Button className='mt-0 mr-12 px-2 h-7 text-sm text-white bg-red-600 text-white rounded hover:bg-red-700' 
                  bgColor='bg-red-400' textColor='' onClick={()=>handledeletedoc(item._id)}>Delete</Button>
                <p className='mr-23'>{item.createdAt.split("T")[0]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PersonalDoc
