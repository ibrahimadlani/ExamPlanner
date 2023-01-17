/* This example requires Tailwind CSS v2.0+ */
import {
  MailIcon,
  PhoneIcon,
  PencilIcon,
  TrashIcon
} from "@heroicons/react/solid";
import { Fragment, useRef, useState, useEffect } from 'react'
import axios from 'axios'



const people = [
  {
    name: "CY|Tech - Planning S4",
    title: "4 Spécialités, 12 Matières, 114 Étudiants",
    role: "Ing 1 GIA",
    email: "janecooper@example.com",
    telephone: "+1-202-555-0170",
    href: "planning_s4_gia1",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "CY|Tech - Planning S4",
    title: "6 Spécialités, 18 Matières, 154 Étudiants",
    role: "Ing 2 GIA",
    email: "janecooper@example.com",
    telephone: "+1-202-555-0170",
    href: "planning_s4_gia2",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "CY|Tech - Planning S3",
    title: "2 Spécialités, 8 Matières, 76 Étudiants",
    role: "Ing 1 GMA",
    email: "janecooper@example.com",
    telephone: "+1-202-555-0170",
    href: "planning_s3_gma1",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  }
];

export default function Grid() {

  const [plannings, setPlannings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:8001/api/plannings");
      setPlannings(result.data._embedded.plannings)
    
    };
    fetchData();
    
  },[])
  console.log(plannings)
  return (
    <main className="mt-14 pb-8 ">
      <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:max-w-7xl lg:p-8 bg-white shadow rounded">
        <h6 className="text-sm text-red-600 font-semibold tracking-wide uppercase">Générateur</h6>
        <h3 className="text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-3xl">Mes plannings</h3>
        <hr  className="my-5"/>
        <h1 className="sr-only">Page title</h1>
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <a
            type="button"
            className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-4 text-center hover:border-gray-400 focus:outline-none"
            href={"/planning/nouveau_planning"}
          >
            <img className="h-10 w-10 mx-auto" src={process.env.PUBLIC_URL + './images/calendar.svg'} />
            <span className="mt-2 block text-sm font-medium text-red-900">
              Crée un nouveau planning
            </span>
          </a>
          {people.map((person) => (
            <li
              key={person.email}
              className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
            >
              <div className="w-full flex items-center justify-between p-6 space-x-6">
                <div className="flex-1 truncate">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-gray-900 text-sm font-medium truncate">
                      {person.name}
                    </h3>
                    <span className="flex-shrink-0 inline-block px-2 py-0.5 text-red-800 text-xs font-medium bg-red-100 rounded-full">
                      {person.role}
                    </span>
                  </div>
                  <p className="mt-1 text-gray-500 text-sm truncate">
                    {person.title}
                  </p>
                </div>
              </div>
              <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                  <div className="w-0 flex-1 flex">
                    <a
                      href={`/planning/`+ person.href}
                      className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                    >
                      <PencilIcon
                        className="w-5 h-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="ml-3">Editer</span>
                    </a>
                  </div>
                  <div className="-ml-px w-0 flex-1 flex">
                    <a
                      href={`tel:${person.telephone}`}
                      className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                    >
                      <TrashIcon
                        className="w-5 h-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="ml-3">Supprimer</span>
                    </a>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
