import React from 'react';

const WhatsAppButton = () => {
    const phoneNumber = "919789342841";
    const message = "Hi Foodeo, I have a query regarding an order.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 transition-transform duration-300 hover:scale-110 flex items-center justify-center"
            aria-label="Chat on WhatsApp"
        >
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                alt="WhatsApp"
                className="w-14 h-14 drop-shadow-lg"
            />
        </a>
    );
};

export default WhatsAppButton;
