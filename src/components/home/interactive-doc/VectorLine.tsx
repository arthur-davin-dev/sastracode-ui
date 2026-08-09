export default function VectorLine() {
    return (
        <div>
            {/* Show image on small screens */}
            <img
                src="/home/Vector.svg"
                alt="AI Coach robot"
                className="hidden sm:block w-30 h-12  "
            />

            {/* Show inline SVG on tablet and larger */}
            <svg
                width="211"
                height="52"
                viewBox="0 0 52 211"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="block sm:hidden w-28 h-28 object-contain text-lime-400"
            >
                <path
                    // d="M0 25 H210"
                    d="M25 0 V210"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                />
            </svg>
        </div>
    )
}
