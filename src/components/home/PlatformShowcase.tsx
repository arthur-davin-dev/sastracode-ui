import React from "react";

export default function PlatformShowcase() {
  return (
    <>
      <style>{`
        .stage-container {
          container-type: inline-size;
          aspect-ratio: 1280/720;
          border-radius: 1.2cqw;
        }
        .hero-header { padding: 0 4cqw; }
        .feature-card {
          gap: 1.15cqw;
          padding: 1.55cqw 1.7cqw;
          border-radius: 1.15cqw;
          box-shadow: 0 0.6cqw 2cqw rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.03);
        }
        .card-icon-circle {
          width: 6.5cqw;
          height: 6.5cqw;
          background: radial-gradient(circle at 32% 28%, #4c86ff, #2a56d6 65%, #1c3fa8);
          box-shadow: 0 0 0 1px rgba(255,255,255,0.06) inset, 0 0.5cqw 1.4cqw rgba(45,100,240,0.45);
        }
        .card-icon-circle svg { width: 3.2cqw; height: 3.2cqw; }

        .connector-line {
          fill: none;
          stroke: rgba(110,163,255,0.55);
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .connector-glow {
          fill: none;
          stroke: rgba(90,140,255,0.9);
          stroke-width: 5;
          opacity: 0.18;
          filter: blur(2px);
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .dome-glow-svg {
          width: 60cqw;
          height: 22.5cqw;
        }
        .center-emblem {
          width: 10.2cqw;
          height: 10.2cqw;
          border-radius: 22%;
          background: linear-gradient(160deg, #4c82fb 0%, #2f66e6 55%, #1e46b8 100%);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.08) inset,
            0 0.4cqw 0.6cqw rgba(255,255,255,0.12) inset,
            0 1.2cqw 3cqw rgba(45,100,240,0.55),
            0 0 8cqw rgba(63,125,251,0.35);
        }
        .center-emblem svg { width: 4.6cqw; height: 4.6cqw; }
        @media (max-width: 640px) {
          .stage-container { aspect-ratio: auto; min-height: 1180px; }
        }
      `}</style>

      <div className="bg-transparent scale-100 lg:scale-[1.15] lg:origin-center mt-8 lg:-mt-24">
        <div className="stage-container relative w-full mx-auto overflow-hidden">
          <header className="hero-header absolute top-[3.6%] left-0 right-0 text-center">
          </header>

          {/* Connector lines — each card links to center </> icon */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-[1]" viewBox="0 0 1280 720" preserveAspectRatio="none">
            <g>
              {/* Top-left card → straight down to icon */}
              <path className="connector-glow" d="M485,247 L595,247 Q610,247 610,262 L610,430" />
              {/* Top-right card → straight down to icon */}
              <path className="connector-glow" d="M792,247 L685,247 Q670,247 670,262 L670,430" />
              {/* Bottom-left card → straight down */}
              <path className="connector-glow" d="M458,417 L558,417 Q570,417 570,432 L570,530" />
              {/* Bottom-right card → straight down */}
              <path className="connector-glow" d="M820,417 L722,417 Q710,417 710,432 L710,530" />
            </g>
            <g>
              {/* Top-left card → straight down to icon */}
              <path className="connector-line" d="M485,247 L595,247 Q610,247 610,262 L610,430" />
              {/* Top-right card → straight down to icon */}
              <path className="connector-line" d="M792,247 L685,247 Q670,247 670,262 L670,430" />
              {/* Bottom-left card → straight down */}
              <path className="connector-line" d="M458,417 L558,417 Q570,417 570,432 L570,530" />
              {/* Bottom-right card → straight down */}
              <path className="connector-line" d="M820,417 L722,417 Q710,417 710,432 L710,530" />
            </g>
          </svg>

          {/* Top-left card */}
          <div className="feature-card absolute left-[5.63%] top-[24.3%] w-[32.3%] h-[20.1%] flex items-center justify-center bg-white/70 border border-slate-200 dark:bg-[rgba(13,19,38,0.55)] dark:border-[rgba(94,148,255,0.20)] backdrop-blur-[6px] z-[2] transition-all duration-250 ease-in-out hover:bg-slate-50 hover:border-slate-300 dark:hover:border-[rgba(110,160,255,0.45)] dark:hover:bg-[rgba(16,23,46,0.75)] hover:-translate-y-0.5">
            <div className="card-icon-circle shrink-0 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-[#eaf1ff]">
                <circle cx="12" cy="12" r="10" />
                <polygon points="10 8 16 12 10 16 10 8" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm lg:text-base font-normal text-slate-600 dark:text-slate-300 text-balance line-clamp-2">Learn Through Video Lessons</h3>
            </div>
          </div>

          {/* Top-right card */}
          <div className="feature-card absolute left-[61.88%] top-[24.3%] w-[32.3%] h-[20.1%] flex items-center justify-center bg-white/70 border border-slate-200 dark:bg-[rgba(13,19,38,0.55)] dark:border-[rgba(94,148,255,0.20)] backdrop-blur-[6px] z-[2] transition-all duration-250 ease-in-out hover:bg-slate-50 hover:border-slate-300 dark:hover:border-[rgba(110,160,255,0.45)] dark:hover:bg-[rgba(16,23,46,0.75)] hover:-translate-y-0.5">
            <div className="card-icon-circle shrink-0 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-[#eaf1ff]">
                <circle cx="12" cy="8" r="6" />
                <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm lg:text-base font-normal text-slate-600 dark:text-slate-300 text-balance line-clamp-2">Earn Skill Badges</h3>
            </div>
          </div>

          {/* Bottom-left card */}
          <div className="feature-card absolute left-[4.45%] top-[47.9%] w-[31.3%] h-[20.1%] flex items-center justify-center bg-white/70 border border-slate-200 dark:bg-[rgba(13,19,38,0.55)] dark:border-[rgba(94,148,255,0.20)] backdrop-blur-[6px] z-[2] transition-all duration-250 ease-in-out hover:bg-slate-50 hover:border-slate-300 dark:hover:border-[rgba(110,160,255,0.45)] dark:hover:bg-[rgba(16,23,46,0.75)] hover:-translate-y-0.5">
            <div className="card-icon-circle shrink-0 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-[#eaf1ff]">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm lg:text-base font-normal text-slate-600 dark:text-slate-300 text-balance line-clamp-2">Chat &amp; Connection</h3>
            </div>
          </div>

          {/* Bottom-right card */}
          <div className="feature-card absolute left-[64.06%] top-[47.9%] w-[31.3%] h-[20.1%] flex items-center justify-center bg-white/70 border border-slate-200 dark:bg-[rgba(13,19,38,0.55)] dark:border-[rgba(94,148,255,0.20)] backdrop-blur-[6px] z-[2] transition-all duration-250 ease-in-out hover:bg-slate-50 hover:border-slate-300 dark:hover:border-[rgba(110,160,255,0.45)] dark:hover:bg-[rgba(16,23,46,0.75)] hover:-translate-y-0.5">
            <div className="card-icon-circle shrink-0 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-[#eaf1ff]">
                <path d="M8 21h8" />
                <path d="M12 17v4" />
                <path d="M7 4h10v5a5 5 0 0 1-10 0z" />
                <path d="M17 5h3a2 2 0 0 1 2 2v1a4 4 0 0 1-4 4" />
                <path d="M7 5H4a2 2 0 0 0-2 2v1a4 4 0 0 0 4 4" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm lg:text-base font-normal text-slate-600 dark:text-slate-300 text-balance line-clamp-2">Receive Verified Certificate</h3>
            </div>
          </div>

          {/* Center emblem glow */}
          <svg className="dome-glow-svg absolute left-1/2 top-[76.5%] -translate-x-1/2 -translate-y-1/2 z-[1] pointer-events-none overflow-visible" viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="b18" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="18" />
              </filter>
              <filter id="b9" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="9" />
              </filter>
              <filter id="b6" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" />
              </filter>
              <filter id="b3" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" />
              </filter>
            </defs>

            {/* ambient bloom */}
            <ellipse cx="400" cy="150" rx="390" ry="98" fill="#1e46b0" opacity="0.28" filter="url(#b18)" />

            {/* band 4 (outermost ring) */}
            <ellipse cx="400" cy="150" rx="335" ry="84" fill="#193c96" opacity="0.55" filter="url(#b9)" />
            <ellipse cx="400" cy="150" rx="335" ry="84" fill="none" stroke="#4d7cf0" strokeOpacity={0.3} strokeWidth={2.5} filter="url(#b3)" />

            {/* band 3 */}
            <ellipse cx="400" cy="147" rx="258" ry="64" fill="#2450c6" opacity="0.62" filter="url(#b9)" />
            <ellipse cx="400" cy="147" rx="258" ry="64" fill="none" stroke="#6b98ff" strokeOpacity={0.42} strokeWidth={2.5} filter="url(#b3)" />

            {/* band 2 */}
            <ellipse cx="400" cy="144" rx="182" ry="45" fill="#3468e0" opacity="0.72" filter="url(#b6)" />
            <ellipse cx="400" cy="144" rx="182" ry="45" fill="none" stroke="#9db9ff" strokeOpacity={0.55} strokeWidth={2.5} filter="url(#b3)" />

            {/* band 1 (brightest ring) */}
            <ellipse cx="400" cy="140" rx="112" ry="28" fill="#5f8bf8" opacity="0.85" filter="url(#b6)" />
            <ellipse cx="400" cy="140" rx="112" ry="28" fill="none" stroke="#cfe0ff" strokeOpacity={0.6} strokeWidth={2} filter="url(#b3)" />

            {/* hot core */}
            <ellipse cx="400" cy="132" rx="58" ry="15" fill="#e4edff" opacity="0.9" filter="url(#b6)" />
          </svg>

          {/* Center icon */}
          <div className="center-emblem absolute left-1/2 top-[59.7%] -translate-x-1/2 flex items-center justify-center z-[3]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="text-[#f4f8ff]">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </div>

        </div>
      </div>
    </>
  );
}