

import Background from "../../components/Background";
import Navbar from '../../components/Navbar/Navbar';
import Footer from "../../components/Footer";
import Calendar from "./components/Calendar";
import Filter from "./components/Filter";

const user = {
  name: 'Ibrahim ADLANI',
  email: 'ibrahim@adlani.com',
  imageUrl:
    'https://avatars.githubusercontent.com/u/77414477?v=4',
}
const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'Générateur', href: '/generateur' },
  { name: 'Informations', href: '/information' },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]
const stats = [
  { label: 'Etudiant', value: "Status" },
  { label: 'Sick days left', value: 4 },
]
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export default function Example() {

  return (
    <>
      <div className="relative bg-gray-50 overflow-hidden">
      <Background />
      <div className="relative pt-6 pb-16 sm:pb-24">
        <Navbar navigation = { navigation }/>
        <main className="mt-14 pb-8">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="sr-only">Page title</h1>
            {/* Main 3 column grid */}
            <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
              {/* Left column */}
              
              <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                
                <section aria-labelledby="section-1-title">
                  <h2 className="sr-only" id="section-1-title">
                    Section title
                  </h2>
                  <div className="rounded-lg bg-white overflow-hidden shadow">
                    <div className="p-6">
                      
                      <Calendar />
                    </div>
                  </div>
                </section>
              </div>

              {/* Right column */}
              <div className="grid grid-cols-1 gap-4">
              <section aria-labelledby="profile-overview-title">
                  <div className="rounded-lg bg-white overflow-hidden shadow">
                    <h2 className="sr-only" id="profile-overview-title">
                      Profile Overview
                    </h2>
                    <div className="bg-white p-6">
                      <div className="sm:flex sm:items-center sm:justify-between">
                        <div className="sm:flex sm:space-x-5">
                          <div className="flex-shrink-0">
                            <img className="mx-auto h-20 w-20 rounded-full" src={user.imageUrl} alt="" />
                          </div>
                          <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                            <p className="text-sm font-medium text-gray-600">Bonjour,</p>
                            <p className="text-xl font-bold text-gray-900 sm:text-2xl">{user.name}</p>
                            <p className="text-sm font-medium text-gray-600">{user.role}</p>
                          </div>
                        </div>
                        
                      </div>
                    </div>
                    <div className="border-t border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
                      {stats.map((stat) => (
                        <div key={stat.label} className="px-6 py-5 text-sm font-medium text-center">
                          <span className="text-gray-900">{stat.value}</span>{' '}
                          <span className="text-gray-600">{stat.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
                <section aria-labelledby="section-2-title">
                  <h2 className="sr-only" id="section-2-title">
                    Section title
                  </h2>
                  <div className="rounded-lg bg-white overflow-hidden shadow">
                    <div className="p-6">
                      <Filter />
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>

    </>
  )
}
