import { hydrate, LocationProvider, prerender as ssr, Route, Router } from 'preact-iso'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Home } from './pages/Home'
import { NotFound } from './pages/_404'
import './style.css'

export function App() { return <LocationProvider><Header /><main id="main-content"><Router><Route path="/" component={Home} /><Route default component={NotFound} /></Router></main><Footer /></LocationProvider> }
if (typeof window !== 'undefined') hydrate(<App />, document.getElementById('app')!)
export async function prerender(data: Record<string, unknown>) { return await ssr(<App {...data} />) }
