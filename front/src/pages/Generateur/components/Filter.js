import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XIcon, TrashIcon, PencilAltIcon } from "@heroicons/react/solid";
import {
  FilterIcon,
  MinusIcon,
  PlusIcon,
  ViewGridIcon,
} from "@heroicons/react/outline";
import { Fragment, useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/solid";

import axios from "axios";

function addMinutes(time, minsToAdd) {
  function D(J){ return (J<10? '0':'') + J;};
  var piece = time.split(':');
  var mins = piece[0]*60 + +piece[1] + +minsToAdd;

  return D(mins%(24*60)/60 | 0) + ':' + D(mins%60);  
}  




export default function Filter() {
  const [open, setOpen] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  const cancelButtonRef = useRef(null);

  const [indisponibilites, setIndisponibilites] = useState([]);
  const [examens, setExamens] = useState([]);
  const [fermetures, setfermetures] = useState([]);
  const [personnes, setpersonnes] = useState([]);
  const [matieres, setmatieres] = useState([]);
  const [specialite, setspecialite] = useState([]);

  const [modal, setModal] = useState({
    type: null,
    nom: "Default...",
    description: "Description...",
  });

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [etudiantid, setEtudiantid] = useState("");
  const [examid, setExamid] = useState("");
  const [indispoid, setIndispoid] = useState("");
  const [fermid, setFerm] = useState("");

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duree, setduree] = useState("");

  let modifyEtu = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(
        "http://localhost:8001/api/personnes/" + etudiantid,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            nom: prenom,
            prenom: nom,
            naissance: "2001-03-01",
            enseignant: false,
            sexe: true
          })
        }
      );
      let resJson = await res.json();
      if (res.status === 200) {
        setNom("");
        setPrenom("");
      }
    } catch (err) {
      console.log(err);
    }
  };
  let modifyExam = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(
        "http://localhost:8001/api/examens/" + examid,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            debut: date+"T"+time,
            fin: date+"T"+addMinutes(time, '60'),
            duree_min:60
          })
        }
      );
      console.log(date+"T"+addMinutes(time, '60'))
      let resJson = await res.json();
      if (res.status === 200) {
        setNom("");
        setPrenom("");
        console.log("yes");
      } else {
        console.log("no");
      }
    } catch (err) {
      console.log(err);
    }
  };
  let modifyIndispo = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(
        "http://localhost:8001/api/personnes/" + etudiantid,
        {
          method: "POST",
          body: JSON.stringify({
            name: nom,
            prenom: prenom,
            naissance: "2001-03-08",
            sexe: true,
            enseignant: true,
          }),
        }
      );
      let resJson = await res.json();
      if (res.status === 200) {
        setNom("");
        setPrenom("");
        console.log("yes");
      } else {
        console.log("no");
      }
    } catch (err) {
      console.log(err);
    }
  };
  let modifyFerm = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(
        "http://localhost:8001/api/personnes/" + etudiantid,
        {
          method: "POST",
          body: JSON.stringify({
            name: nom,
            prenom: prenom,
            naissance: "2001-03-08",
            sexe: true,
            enseignant: true,
          }),
        }
      );
      let resJson = await res.json();
      if (res.status === 200) {
        setNom("");
        setPrenom("");
        console.log("yes");
      } else {
        console.log("no");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const personnes = await axios(
        "http://localhost:8001/api/personnes?size=10000"
      );
      const crenaux = await axios(
        "http://localhost:8001/api/creneaus?size=10000"
      );
      const matiere = await axios(
        "http://localhost:8001/api/matieres?size=10000"
      );
      const specialite = await axios(
        "http://localhost:8001/api/specialites?size=10000"
      );

      setIndisponibilites(crenaux.data._embedded.indisponibilites);
      setExamens(crenaux.data._embedded.examens);
      setfermetures(crenaux.data._embedded.fermetures);
      setpersonnes(personnes.data._embedded.personnes);
      setmatieres(matiere.data._embedded.matieres);
      setspecialite(specialite.data._embedded.specialites);
    };

    fetchData();
  }, []);
  const filters = [
    {
      id: "indisponibilites",
      name: "Indisponibilites",
      options: indisponibilites,
    },
    {
      id: "examens",
      name: "Examens",
      options: examens,
    },
    {
      id: "etudiant",
      name: "Etudiant",
      options: personnes,
    },
    {
      id: "fermetures",
      name: "Fermetures",
      options: fermetures,
    },
  ];

  return (
    <div className="bg-white">
      <div>
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pt-6 pb-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Elements
            </h1>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <Disclosure as="div" className="border-b border-gray-200 py-6">
                  {({ open }) => (
                    <>
                      <h3 className="-my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-extrabold text-gray-900">
                            Examens
                          </span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <PlusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-4">
                          <div>
                            <div className="flow-root mt-6">
                              <ul
                                role="list"
                                className="-my-5 divide-y divide-gray-200"
                              >
                                {filters[1].options.map((option) => (
                                  <li key={option.debut} className="py-4">
                                    <div className="flex items-center space-x-4">
                                      <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                          {option.debut}
                                        </p>
                                        <p className="text-sm text-gray-500 truncate">
                                          {option.fin}
                                        </p>
                                      </div>
                                      <div>
                                        <a
                                          href="#"
                                          className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                                          onClick={() => {
                                            setOpenTime(true);
                                            setDate(option.debut.split("T")[0]);
                                            setTime(option.debut.split("T")[1]);
                                            setExamid(
                                              option._links.self.href
                                                .split("/")
                                                .pop()
                                            );


                                          }}
                                        >
                                          <PencilAltIcon
                                            className="h-4 w-4"
                                            aria-hidden="true"
                                          />
                                        </a>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Disclosure as="div" className="border-b border-gray-200 py-6">
                  {({ open }) => (
                    <>
                      <h3 className="-my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-extrabold text-gray-900">
                            Indisponibilités
                          </span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <PlusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-4">
                          <div>
                            <div className="flow-root mt-6">
                              <ul
                                role="list"
                                className="-my-5 divide-y divide-gray-200"
                              >
                                {filters[0].options.map((option) => (
                                  <li key={option.debut} className="py-4">
                                    <div className="flex items-center space-x-4">
                                      <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                          {option.debut}
                                        </p>
                                        <p className="text-sm text-gray-500 truncate">
                                          {option.fin}
                                        </p>
                                      </div>
                                      <div>
                                        <a
                                          href="#"
                                          className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                                          onClick={() => {
                                            setOpenTime(true);
                                            setDate(option.debut.split("T")[0]);
                                            setTime(option.debut.split("T")[1]);
                                            setIndispoid(
                                              option._links.self.href
                                                .split("/")
                                                .pop()
                                            );
                                          }}
                                        >
                                          <PencilAltIcon
                                            className="h-4 w-4"
                                            aria-hidden="true"
                                          />
                                        </a>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Disclosure as="div" className="border-b border-gray-200 py-6">
                  {({ open }) => (
                    <>
                      <h3 className="-my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-extrabold text-gray-900">
                            Étudiants
                          </span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <PlusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-4">
                          <div>
                            <div className="flow-root mt-6">
                              <ul
                                role="list"
                                className="-my-5 divide-y divide-gray-200"
                              >
                                {filters[2].options.map((option) => (
                                  <li key={option.prenom} className="py-4">
                                    <div className="flex items-center space-x-4">
                                      <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                          {option.prenom + " " + option.nom}
                                        </p>
                                        <p className="text-sm text-gray-500 truncate">
                                          {option.naissance}
                                        </p>
                                      </div>
                                      <div>
                                        <a
                                          href="#"
                                          className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                                          onClick={() => {
                                            setOpen(true);
                                            setEtudiantid(
                                              option._links.self.href
                                                .split("/")
                                                .pop()
                                            );
                                            setNom(option.prenom);
                                            setPrenom(option.nom);
                                          }}
                                        >
                                          <PencilAltIcon
                                            className="h-4 w-4"
                                            aria-hidden="true"
                                          />
                                        </a>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Disclosure as="div" className="border-b border-gray-200 py-6">
                  {({ open }) => (
                    <>
                      <h3 className="-my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-extrabold text-gray-900">
                            Fermetures
                          </span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <PlusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-4">
                          <div>
                            <div className="flow-root mt-6">
                              <ul
                                role="list"
                                className="-my-5 divide-y divide-gray-200"
                              >
                                {filters[3].options.map((option) => (
                                  <li key={option.debut} className="py-4">
                                    <div className="flex items-center space-x-4">
                                      <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                          {option.debut}
                                        </p>
                                        <p className="text-sm text-gray-500 truncate">
                                          {option.fin}
                                        </p>
                                      </div>
                                      <div>
                                        <a
                                          href="#"
                                          className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                                          onClick={() => {
                                            setOpenTime(true);
                                            setDate(option.debut.split("T")[0]);
                                            setTime(option.debut.split("T")[1]);
                                            setTime(Number(option.duree));
                                          }}
                                        >
                                          <PencilAltIcon
                                            className="h-4 w-4"
                                            aria-hidden="true"
                                          />
                                        </a>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </form>
            </div>
          </section>
        </main>
      </div>


      
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <PencilAltIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-6 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          Modification
                        </Dialog.Title>
                        <form onSubmit={modifyEtu}>
                          <div className="overflow-hidden mt-10 sm:rounded-md">
                            <div className="bg-white">
                              <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                  <label
                                    htmlFor="first-name"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Prénom
                                  </label>
                                  <input
                                    type="text"
                                    value={nom}
                                    onChange={(e) => setNom(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                  <label
                                    htmlFor="last-name"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Nom de famille
                                  </label>
                                  <input
                                    type="text"
                                    value={prenom}
                                    onChange={(e) => setPrenom(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                              <button
                                type="submit"
                                className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={() => setOpen(false)}
                              >
                                Modifier
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <Transition.Root show={openTime} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <PencilAltIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-6 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          Modification
                        </Dialog.Title>
                        <form onSubmit={modifyExam}>
                          <div className="overflow-hidden mt-10 sm:rounded-md">
                            <div className="bg-white">
                              <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                  <label
                                    htmlFor="first-name"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Date
                                  </label>
                                  <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                  <label
                                    htmlFor="last-name"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Heure
                                  </label>
                                  <input
                                    type="time"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  />
                                </div>

                              </div>
                            </div>
                            <div className=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                              <button
                                type="submit"
                                className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={() => setOpenTime(false)}
                              >
                                Modifier
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
