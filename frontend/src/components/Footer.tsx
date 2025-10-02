import { Button } from "@/components/ui/button";
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Heart
} from "lucide-react";
import { Link } from "react-router-dom";
import moroccoLogo from "@/assets/logoworld.png";

export const Footer = () => {
  const linkMap: Record<string,string> = {
    "Stadium Map": "/stadiums",
    "Match Schedule": "/schedule",
    "Ticket Information": "/tickets",
    "Volunteering": "/volunteers",
    "Safety & Security": "/emergency",
    "FAQ": "/faq",
    "Contact Us": "/contact"
  };

  const quickLinks = [
    "Stadium Map",
    "City Guide", 
    "Match Schedule",
    "Ticket Information",
    "Volunteering",
    "Safety & Security",
    "FAQ",
    "Contact Us",
  ];

  const socialLinks = [
    { icon: Facebook, label: "Facebook", href: "#" },
    { icon: Twitter, label: "Twitter", href: "#" },
    { icon: Instagram, label: "Instagram", href: "#" },
    { icon: Youtube, label: "YouTube", href: "#" },
  ];

  return (
    <footer className="bg-[#111827] text-gray-300 px-6 py-12 rounded-t-2xl shadow-lg">
      {/* Main Footer Content */}
      <div className="grid lg:grid-cols-4 gap-8 mb-8">
        {/* Logo and Description */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <img 
                src={moroccoLogo} 
                alt="Morocco 2030 World Cup Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                Marhba Bik - Morocco World Cup 2030
              </h2>
              <p className="text-sm text-gray-400">FIFA World Cup 2030</p>
            </div>
          </div>
          
          <p className="text-gray-400 leading-relaxed">
            Join us on an extraordinary journey towards organizing the greatest football event in Morocco and Africa&apos;s history. 
            Where heritage meets modernity in an unforgettable football celebration.
          </p>

          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <MapPin className="w-5 h-5 text-green-500" />
            <span className="text-sm text-gray-400">
              Kingdom of Morocco - 9 host cities across Morocco
            </span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <div className="space-y-2">
            {quickLinks.map((link) => (
              <Link 
                key={link} 
                to={linkMap[link] || "/"} 
                className="block text-sm text-gray-400 hover:text-red-500 transition-colors duration-200"
              >
                {link}
              </Link>
            ))}
          </div>
        </div>

        {/* Social Media & Newsletter */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-3 rtl:space-x-reverse">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Newsletter</h3>
            <p className="text-sm text-gray-400 mb-3">
              Subscribe to receive latest news and updates
            </p>
            <div className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-red-600"
              />
              <Button className="bg-gradient-to-r from-red-600 to-green-600 hover:opacity-90 text-white text-sm rounded-md">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="pt-8 border-t border-gray-700">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center text-sm text-gray-400">
            <span>© 2024 Morocco World Cup 2030. All rights reserved.</span>
          </div>

          <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm">
            <Link to="/" className="text-gray-400 hover:text-red-500 transition-colors">
              Privacy
            </Link>
            <span className="text-gray-600">|</span>
            <Link to="/" className="text-gray-400 hover:text-red-500 transition-colors">
              Terms & Conditions
            </Link>
            <span className="text-gray-600">|</span>
            <Link to="/" className="text-gray-400 hover:text-red-500 transition-colors">
              Accessibility
            </Link>
          </div>

          <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-400">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>in Morocco</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
