/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar(props) {
  return (
        <Transition as={Fragment} enter="duration-150 ease-out" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="duration-100 ease-in" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Popover.Panel focus className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
                <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                  <div className="px-5 pt-4 flex items-center justify-between">
                    <div>
                      <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-red-600.svg" alt=""/>
                    </div>
                    <a href="/"><img className="h-8 w-auto sm:h-10" src="./images/logo_titre.svg" alt=""/></a>

                    <div className="-mr-2">
                      
                      <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500">
                        <span className="sr-only">Fermer le menu</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                  
                  <div className="px-2 pt-2 pb-3">
                    {props.navigation.map((navitem) => (
                      <a key={navitem.name} href={navitem.href} className="block px-3 py-2 rounded-md text-center font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                        {navitem.name}
                      </a>
                    ))}
                  </div>
                  <a href="/connexion" className="block w-full px-5 py-3 text-center font-medium text-red-600 bg-gray-50 hover:bg-gray-100">
                    Connexion
                  </a>
                </div>
              </Popover.Panel>
        </Transition>
  )
}