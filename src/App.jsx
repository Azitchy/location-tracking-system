import { useEffect, useRef, useState } from 'react'

const IMAGES = [
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&q=80&auto=format&fit=crop',
]

function App() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const touchStartX = useRef(null)

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setIndex(i => (i + 1) % IMAGES.length), 4000)
    return () => clearInterval(t)
  }, [paused])

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  function prev() {
    setIndex(i => (i - 1 + IMAGES.length) % IMAGES.length)
  }

  function next() {
    setIndex(i => (i + 1) % IMAGES.length)
  }

  function onTouchStart(e) {
    touchStartX.current = e.touches[0].clientX
  }

  function onTouchMove(e) {
    if (touchStartX.current == null) return
    const delta = e.touches[0].clientX - touchStartX.current
    // simple threshold while touching; don't change slide until touchend
  }

  function onTouchEnd(e) {
    if (touchStartX.current == null) return
    const endX = e.changedTouches[0].clientX
    const delta = endX - touchStartX.current
    if (Math.abs(delta) > 50) {
      if (delta > 0) prev()
      else next()
    }
    touchStartX.current = null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-xl font-semibold">Tracker</div>
            </div>
            <nav className="hidden md:flex space-x-6 text-gray-700">
              <a href="#" className="hover:text-indigo-600">Home</a>
              <a href="#" className="hover:text-indigo-600">Features</a>
              <a href="#" className="hover:text-indigo-600">Pricing</a>
              <a href="#" className="hover:text-indigo-600">Contact</a>
            </nav>
            <div className="md:hidden">{/* mobile menu placeholder */}</div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div
            className="relative h-64 sm:h-96"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {IMAGES.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`slide-${i}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                  i === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              />
            ))}

            <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h2 className="text-2xl sm:text-4xl font-bold">Location Tracking System</h2>
                <p className="mt-2 max-w-xl mx-auto">Real-time tracking and location insights for your fleet or assets.</p>
              </div>
            </div>

            {/* prev / next controls */}
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2"
              aria-label="Previous slide"
            >
              ‹
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2"
              aria-label="Next slide"
            >
              ›
            </button>

            <div className="absolute left-4 bottom-4 flex space-x-2">
              {IMAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`w-3 h-3 rounded-full ${i === index ? 'bg-white' : 'bg-white/60'}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto p-6">
          <h3 className="text-2xl font-semibold mb-4">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 border rounded">Realtime location</div>
            <div className="p-4 border rounded">History & reports</div>
            <div className="p-4 border rounded">Alerts & geofencing</div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center">
          <div>© {new Date().getFullYear()} Tracker — All rights reserved</div>
          <div className="space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
