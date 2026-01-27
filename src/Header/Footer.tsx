import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, Phone, MapPin, Facebook, Twitter, 
  Linkedin, Instagram, Youtube, Rss
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1a222d] text-[#a0a9b2] pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <h2 className="text-white text-3xl font-bold mb-6 italic">kapee.</h2>
            <p className="text-sm leading-relaxed mb-6">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
            </p>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-white mt-1 shrink-0" />
                <span>Lorem Ipsum, 2046 Lorem Ipsum</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-white shrink-0" />
                <span>576-245-2478</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-white shrink-0" />
                <span>info@kapee.com</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-white font-bold italic shrink-0">Mon - Fri / 9:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-white font-bold uppercase text-sm mb-6 tracking-wider">Information</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li className="hover:text-white cursor-pointer transition-colors">Store Location</li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li className="hover:text-white cursor-pointer transition-colors">Shipping & Delivery</li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Latest News</Link></li>
              <li className="hover:text-white cursor-pointer transition-colors">Our Sitemap</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase text-sm mb-6 tracking-wider">Our Service</h4>
            <ul className="space-y-3 text-sm">
              {['Privacy Policy', 'Terms of Sale', 'Customer Service', 'Delivery Information', 'Payments', 'Saved Cards'].map((link) => (
                <li key={link} className="hover:text-white cursor-pointer transition-colors">{link}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase text-sm mb-6 tracking-wider">My Account</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/auth" className="hover:text-white transition-colors">My Account</Link></li>
              <li><Link to="/cart" className="hover:text-white transition-colors">My Cart</Link></li>
              <li className="hover:text-white cursor-pointer transition-colors">Checkout</li>
              <li><Link to="/wishlist" className="hover:text-white transition-colors">My Wishlist</Link></li>
              <li className="hover:text-white cursor-pointer transition-colors">Tracking Order</li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-1">
            <h4 className="text-white font-bold uppercase text-sm mb-6 tracking-wider">Newsletter</h4>
            <p className="text-sm mb-6">Subscribe to our mailing list to get the new updates!</p>
            
            <div className="flex mb-8">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-white text-gray-800 px-4 py-3 w-full outline-none text-sm"
              />
              <button className="bg-[#2d68ff] text-white px-6 py-3 font-bold text-xs uppercase hover:bg-white hover:text-[#2d68ff] transition-all">
                Sign Up
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex flex-wrap gap-2">
              {[Facebook, Twitter, Linkedin, Instagram, Rss, Youtube].map((Icon, idx) => (
                <div key={idx} className="w-8 h-8 bg-[#2d3a4b] flex items-center justify-center hover:bg-[#2d68ff] cursor-pointer transition-colors">
                  <Icon size={14} className="text-white" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs">
            Kapee © 2026 by PressLayouts All Rights Reserved.
          </p>
          <div className="flex gap-2">
            {/* Simple colored blocks to represent payment icons as seen in image */}
            {['VISA', 'PayPal', 'DISCOVER', 'Maestro', 'MasterCard', 'AMEX'].map((card) => (
              <div key={card} className="bg-white h-6 w-10 rounded-sm flex items-center justify-center text-[8px] font-bold text-gray-400">
                {card}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};