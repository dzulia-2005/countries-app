import '@/App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import  { Suspense, lazy } from 'react';

const LazyCardSectionview = lazy(() => import('@/pages/home/view/list/index'));
const LazyAboutdescript = lazy(() => import('@/pages/about/component/description/index'));
const LazyDefaultlayout = lazy(() => import('@/layouts/default/defaultlayout'));
const LazyContactInformation = lazy(() => import('@/pages/contact/component/information/index'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<LazyDefaultlayout />}>
            <Route path="/" element={<LazyCardSectionview />} />
            <Route path="/about" element={<LazyAboutdescript />} />
            <Route path="/contact" element={<LazyContactInformation />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
