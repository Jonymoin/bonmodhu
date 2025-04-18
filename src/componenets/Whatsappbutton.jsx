import React from 'react';

const WhatsAppButton = () => {
  const whatsappNumber = '+8801321102838';

  return (
    <a
      href={`https://wa.me/${whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path d="M16 2C8.268 2 2 8.268 2 16c0 2.802.896 5.389 2.42 7.533L2 30l6.612-2.366A13.929 13.929 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 2c6.627 0 12 5.373 12 12S22.627 28 16 28c-2.29 0-4.41-.641-6.238-1.75l-.362-.218-3.854 1.382.615-3.702-.232-.368A11.927 11.927 0 014 16c0-6.627 5.373-12 12-12zm-1 4.016a1 1 0 00-1 1V10a1 1 0 001 1h1.016a1 1 0 011 1v1.016a1 1 0 01-1 1H13.984a1 1 0 01-1-1V13a1 1 0 00-1-1h-1.016a1 1 0 01-1-1V10a1 1 0 011-1h1.016a1 1 0 001-1V7.016a1 1 0 011-1h1.016a1 1 0 011 1z" />
      </svg>
      WhatsApp
    </a>
  );
};

export default WhatsAppButton;