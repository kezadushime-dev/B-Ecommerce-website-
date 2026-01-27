import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export const NewsletterPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 3000); // Show after 3 seconds
    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4">
      <div className="relative bg-white w-full max-w-3xl flex flex-col md:flex-row rounded-sm overflow-hidden animate-fadeInUp">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 z-10 p-1 hover:bg-gray-100 rounded-full"
        >
          <X size={24} />
        </button>

        {/* Left Side: Image */}
        <div className="hidden md:block w-1/2">
          <img 
            src="https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg?auto=compress&cs=tinysrgb&w=600" 
            className="h-full w-full object-cover" 
            alt="Newsletter"
          />
        </div>

        {/* Right Side: Content */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center text-center">
          <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-2">Newsletter</span>
          <h2 className="text-3xl font-black uppercase mb-4 leading-tight">Join Our List <br/> & Get 20% Off</h2>
          <p className="text-gray-500 text-sm mb-6">Subscribe to the mailing list to receive updates on new arrivals and other discount information.</p>
          
          <div className="flex flex-col gap-3">
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Your email address..."
              className="border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500 transition-colors"
              required
            />
            <button className="bg-blue-600 text-white font-bold py-3 uppercase text-xs tracking-widest hover:bg-black transition-all" aria-label="Subscribe to newsletter">
              Subscribe
            </button>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2">
            <input type="checkbox" id="no-show" className="cursor-pointer" />
            <label htmlFor="no-show" className="text-[11px] text-gray-400 cursor-pointer">Don't show this popup again</label>
          </div>
        </div>
      </div>
    </div>
  );
};