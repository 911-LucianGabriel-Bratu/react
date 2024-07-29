import { Link } from "react-router-dom";

export default function Header() {
  const date = new Date();
  return (
    <>
      <div className="header">
        Welcome to 2024 React Internship
        <span style={{ marginLeft: "5px" }}>{date.toDateString()}</span>
        <nav className="navigation">
          <ul className="display-flex">
            <li>
              <Link to="/">Episodes</Link>
            </li>
            <li>
              <Link to="/watchlist">Watchlist</Link>
            </li>
            <li>
              <Link to="/characters">Characters</Link>
            </li>
          </ul>
        </nav>
      </div>
      <br></br>
      <br></br>
    </>
  );
}
