import React, {Suspense, lazy} from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Routes, Route} from 'react-router-dom'

import './main.css'

const Models = lazy(() => import ('./models'))

ReactDOM.render(
    <React.StrictMode>
      <HashRouter>
      <Routes>
      <Route path="/" exact={true} element={<><iframe src="https://3d-enabled-interactive-whiteboard.vercel.app/#/models" className="featuresModels" frameBorder="0" title="3D Models" allowFullScreen></iframe><Suspense fallback={<div className="modelLoadingSpinner"></div>}></Suspense></>} />
      <Route path="models" exact={true} element={<><Suspense fallback={<div className="modelLoadingSpinner"></div>}><Models /></Suspense></>} />
      <Route path="*" exact={true} element={<><h1 style={{color: "#000000", margin: "auto",textAlign: "center"}}>404<br />Not Found</h1></>} />
      </Routes>
      </HashRouter>
    </React.StrictMode>,
    document.getElementById('root')
  )
  