import Background from "./../../components/Background";
import Footer from "./../../components/Footer";
export default function Example() {
    return (
      <>
        
        <div className="relative bg-gray-50 overflow-hidden">
          
          <div className="min-h-full pt-16 pb-12 flex flex-col bg-white">
            <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex-shrink-0 flex justify-center">
                <a href="/" className="inline-flex">
                  <span className="sr-only">Workflow</span>
                  <img
                    className="h-12 w-auto"
                    src="./images/logo_titre.svg"
                    alt=""
                  />
                </a>
              </div>
              <div className="py-16">
                <div className="text-center">
                  <p className="text-sm font-semibold text-red-600 uppercase tracking-wide">Erreur 404</p>
                  <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Page introuvable.</h1>
                  <p className="mt-2 text-base text-gray-500">Désolé, nous n'avons pas pu trouver la page que vous recherchiez.</p>
                  <div className="mt-6">
                    <a href="/" className="text-base font-medium text-red-600 hover:text-red-500">
                      Retourner à l'accueil<span aria-hidden="true"> &rarr;</span>
                    </a>
                  </div>
                </div>
              </div>
            </main>
            <Footer />
          </div>
          <Background />
        </div>
      </>
    )
  }