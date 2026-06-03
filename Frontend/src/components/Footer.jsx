import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
    { label: "Privacy Policy", path: "/privacy" },
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-10 pb-6 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold text-blue-600">myShop</h2>
          <p className="text-gray-500 text-sm mt-1">
            © {currentYear} All rights reserved.
          </p>
        </div>

        <nav className="flex space-x-8 text-sm font-medium text-gray-600">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className="hover:text-blue-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
