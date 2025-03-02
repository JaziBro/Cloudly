import { Cloud, Sun } from "lucide-react"
import { Montserrat, Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'], 
  variable: '--font-inter', 
});

const montserrat = Montserrat({
  subsets: ['latin'], 
  weight: ['400', '700'], 
  variable: '--font-montserrat', 
});

export function Hero() {
  return (
    <section className="pt-24 pb-12 text-center">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <Cloud className="h-24 w-24 text-blue-500 dark:text-blue-400 animate-bounce" />
            <div className="absolute -right-2 -top-2">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 bg-yellow-400 rounded-full animate-pulse"></div>
                <Sun className="relative h-8 w-8 text-yellow-500" />
              </div>
            </div>
          </div>
          <h1 className={`${montserrat.className} text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-gray-200`}>
            Get Real-Time Weather Updates
          </h1>
          <p className={`${inter.className} text-xl text-gray-600 dark:text-gray-400 max-w-2xl`}>
            Search any city and know the weather instantly. Stay informed with accurate forecasts and detailed weather
            information.
          </p>
        </div>
      </div>
    </section>
  )
}

