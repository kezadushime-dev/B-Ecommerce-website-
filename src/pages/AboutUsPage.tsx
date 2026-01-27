import React from 'react';

export const AboutUsPage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="relative h-[250px] flex flex-col items-center justify-center bg-[#222]">
        <h1 className="text-5xl font-black text-white mb-2">About Us 2</h1>
        <p className="text-white/70 text-xs font-bold uppercase tracking-[0.3em]">Home / About Us 2</p>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-black uppercase mb-6">what we do</h2>
            <h3 className="text-2xl font-bold mb-6">Welcome to our store</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur pretium nisi feugiat nisi gravida, eget rutrum ligula placerat. Aenean id elit dolor. Suspendisse malesuada varius odio. Praesent efficitur, odio at dictum fringilla, leo dolor ornare nulla, quis condimentum enim arcu id magna. Phasellus congue hendrerit dolor id commodo. Suspendisse potenti.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Duis pulvinar non ligula ut ullamcorper. Nulla eget mattis mauris. Etiam et erat sagittis libero tincidunt scelerisque. Etiam in finibus massa. Sed non faucibus nibh. Nunc elementum felis vel nibh fermentum euismod.
            </p>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                Lorem ipsum dolor sit amet, consectetur consequat tristique feugiat nisi gravida.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                Vivamus tortor velit elit. Duis non nisl volutpat arcu semper sagittis.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                Maecenas sit amet elit. Curabitur pretium nisi nisl quis tristique scelerisque arcu.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                Curabitur pretium nisi sit amet scelerisque arcu.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                Duis non nisl volutpat arcu semper sagittis sit amet scelerisque arcu.
              </li>
            </ul>
          </div>
          <div>
            <img 
              src="https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=600" 
              alt="About Us" 
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>

        {/* Our Skill Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-black uppercase mb-6">Our Skill</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Duis non nisl volutpat arcu semper sagittis. Curabitur purus lacus, congue non arcu a, laoreet maximus augue. Quisque ullamcorper efficitur rutrum. Nunc quis aliquet metus. Nunc malesuada varius erat, a auctor nisl. Donec ut tincidunt enim. Fusce pharetra iaculis ex, aliquam accumsan tellus iaculis id. Aliquam et mauris non augue fermentum luctus. Phasellus faucibus, tortor fermentum ultrices aliquam, diam odio lobortis libero, ut elementum justo elit vitae ante. Nam molestie vulputate massa eu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus porta leo consequat porttitor pretium. Curabitur id leo ut turpis consectetur scelerisque at blandit quam.
          </p>
          <div className="space-y-4">
            {[
              { skill: 'Web Development', percentage: 95 },
              { skill: 'Design', percentage: 85 },
              { skill: 'Marketing', percentage: 80 },
              { skill: 'HTML', percentage: 75 }
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between mb-2">
                  <span className="font-bold">{item.skill}</span>
                  <span className="font-bold">{item.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 h-2">
                  <div className="bg-blue-600 h-2" style={{ width: `${item.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Our Services Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-black uppercase mb-6">Our Services</h2>
          <p className="text-gray-600 mb-12 leading-relaxed">
            Vivamus tortor velit, porta nec mauris quis, lacinia non nisl volutpat arcu semper. Proin mollis est ac vestibulum eleifend consequat tristique.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: 'Clean Code', desc: 'Duis non nisl volutpat arcu semper sagittis. Curabitur purus lacus, congue non arcu a, laoreet maximus augue. Quisque ullamcorper efficitur rutrum. Nunc quis aliquet metus.' },
              { title: 'Well Doumented', desc: 'Duis non nisl volutpat arcu semper sagittis. Curabitur purus lacus, congue non arcu a, laoreet maximus augue. Quisque ullamcorper efficitur rutrum. Nunc quis aliquet metus.' },
              { title: 'Powerful Options', desc: 'Duis non nisl volutpat arcu semper sagittis. Curabitur purus lacus, congue non arcu a, laoreet maximus augue. Quisque ullamcorper efficitur rutrum. Nunc quis aliquet metus.' },
              { title: 'Design', desc: 'Duis non nisl volutpat arcu semper sagittis. Curabitur purus lacus, congue non arcu a, laoreet maximus augue. Quisque ullamcorper efficitur rutrum. Nunc quis aliquet metus.' }
            ].map((service, i) => (
              <div key={i} className="mb-6">
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-20">
          {[
            { number: '2100', label: 'Happy Clients' },
            { number: '1525', label: 'Projects Completed' },
            { number: '3522', label: 'Downloaded' },
            { number: '1280', label: 'Awards Won' }
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-4xl font-black text-blue-600 mb-2">{stat.number}</div>
              <div className="text-gray-600 font-bold">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Latest Blog Section */}
        <div>
          <h2 className="text-3xl font-black uppercase mb-6">Latest Blog</h2>
          <p className="text-gray-600 mb-12 leading-relaxed">
            Vivamus tortor velit, porta nec mauris quis, lacinia non nisl volutpat arcu semper. Proin mollis est ac vestibulum eleifend consequat tristique.
          </p>
        </div>
      </div>
    </div>
  );
};