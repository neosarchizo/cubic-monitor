import {FC} from 'react'

import Versions from './components/versions-comp'
import icons from './assets/icons.svg'

const Main: FC = () => (
  <div className="container">
    <Versions />
    <svg className="hero-logo" viewBox="0 0 900 300">
      <use xlinkHref={`${icons}#electron`} />
    </svg>
    <h2 className="hero-text">Typescript</h2>
    <p className="hero-tagline">
      Please try pressing
      <code>F12</code>
      to open the devTool
    </p>
    <div className="links">
      <div className="link-item">
        <a target="_blank" href="https://evite.netlify.app" rel="noopener noreferrer">
          Documentation
        </a>
      </div>
      <div className="link-item link-dot">•</div>
      <div className="link-item">
        <a
          target="_blank"
          href="https://github.com/alex8088/electron-vite"
          rel="noopener noreferrer">
          Getting Help
        </a>
      </div>
      <div className="link-item link-dot">•</div>
      <div className="link-item">
        <a
          target="_blank"
          href="https://github.com/alex8088/quick-start/tree/master/packages/create-electron"
          rel="noopener noreferrer">
          create-electron
        </a>
      </div>
    </div>

    <div className="features">
      <div className="feature-item">
        <article>
          <h2 className="title">Configuring</h2>
          <p className="detail">
            Config with
            <span>electron.vite.config.ts</span>
            and refer to the
            <a target="_blank" href="https://evite.netlify.app/config/" rel="noopener noreferrer">
              config guide
            </a>
            .
          </p>
        </article>
      </div>
      <div className="feature-item">
        <article>
          <h2 className="title">HMR</h2>
          <p className="detail">
            Edit
            <span>src/renderer</span>
            files to test HMR. See
            <a
              target="_blank"
              href="https://evite.netlify.app/guide/hmr-in-renderer.html"
              rel="noopener noreferrer">
              docs
            </a>
            .
          </p>
        </article>
      </div>
      <div className="feature-item">
        <article>
          <h2 className="title">Hot Reloading</h2>
          <p className="detail">
            Run
            <span>electron-vite dev --watch</span>
            to enable. See
            <a
              target="_blank"
              href="https://evite.netlify.app/guide/hot-reloading.html"
              rel="noopener noreferrer">
              docs
            </a>
            .
          </p>
        </article>
      </div>
      <div className="feature-item">
        <article>
          <h2 className="title">Debugging</h2>
        </article>
      </div>
      <div className="feature-item">
        <article>
          <h2 className="title">Source Code Protection</h2>
        </article>
      </div>
      <div className="feature-item">
        <article>
          <h2 className="title">Packaging</h2>
          <p className="detail">
            Use
            <a target="_blank" href="https://www.electron.build" rel="noopener noreferrer">
              electron-builder
            </a>
            and pre-configured to pack your app.
          </p>
        </article>
      </div>
    </div>
  </div>
)

export default Main
