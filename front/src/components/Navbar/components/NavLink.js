const NavLink = ({href, children, ...props }) =>{
    const path = window.location.pathname;
    const active = "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium0";
    const def = "border-red-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium";
    return (<a key={props.name} href={href} className="font-medium text-gray-500 hover:text-gray-900">{ children}
  </a>
    )
}

export default NavLink