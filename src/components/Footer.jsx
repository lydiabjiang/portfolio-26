import { site } from '../content'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <span>{site.role}</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  )
}
