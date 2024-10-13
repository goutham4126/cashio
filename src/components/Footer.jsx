import { FaHeart } from "react-icons/fa";

function Footer() {
  return (
        <footer class="text-gray-600 body-font">
            <div class="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
                <a class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
                <img src="https://cdn-icons-png.flaticon.com/512/2769/2769441.png" className="h-8 w-8"/>
                <span class="ml-3 text-xl">Cashio</span>
                </a>
                <p class="text-sm text-chart-2 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-chart-2 sm:py-2 sm:mt-0 mt-4">© 2024 Cashio —
                <a href="https://twitter.com/knyttneve" class="text-chart-2 ml-1" rel="noopener noreferrer" target="_blank">@goutham4126@gmail.com</a>
                </p>
                <span class="flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
                    with <FaHeart className="h-4 w-4 text-red-700 mx-2 mt-1"/>by Goutham 
                </span>
            </div>
        </footer>
  )
}

export default Footer