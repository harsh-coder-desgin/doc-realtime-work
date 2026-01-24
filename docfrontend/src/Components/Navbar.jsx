import { useNavigate } from 'react-router-dom';
import { Button } from './index.js'

function Navbar({onFeatureClick}) {
  const navigate = useNavigate();
  
  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Feature", slug: "/", active: true },
    { name: "Template", slug: "/template", active: true },
    { name: "Login", slug: "/login", active: true },
    { name: "Get started", slug: "/signup", active: true },
  ];
  const hanldeclick = (slugs) =>{
    navigate(slugs)
    onFeatureClick()
  }
   return (
    <>
      <header className="py-4 text-black sticky top-0 z-50 mt-5">
          <nav className="flex items-center">
            <ul className="flex items-center ml-110 space-x-9 bg-blue-900 px-11 py-2 rounded-md shadow-xl ">
              {navItems?.map((item) =>
                  <li key={item.name}>
                   {item.name === "Feature" ? <Button onClick={()=>{hanldeclick(item.slug)}}
                      bgColor='' textColor=''
                      className="text-white px-3 py-2 font-semibold hover:text-black transition hover:bg-white hover:px-3 hover:py-2 hover:rounded-md">
                      {item.name}
                    </Button> :
                    <Button onClick={()=> navigate(item.slug)}
                      bgColor='' textColor=''
                      className="text-white px-3 py-2 font-semibold hover:text-black transition hover:bg-white hover:px-3 hover:py-2 hover:rounded-md">
                      {item.name}
                    </Button>}
                    
                  </li>
              )}
            </ul>
          </nav>
      </header>
    </>
  );
}

export default Navbar