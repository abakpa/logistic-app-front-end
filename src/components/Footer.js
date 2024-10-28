import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 w-full fixed bottom-0 left-0 z-50">
      <div className="container mx-auto md:px-32 flex items-center justify-between">
        {/* Footer Text */}
        <div className="text-sm">
          © {new Date().getFullYear()} MyApp. All rights reserved.
        </div>

        {/* Social Media Links or Menu */}
        <div className="flex space-x-4">
          <a href="https://twitter.com" className="hover:text-gray-400">
            Twitter
          </a>
          <a href="https://facebook.com" className="hover:text-gray-400">
            Facebook
          </a>
          <a href="https://instagram.com" className="hover:text-gray-400">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
