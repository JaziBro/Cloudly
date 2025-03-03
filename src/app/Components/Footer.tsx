export function Footer() {
    return (
      <footer className="w-full py-6 px-4 mt-auto">
        <div className="container max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600 dark:text-gray-400">
          <p>Powered by OpenWeatherMap API</p>
          <p className="text-center italic">"Weather you like it or not, I'm here to help!"</p>
          <p>© {new Date().getFullYear()} Cloudly</p>
        </div>
      </footer>
    )
  }
  
  