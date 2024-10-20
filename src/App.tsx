import '@/App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';

const LazyCardSectionview = lazy(() => import('@/pages/articles/view/list/index'));
const LazyAboutdescript = lazy(() => import('@/pages/about/component/description/index'));
const LazyDefaultlayout = lazy(() => import('@/layouts/default/defaultlayout'));
const LazyContactInformation = lazy(() => import('@/pages/contact/view/contact/index'));
const LazyCountryDetail = lazy(() => import('@/pages/CountryDetailpage/CountryDetail'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:lang" element={<LazyDefaultlayout />}>
          <Route 
            path="articles" 
            element={
              <Suspense fallback={<div>Loading Articles List...</div>}>
                <LazyCardSectionview />
              </Suspense>
            } 
          />

          <Route
            path="articles/:id"
            element={
              <Suspense fallback={<div>Loading Article Detail...</div>}>
                <LazyCountryDetail />
              </Suspense>
            } 
          />

          <Route
            path="articles/:id/country"
            element={
              <Suspense fallback={<div>Loading Country Detail...</div>}>
                <LazyCountryDetail />
              </Suspense>
            } 
          />

          <Route 
            path="about" 
            element={
              <Suspense fallback={<div>Loading About...</div>}>
                <LazyAboutdescript />
              </Suspense>
            } 
          />

          <Route 
            path="contact" 
            element={
              <Suspense fallback={<div>Loading Contact Information...</div>}>
                <LazyContactInformation />
              </Suspense>
            } 
          />
        </Route>
        
        <Route path="/" element={<Navigate to="/eng/articles" />} />
        <Route path="*" element={ <div>Not found page</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
