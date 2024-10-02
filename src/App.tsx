import '@/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

const LazyCardSectionview = lazy(() => import('@/pages/home/view/list/index'));
const LazyAboutdescript = lazy(() => import('@/pages/about/component/description/index'));
const LazyDefaultlayout = lazy(() => import('@/layouts/default/defaultlayout'));
const LazyContactInformation = lazy(() => import('@/pages/contact/component/information/index'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LazyDefaultlayout />}>
          {/* Wrapping each route in its own Suspense */}
          <Route 
            path="/" 
            element={
              <Suspense fallback={<div>Loading Home...</div>}>
                <LazyCardSectionview />
              </Suspense>
            } 
          />
          <Route 
            path="/about" 
            element={
              <Suspense fallback={<div>Loading About...</div>}>
                <LazyAboutdescript />
              </Suspense>
            } 
          />
          <Route 
            path="/contact" 
            element={
              <Suspense fallback={<div>Loading Contact...</div>}>
                <LazyContactInformation />
              </Suspense>
            } 
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
