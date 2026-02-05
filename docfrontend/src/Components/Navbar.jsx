import { useNavigate } from 'react-router-dom';
import { Button } from './index.js'
import { useSelector } from 'react-redux';

function Navbar({ onFeatureClick, ontop }) {
  const navigate = useNavigate();
  const users = useSelector(state => state.userAuth.status)

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Feature", slug: "/", active: true },
    { name: "Template", slug: "/template", active: true },
    { name: "Login", slug: "/login", active: !users },
    { name: "Get started", slug: "/signup", active: !users },
    { name: "Your Dashboard", slug: "/dashboard", active: users },
  ];

  const hanldeclick = () => {
    navigate("/", { state: { scrollTo: "feature" } });
    onFeatureClick()
  }
  const hanldetopscroll = (slug) => {
    if (slug === "/login" || slug === "/signup") {
      navigate(slug)
    } else {
      navigate(slug, { state: { scrollTo: "Top" } });
      ontop()
    }
  }

  return (
    <>
      <header className={`${users === true && "ml-14"} py-4 text-black sticky top-0 z-50 mt-5`}>
        <nav className="flex items-center">
          <ul className="flex items-center ml-110 space-x-9 bg-blue-900 px-11 py-2 rounded-md shadow-xl ">
            {navItems?.map((item) =>
              item.active ? (<li key={item.name}>
                {item.name === "Feature" ? <Button onClick={hanldeclick}
                  bgColor='' textColor=''
                  className="text-white px-3 py-2 font-semibold hover:text-black transition hover:bg-white hover:px-3 hover:py-2 hover:rounded-md">
                  {item.name}
                </Button> :
                  <Button onClick={() => hanldetopscroll(item.slug)}
                    bgColor='' textColor=''
                    className="text-white px-3 py-2 font-semibold hover:text-black transition hover:bg-white hover:px-3 hover:py-2 hover:rounded-md">
                    {item.name}
                  </Button>}
              </li>) : null
            )}
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Navbar