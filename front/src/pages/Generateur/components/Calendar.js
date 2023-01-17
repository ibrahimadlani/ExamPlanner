/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
  ShieldExclamationIcon,
  PencilAltIcon
} from "@heroicons/react/solid";
import { Menu, Transition, Dialog } from "@headlessui/react";
import axios from "axios";

export default function Example() {
  const container = useRef(null);
  const containerNav = useRef(null);
  const containerOffset = useRef(null);

  const [indisponibilites, setIndisponibilites] = useState([]);
  const [examens, setExamens] = useState([]);
  const [fermetures, setfermetures] = useState([]);
  const [openTime, setOpenTime] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const cancelButtonRef = useRef(null);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [duree, setduree] = useState("");

  const fetchData = async () => {
    const result = await axios("http://localhost:8001/api/creneaus?size=10000");
    setIndisponibilites(result.data._embedded.indisponibilites);
    setExamens(result.data._embedded.examens);
    setfermetures(result.data._embedded.fermetures);
  };

  useEffect(() => {
    const fetchnom = async () => {
      for (let i = 0; i < examens.length; i++) {
        const result = await axios(examens[i]._links.matiere.href);
        examens[i]["nom"] = result.data.nom;
      }
    };

    const currentMinute = new Date().getHours() * 60;
    container.current.scrollTop =
      ((container.current.scrollHeight -
        containerNav.current.offsetHeight -
        containerOffset.current.offsetHeight) *
        currentMinute) /
      1440;
    fetchData();
    fetchnom();
  }, []);

  function dateToPxHeight(date) {
    return [
      date.getDay(),
      date.getHours() * 12 +
        (date.getMinutes() / 60) * 12 +
        (date.getSeconds() / 3600) * 12 +
        2,
    ];
  }

  function switchSpinner() {
    setSpinner(!spinner);
  }

  let modifyTime = async (e) => {
    e.preventDefault();
    try {/*
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
      }*/
    } catch (err) {
      console.log(err);
    }
  };

  const { idPlanning } = useParams();
  return (
    <div className="flex h-full flex-col">
      <header className="relative z-20 flex flex-none items-center justify-between border-b border-gray-200 py-4 px-6">
        <h1 className="text-lg font-semibold text-gray-900">
          <h2 className="text-xs text-red-600 font-semibold tracking-wide uppercase">
            Planning
          </h2>
          <time dateTime="2022-01">{idPlanning}</time>
        </h1>
        <div className="flex items-center">
          <div className="hidden md:ml-4 md:flex md:items-center">
            <button
              type="button"
              className="focus:outline-none ml-6 rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              onClick={switchSpinner}
            >
              {spinner ? (
                <div role="status">
                  Chargement...
                  <svg
                    aria-hidden="true"
                    class="inline w-5 h-5 ml-3 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span class="sr-only">Loading...</span>
                </div>
              ) : (
                "Generer le planning"
              )}
            </button>
          </div>

          <button
            type="button"
            className="focus:outline-none ml-6 rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 md:hidden"
            onClick={switchSpinner}
          >
            {spinner ? (
              <div role="status">
                Chargement...
                <svg
                  aria-hidden="true"
                  class="inline w-5 h-5 ml-3 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
            ) : (
              "Generer le planning"
            )}
          </button>
        </div>
      </header>

      <div
        ref={container}
        className="flex flex-auto flex-col overflow-auto bg-white"
        style={{ height: "80vh" }}
      >
        <div
          style={{ width: "165%" }}
          className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full"
        >
          <div
            ref={containerNav}
            className="sticky top-0 z-10 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-8"
          >
            <div className="grid grid-cols-7 text-sm leading-6 text-gray-500 sm:hidden">
              <button
                type="button"
                className="flex flex-col items-center pt-2 pb-3"
              >
                L{" "}
                <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">
                  5
                </span>
              </button>
              <button
                type="button"
                className="flex flex-col items-center pt-2 pb-3"
              >
                M{" "}
                <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">
                  6
                </span>
              </button>
              <button
                type="button"
                className="flex flex-col items-center pt-2 pb-3"
              >
                M{" "}
                <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">
                  7
                </span>
              </button>
              <button
                type="button"
                className="flex flex-col items-center pt-2 pb-3"
              >
                J{" "}
                <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">
                  8
                </span>
              </button>
              <button
                type="button"
                className="flex flex-col items-center pt-2 pb-3"
              >
                V{" "}
                <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">
                  9
                </span>
              </button>
              <button
                type="button"
                className="flex flex-col items-center pt-2 pb-3"
              >
                S{" "}
                <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">
                  10
                </span>
              </button>
              <button
                type="button"
                className="flex flex-col items-center pt-2 pb-3"
              >
                D{" "}
                <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">
                  11
                </span>
              </button>
            </div>

            <div className="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 sm:grid">
              <div className="col-end-1 w-14" />
              <div className="flex items-center justify-center py-3">
                <span>
                  Lun{" "}
                  <span className="items-center justify-center font-semibold text-gray-900">
                    5
                  </span>
                </span>
              </div>
              <div className="flex items-center justify-center py-3">
                <span>
                  Mar{" "}
                  <span className="items-center justify-center font-semibold text-gray-900">
                    6
                  </span>
                </span>
              </div>
              <div className="flex items-center justify-center py-3">
                <span>
                  Mer{" "}
                  <span className="items-center justify-center font-semibold text-gray-900">
                    7
                  </span>
                </span>
              </div>
              <div className="flex items-center justify-center py-3">
                <span>
                  Jeu{" "}
                  <span className="items-center justify-center font-semibold text-gray-900">
                    8
                  </span>
                </span>
              </div>
              <div className="flex items-center justify-center py-3">
                <span>
                  Ven{" "}
                  <span className="items-center justify-center font-semibold text-gray-900">
                    9
                  </span>
                </span>
              </div>
              <div className="flex items-center justify-center py-3">
                <span>
                  Sam{" "}
                  <span className="items-center justify-center font-semibold text-gray-900">
                    10
                  </span>
                </span>
              </div>
              <div className="flex items-center justify-center py-3">
                <span>
                  Dim{" "}
                  <span className="items-center justify-center font-semibold text-gray-900">
                    11
                  </span>
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
                style={{ gridTemplateRows: "repeat(48, minmax(2.5rem, 1fr))" }}
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

              <ol
                className="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-8"
                style={{
                  gridTemplateRows: "1.75rem repeat(288, minmax(0, 1fr)) auto",
                }}
              >
                {indisponibilites.map((res) => {
                  const currentDate = new Date(res.debut);
                  const coords = dateToPxHeight(currentDate);
                  return (
                    <li
                      className={
                        "relative mt-px flex sm:col-start-" + String(coords[0])
                      }
                      style={{
                        gridRow:
                          String(coords[1]) +
                          " / span " +
                          String((res.duree_min / 60) * 12),
                      }}
                    >
                      <a
                        href="#"
                        className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-slate-50 p-2 text-xs leading-5 hover:bg-slate-100"
                        onClick={() => {
                          setOpenTime(true);
                          setDate(res.debut.split("T")[0]);
                          setTime(res.debut.split("T")[1]);
                        }}
                      >
                        <p className="order-1 font-semibold text-slate-700">
                          Indispo.
                        </p>
                        <p className="text-slate-500 green-hover:text-blue-700">
                          <time dateTime={res.debut}>
                            {currentDate.toLocaleString("fr-FR", {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            })}
                          </time>
                        </p>
                      </a>
                    </li>
                  );
                })}
                {examens.map((res) => {
                  const currentDate = new Date(res.debut);
                  const coords = dateToPxHeight(currentDate);

                  return (
                    <li
                      className={
                        "relative mt-px flex sm:col-start-" + String(coords[0])
                      }
                      style={{
                        gridRow:
                          String(coords[1]) +
                          " / span " +
                          String((res.duree_min / 60) * 12),
                      }}
                    >
                      <a
                        href="#"
                        onClick={() => {
                          setOpenTime(true);
                          setDate(res.debut.split("T")[0]);
                          setTime(res.debut.split("T")[1]);
                        }}
                        className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-red-50 p-2 text-xs leading-5 hover:bg-red-100"
                      >
                        <p className="order-1 font-semibold text-red-700">
                          Exam.
                        </p>
                        <p className="text-red-500 green-hover:text-blue-700">
                          <time dateTime={res.debut}>
                            {currentDate.toLocaleString("fr-FR", {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            })}
                          </time>
                        </p>
                      </a>
                    </li>
                  );
                })}
                {fermetures.map((res) => {
                  const currentDate = new Date(res.debut);
                  const coords = dateToPxHeight(currentDate);
                  return (
                    <li
                      className={
                        "relative mt-px flex sm:col-start-" + res.indexSemaine
                      }
                      style={{
                        gridRow:
                          String(coords[1]) +
                          " / span " +
                          String((res.duree_min / 60) * 12),
                      }}
                    >
                      <a
                        href="#"
                        className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-neutral-50 p-2 text-xs leading-5 hover:bg-neutral-100 bg-[url('https://img.freepik.com/premium-vector/diagonal-lines-texture-gray-design-seamless-striped-vector-geometric-background_547648-2469.jpg?w=2000')]"
                      >
                        <p className="order-1 font-semibold text-neutral-700">
                          Fermetrure
                        </p>
                        <p className="text-neutral-500 neutral-hover:text-blue-700">
                          <time dateTime={res.debut}>
                            {currentDate.toLocaleString("fr-FR", {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            })}
                          </time>
                        </p>
                      </a>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
      <Transition.Root show={openTime} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40"
          initialFocus={cancelButtonRef}
          onClose={setOpenTime}
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
                        <form onSubmit={modifyTime}>
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
                                <div className="col-span-6 sm:col-span-3">
                                  <label
                                    htmlFor="last-name"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Durée (min)
                                  </label>
                                  <input
                                    type="number"
                                    value={duree}
                                    onChange={(e) => setduree(e.target.value)}
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
