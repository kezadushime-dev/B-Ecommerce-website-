import React from 'react';
import { MapPin, Mail, Phone, Send, Clock } from 'lucide-react';

export const ContactUsPage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="relative h-[250px] flex flex-col items-center justify-center bg-[#222]">
        <h1 className="text-5xl font-black text-white mb-2">Contact Us</h1>
        <p className="text-white/70 text-xs font-bold uppercase tracking-[0.3em]">Home / Contact Us</p>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-1 space-y-10">
            <div>
              <h2 className="text-3xl font-black uppercase mb-6">Get In Touch</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur pretium nisi feugiat nisi gravida, eget rutrum ligula placerat. Aenean id elit dolor. Suspendisse malesuada varius odio.
              </p>
              <p className="text-gray-500 text-sm leading-relaxed">
                Praesent efficitur, odio at dictum fringilla, leo dolor ornare nulla, quis condimentum enim arcu id magna. Phasellus congue hendrerit dolor id commodo. Suspendisse potenti.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-black uppercase mb-4">Our Office</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <MapPin size={16} className="text-blue-600 mt-1" />
                  <div>
                    <p className="text-sm font-bold">Address:</p>
                    <p className="text-gray-500 text-sm">105 Street, New City, United State.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Phone size={16} className="text-blue-600 mt-1" />
                  <div>
                    <p className="text-sm font-bold">Phone:</p>
                    <p className="text-gray-500 text-sm">(012) 345 9870</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Mail size={16} className="text-blue-600 mt-1" />
                  <div>
                    <p className="text-sm font-bold">Email:</p>
                    <p className="text-gray-500 text-sm">mail@example.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-black uppercase mb-4">Working Hours</h3>
              <div className="flex gap-3">
                <Clock size={16} className="text-blue-600 mt-1" />
                <div className="text-sm text-gray-500">
                  <p>Monday - Friday 9am to 7pm</p>
                  <p>Saturday - 9am to 2pm</p>
                  <p>Sunday - Closed</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-gray-50 p-10 rounded-sm mb-8">
              <h2 className="text-2xl font-black uppercase mb-6">Send Us Message</h2>
              <p className="text-gray-500 text-sm mb-8">Contact us to get any support or help.</p>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="Your Name (required)" className="bg-white border-none p-4 text-sm outline-none focus:ring-1 focus:ring-blue-600" />
                <input type="email" placeholder="Your Email (required)" className="bg-white border-none p-4 text-sm outline-none focus:ring-1 focus:ring-blue-600" />
                <input type="text" placeholder="Subject" className="md:col-span-2 bg-white border-none p-4 text-sm outline-none focus:ring-1 focus:ring-blue-600" />
                <textarea placeholder="Your Message" rows={6} className="md:col-span-2 bg-white border-none p-4 text-sm outline-none focus:ring-1 focus:ring-blue-600"></textarea>
                <button className="bg-blue-600 text-white font-bold uppercase py-4 px-10 text-xs tracking-widest hover:bg-black transition-all flex items-center gap-2 w-max">
                  Send Message <Send size={14} />
                </button>
              </form>
            </div>
            
            {/* Google Map */}
            <div className="h-64 bg-gray-200 rounded-sm overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.1234567890123!2d-74.0059413!3d40.7127753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMjEuNCJX!5e0!3m2!1sen!2sus!4v1234567890123"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};