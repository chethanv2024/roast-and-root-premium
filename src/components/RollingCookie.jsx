
import "./RollingCookie.css";

export default function RollingCookie() {
  return (
    <div className="rolling-cookie-track" aria-hidden="true">
      <div className="rolling-cookie">
        <svg
          viewBox="0 0 100 100"
          className="cookie-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="cookieDough" cx="35%" cy="25%">
              <stop offset="0%" stopColor="#f5d59b" />
              <stop offset="65%" stopColor="#c9914d" />
              <stop offset="100%" stopColor="#895126" />
            </radialGradient>
          </defs>

          <circle
            cx="50"
            cy="50"
            r="43"
            fill="url(#cookieDough)"
            stroke="#70401f"
            strokeWidth="2"
          />

          <g fill="#4b2819">
            <ellipse cx="30" cy="28" rx="6" ry="4" />
            <ellipse cx="58" cy="22" rx="5" ry="4" />
            <ellipse cx="70" cy="43" rx="6" ry="4" />
            <ellipse cx="42" cy="48" rx="6" ry="5" />
            <ellipse cx="24" cy="61" rx="5" ry="4" />
            <ellipse cx="57" cy="68" rx="6" ry="4" />
            <ellipse cx="75" cy="70" rx="4" ry="5" />
            <ellipse cx="43" cy="80" rx="4" ry="3" />
          </g>

          <circle
            cx="36"
            cy="17"
            r="3"
            fill="#fff0ca"
            opacity=".65"
          />
        </svg>
      </div>
    </div>
  );
}
