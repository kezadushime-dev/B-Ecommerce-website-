import React from 'react';
import {
  Check, Truck, Headset, RotateCcw,
  Monitor, Rocket, Settings, PenTool, PhoneCall, Code,
  Search, User, Heart, ShoppingCart, MapPin, Mail, Phone,
  Facebook, Twitter, Linkedin, Instagram, Youtube, Rss
} from 'lucide-react';

// --- Header Component ---
const Header = () => (
  <header className="w-full bg-white">
    {/* Top Bar */}
    <div className="border-b border-gray-100 py-2 hidden md:block">
      <div className="container mx-auto px-4 flex justify-between items-center text-[11px] text-gray-500 font-medium">
        <p>FREE SHIPPING FOR ALL ORDERS OF $200</p>
        <div className="flex gap-4">
          <span className="hover:text-blue-600 cursor-pointer transition-colors uppercase">Store Location</span>
          <span className="hover:text-blue-600 cursor-pointer transition-colors uppercase">Track Your Order</span>
        </div>
      </div>
    </div>
    {/* Main Nav */}
    <div className="container mx-auto px-4 py-5 flex justify-between items-center">
      <div className="text-3xl font-black italic tracking-tighter text-slate-900">kapee.</div>
      <nav className="hidden lg:flex gap-8 text-xs font-black uppercase tracking-widest text-slate-800">
        <a href="#" className="hover:text-blue-600 transition-colors">Home</a>
        <a href="#" className="text-blue-600">About Us</a>
        <a href="#" className="hover:text-blue-600 transition-colors">Shop</a>
        <a href="#" className="hover:text-blue-600 transition-colors">Blog</a>
        <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
      </nav>
      <div className="flex gap-5 text-slate-800">
        <Search size={20} className="cursor-pointer hover:text-blue-600" />
        <User size={20} className="cursor-pointer hover:text-blue-600" />
        <div className="relative cursor-pointer hover:text-blue-600">
          <Heart size={20} />
          <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">0</span>
        </div>
        <div className="relative cursor-pointer hover:text-blue-600">
          <ShoppingCart size={20} />
          <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">0</span>
        </div>
      </div>
    </div>
  </header>
);

// --- Footer Component ---
const Footer = () => (
  <footer className="bg-[#1a222d] text-[#a0a9b2] pt-16 pb-8 mt-20">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div>
          <h2 className="text-white text-3xl font-bold mb-6 italic">kapee.</h2>
          <p className="text-sm leading-relaxed mb-6">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3"><MapPin size={18} className="text-white shrink-0"/> 2046 Lorem Ipsum, USA</li>
            <li className="flex gap-3"><Phone size={18} className="text-white shrink-0"/> 576-245-2478</li>
            <li className="flex gap-3"><Mail size={18} className="text-white shrink-0"/> info@kapee.com</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold uppercase text-xs mb-6 tracking-widest">Information</h4>
          <ul className="space-y-3 text-sm">
            {['About Us', 'Contact Us', 'Shipping & Delivery', 'Privacy Policy', 'Terms of Sale'].map(l => <li key={l} className="hover:text-white transition-colors cursor-pointer">{l}</li>)}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold uppercase text-xs mb-6 tracking-widest">Newsletter</h4>
          <p className="text-sm mb-4">Subscribe to our mailing list to get the updates!</p>
          <div className="flex bg-white p-1 rounded-sm">
            <input type="email" placeholder="Your email..." className="w-full px-3 py-2 text-gray-800 outline-none text-xs" />
            <button className="bg-blue-600 text-white px-4 py-2 text-[10px] font-bold uppercase hover:bg-black transition-all">Sign Up</button>
          </div>
        </div>
        <div>
          <h4 className="text-white font-bold uppercase text-xs mb-6 tracking-widest">Follow Us</h4>
          <div className="flex gap-2">
            {[Facebook, Twitter, Linkedin, Instagram, Youtube, Rss].map((Icon, i) => (
              <div key={i} className="w-8 h-8 bg-[#2d3a4b] flex items-center justify-center hover:bg-blue-600 cursor-pointer transition-colors rounded-sm">
                <Icon size={14} className="text-white" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="pt-8 border-t border-gray-700 text-center text-[11px] uppercase tracking-widest">
        Kapee © 2026 by PressLayouts. All Rights Reserved.
      </div>
    </div>
  </footer>
);

// --- Main About Component ---
const AboutPage = () => {
  return (
    <div className="font-sans antialiased text-slate-800">
      <Header />

      {/* Hero Header */}
      <div className="relative h-[280px] flex flex-col items-center justify-center bg-[#222]">
        <img src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1600" 
             className="absolute inset-0 w-full h-full object-cover opacity-30" alt="" />
        <h1 className="relative z-10 text-5xl font-black text-white mb-2 tracking-tight">About Us</h1>
        <p className="relative z-10 text-white/70 text-xs font-bold uppercase tracking-[0.3em]">Home / About Us</p>
      </div>

      <div className="container mx-auto px-4">
        
        {/* Section: About Kapee */}
        <section className="py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <img src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800" className="rounded shadow-2xl" alt="" />
          <div>
            <h2 className="text-4xl font-black mb-1">About Kapee</h2>
            <p className="text-blue-600 font-bold text-sm uppercase mb-6">Welcome to kapee theme</p>
            <p className="text-gray-500 leading-relaxed mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eget consectetur purus, ac consectetur dui. Nam nec mauris id libero pharetra lacinia in eu lacus.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                  <div className="bg-blue-600 p-1 rounded-sm"><Check size={12} className="text-white" /></div>
                  Lorem ipsum dolor sit amet
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section: Why Choose Us */}
        <section className="py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center bg-gray-50 rounded-lg p-10">
          <div>
            <h2 className="text-4xl font-black mb-8">Why Choose Us</h2>
            <div className="space-y-10">
              {[
                { Icon: Truck, title: "Free Shipping", text: "Praesent eget porttitor lectus. Integer molestie vehicula porttitor. In vehicula, ante at lacinia, lorem augue sodales sodales." },
                { Icon: Headset, title: "24/7 Support", text: "Praesent eget porttitor lectus. Integer molestie vehicula porttitor. In vehicula, ante at lacinia, lorem augue sodales sodales." },
                { Icon: RotateCcw, title: "30 Days Returns", text: "Praesent eget porttitor lectus. Integer molestie vehicula porttitor. In vehicula, ante at lacinia, lorem augue sodales sodales." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <item.Icon size={48} strokeWidth={1} className="text-slate-800 shrink-0" />
                  <div>
                    <h4 className="font-black text-lg uppercase tracking-tight">{item.title}</h4>
                    <p className="text-gray-500 text-sm mt-2 leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <img src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=800" className="rounded shadow-2xl h-[550px] object-cover" alt="" />
        </section>

        {/* Section: Kapee Features (Blue Icons) */}
        <section className="py-20 text-center">
          <p className="text-blue-600 text-xs font-black uppercase tracking-[0.3em] mb-3">Best Features</p>
          <h2 className="text-4xl font-black mb-16 uppercase">Kapee Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { Icon: Monitor, title: "Fully Responsive" },
              { Icon: Rocket, title: "Fastest Page Load" },
              { Icon: Settings, title: "SEO Base Built-In" },
              { Icon: PenTool, title: "Translation Ready" },
              { Icon: PhoneCall, title: "Dedicated Support" },
              { Icon: Code, title: "No Coding Skills" },
            ].map((f, i) => (
              <div key={i} className="group p-8 hover:bg-white hover:shadow-2xl transition-all border border-transparent hover:border-gray-50">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <f.Icon size={30} />
                </div>
                <h4 className="font-black text-sm uppercase tracking-widest mb-4">{f.title}</h4>
                <p className="text-gray-400 text-xs leading-relaxed">Pellentesque maximus mattis ullamcorper. Nam feugiat neque placerat, mattis odio tellus.</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Testimonials */}
        <section className="py-20">
          <div className="text-center mb-16">
            <p className="text-blue-600 text-xs font-black uppercase tracking-widest mb-3">Our Testimonial</p>
            <h2 className="text-4xl font-black uppercase">Our Clients Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Alexander Alex', 'Melissa Smith', 'Theo Lee'].map((name, i) => (
              <div key={i} className="text-center">
                <div className="bg-[#f8f8f8] p-10 rounded mb-8 relative italic text-gray-500 text-sm">
                  "Praesent eget porttitor lectus. Integer molestie vehicula porttitor. In vehicula, ante at lacinia, lorem augue sodales sodales vestibulum."
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-[#f8f8f8] rotate-45"></div>
                </div>
                <img src={`https://i.pravatar.cc/150?u=${i}`} className="w-16 h-16 rounded-full mx-auto mb-4 grayscale" alt="" />
                <h5 className="font-bold text-sm uppercase">{name}</h5>
                <p className="text-blue-600 text-[10px] font-bold uppercase">Customer</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;