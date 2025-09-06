import Logo from '../assets/react.svg';

function Navbar() {
  return (
    <nav className="flex items-center px-4 h-16 relative">
      {/* Left section */}
      <div className="left">
        HM
      </div>

      {/* Middle logo */}
      <div className="middle absolute left-1/2 transform -translate-x-1/2">
        <img src={Logo} alt="Logo" className="h-8" />
      </div>

      {/* Right section */}
      <div className="right flex gap-5 ml-auto">
        <div>SHOP</div>
        <div>PROFILE</div>
      </div>
    </nav>
  );
}

export default Navbar;
