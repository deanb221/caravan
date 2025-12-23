import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative w-24 h-24">
                <Image
                  src="/logo.png"
                  alt="NI Caravan Hire Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold text-white">Caravan Hire</span>
            </div>
            <p className="text-gray-400 mb-4 font-medium">
              Explore Northern Ireland in comfort and style. Quality touring caravans for unforgettable adventures. 
              Create family memories that will last a lifetime.
            </p>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-semibold">Email:</span> booking@nicaravanhire.co.uk
              </p>
              <p className="text-sm">
                <span className="font-semibold">Phone:</span> 02891 314757
              </p>
            </div>
            <div className="mt-4">
              <a
                href="https://www.facebook.com/profile.php?id=61585460766953"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-gray-400 hover:text-primary-400 transition-colors"
                aria-label="Visit our Facebook page"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Follow us on Facebook</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-primary-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/caravans" className="hover:text-primary-400 transition-colors">
                  Caravans
                </Link>
              </li>
              <li>
                <Link href="/sites" className="hover:text-primary-400 transition-colors">
                  Caravan Sites
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary-400 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="text-white font-semibold mb-4">Service Areas</h3>
            <ul className="space-y-2 text-sm">
              <li>Belfast</li>
              <li>Derry/Londonderry</li>
              <li>Antrim Coast</li>
              <li>Giant's Causeway</li>
              <li>All of Northern Ireland</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} NI Caravan Hire. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

