/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, DotsHorizontalIcon } from '@heroicons/react/solid'
import { Menu, Transition } from '@headlessui/react'
import axios from 'axios'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const container = useRef(null)
  const containerNav = useRef(null)
  const containerOffset = useRef(null)

  const [indisponibilites, setIndisponibilites] = useState([]);
  const [examens, setExamens] = useState([]);
  const [fermetures, setfermetures] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:8001/api/creneaus?size=10000");
      setIndisponibilites(result.data._embedded.indisponibilites)
      setExamens(result.data._embedded.examens)
      setfermetures(result.data._embedded.fermetures)
    
    };
    const currentMinute = new Date().getHours() * 60
    container.current.scrollTop =
      ((container.current.scrollHeight - containerNav.current.offsetHeight - containerOffset.current.offsetHeight) *
        currentMinute) /
      1440
    fetchData();
  },[])

function dateToPxHeight(date){
  return [date.getDay(), date.getHours()*12+date.getMinutes()/60*12+date.getSeconds()/3600*12+2]
  
}
  

  const { idPlanning } = useParams()
  return (
    <div className="flex h-full flex-col">
      <header className="relative z-20 flex flex-none items-center justify-between border-b border-gray-200 py-4 px-6">
        <h1 className="text-lg font-semibold text-gray-900">
            <h2 className="text-xs text-red-600 font-semibold tracking-wide uppercase">{ idPlanning }</h2>
          <time dateTime="2022-01">January 2022</time>
        
        </h1>
        <div className="flex items-center">
          <div className="flex items-center rounded-md shadow-sm md:items-stretch">
            <button
              type="button"
              className="flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-white py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="hidden border-t border-b border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:relative md:block"
            >
              Today
            </button>
            <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
            <button
              type="button"
              className="flex items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-white py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden md:ml-4 md:flex md:items-center">
            <div className="ml-2 h-6 w-px bg-gray-300" />
            <button type="button" className="focus:outline-none ml-6 rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
              Add event
            </button>
          </div>
          <Menu as="div" className="relative ml-6 md:hidden">
            <Menu.Button className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-5 w-5" aria-hidden="true" />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="focus:outline-none absolute right-0 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a href="#" className={classNames( active ? 'bg-gray-100 text-gray-900' : 'text-gray-700','block px-4 py-2 text-sm')}>
                        Create event
                      </a>
                    )}
                  </Menu.Item>
                </div>
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a href="#" className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700','block px-4 py-2 text-sm')}>
                        Go to today
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </header>

      <div ref={container} className="flex flex-auto flex-col overflow-auto bg-white" style={{ height: '80vh' }}>
        <div style={{ width: '165%' }} className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full">
          <div ref={containerNav} className="sticky top-0 z-10 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-8">
            <div className="grid grid-cols-7 text-sm leading-6 text-gray-500 sm:hidden">
              <button type="button" className="flex flex-col items-center pt-2 pb-3">
                L <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">10</span>
              </button>
              <button type="button" className="flex flex-col items-center pt-2 pb-3">
                M <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">11</span>
              </button>
              <button type="button" className="flex flex-col items-center pt-2 pb-3">
                Mer{' '}
                <span className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 font-semibold text-white">
                  12
                </span>
              </button>
              <button type="button" className="flex flex-col items-center pt-2 pb-3">
                J <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">13</span>
              </button>
              <button type="button" className="flex flex-col items-center pt-2 pb-3">
                V <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">14</span>
              </button>
              <button type="button" className="flex flex-col items-center pt-2 pb-3">
                S <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">15</span>
              </button>
              <button type="button" className="flex flex-col items-center pt-2 pb-3">
                D <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">16</span>
              </button>
            </div>

            <div className="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 sm:grid">
              <div className="col-end-1 w-14" />
              <div className="flex items-center justify-center py-3">
                <span>
                  Lun <span className="items-center justify-center font-semibold text-gray-900">10</span>
                </span>
              </div>
              <div className="flex items-center justify-center py-3">
                <span>
                  Mar <span className="items-center justify-center font-semibold text-gray-900">11</span>
                </span>
              </div>
              <div className="flex items-center justify-center py-3">
                <span className="flex items-baseline">
                  Mer{' '}
                  <span className="ml-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 font-semibold text-white">
                    12
                  </span>
                </span>
              </div>
              <div className="flex items-center justify-center py-3">
                <span>
                  Jeu <span className="items-center justify-center font-semibold text-gray-900">13</span>
                </span>
              </div>
              <div className="flex items-center justify-center py-3">
                <span>
                  Ven <span className="items-center justify-center font-semibold text-gray-900">14</span>
                </span>
              </div>
              <div className="flex items-center justify-center py-3">
                <span>
                  Sam <span className="items-center justify-center font-semibold text-gray-900">15</span>
                </span>
              </div>
              <div className="flex items-center justify-center py-3">
                <span>
                  Dim <span className="items-center justify-center font-semibold text-gray-900">16</span>
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-auto">
            <div className="sticky left-0 w-14 flex-none bg-white ring-1 ring-gray-100" />
            <div className="grid flex-auto grid-cols-1 grid-rows-1">
              {/* Horizontal lines */}
              <div
                className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
                style={{ gridTemplateRows: 'repeat(48, minmax(2.5rem, 1fr))' }}
              >
                <div ref={containerOffset} className="row-end-1 h-7"></div>
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    00:00
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    01:00
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    02:00
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    03:00
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    04:00
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    05:00
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    06:00
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    07:00
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    08:00
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    09:00
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    10:00
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    11:00
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    00:00
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    01:00
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    02:00
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    03:00
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    04:00
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    05:00
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    06:00
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    07:00
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    08:00
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    09:00
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    10:00
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    11:00
                  </div>
                </div>
                <div />
              </div>

              {/* Vertical lines */}
              <div className="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-gray-100 sm:grid sm:grid-cols-7">
                <div className="col-start-1 row-span-full" />
                <div className="col-start-2 row-span-full" />
                <div className="col-start-3 row-span-full" />
                <div className="col-start-4 row-span-full" />
                <div className="col-start-5 row-span-full" />
                <div className="col-start-6 row-span-full" />
                <div className="col-start-7 row-span-full" />
                <div className="col-start-8 row-span-full w-8" />
              </div>

              {/* Events
              .map((data) => {
                  return(
                    <p>{data.debut}</p>
                  )
                })
              
              */}
              <ol className="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-8" style={{ gridTemplateRows: '1.75rem repeat(288, minmax(0, 1fr)) auto' }}>
                {
                  indisponibilites.map((res) =>{
                    
                    const currentDate = new Date(res.debut);
                    const coords = dateToPxHeight(currentDate);
                    console.log("[INDISPONIBLE] : relative mt-px flex sm:col-start-"+ String(coords[0]))
                    return(
                      <li className={"relative mt-px flex sm:col-start-"+ String(coords[0])} style={{ gridRow: String(coords[1]) + ' / span ' + String(res.duree_min/60*12) }}>
                        <a href="#" className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-slate-50 p-2 text-xs leading-5 hover:bg-slate-100">
                          <p className="order-1 font-semibold text-slate-700">Indispo.</p>
                          <p className="text-slate-500 green-hover:text-blue-700">
                            <time dateTime={res.debut}>{currentDate.toLocaleString('fr-FR', { 
                              hour: '2-digit', 
                              minute: '2-digit',
                              hour12: false 
                            })}</time>
                          </p>
                        </a>
                      </li>
                    )
                  })
                }{
                  examens.map((res) =>{
                    
                    const currentDate = new Date(res.debut);
                    const coords = dateToPxHeight(currentDate);
                    console.log("[EXAMEN] : relative mt-px flex sm:col-start-"+ res.indexSemaine)
                    return(
                      <li className={"relative mt-px flex sm:col-start-" + String(coords[0])} style={{ gridRow: String(coords[1]) + ' / span ' + String(res.duree_min/60*12) }}>
                        <a href="#" className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-red-50 p-2 text-xs leading-5 hover:bg-red-100">
                          <p className="order-1 font-semibold text-red-700">Examen</p>
                          <p className="text-red-500 green-hover:text-blue-700">
                            <time dateTime={res.debut}>{currentDate.toLocaleString('fr-FR', { 
                              hour: '2-digit', 
                              minute: '2-digit',
                              hour12: false 
                            })}</time>
                          </p>
                        </a>
                      </li>
                    )
                  })
                }{
                  fermetures.map((res) =>{
                    
                    const currentDate = new Date(res.debut);
                    const coords = dateToPxHeight(currentDate);
                    console.log("[FERMETURE] : relative mt-px flex sm:col-start-"+ String(coords[0]))
                    return(
                      <li className={"relative mt-px flex sm:col-start-"+ res.indexSemaine} style={{ gridRow: String(coords[1]) + ' / span ' + String(res.duree_min/60*12) }}>
                        <a href="#" className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-neutral-50 p-2 text-xs leading-5 hover:bg-neutral-100 bg-[url('https://img.freepik.com/premium-vector/diagonal-lines-texture-gray-design-seamless-striped-vector-geometric-background_547648-2469.jpg?w=2000')]">
                          <p className="order-1 font-semibold text-neutral-700">Fermetrure</p>
                          <p className="text-neutral-500 neutral-hover:text-blue-700">
                            <time dateTime={res.debut}>{currentDate.toLocaleString('fr-FR', { 
                              hour: '2-digit', 
                              minute: '2-digit',
                              hour12: false 
                            })}</time>
                          </p>
                        </a>
                      </li>
                    )
                  })
                }
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
