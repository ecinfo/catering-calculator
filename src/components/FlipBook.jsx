import { useRef, useState, useEffect, useMemo } from "react";
import HTMLFlipBook from "react-pageflip";
import "./flipbook.css";

export default function FlipBook() {
  const bookRef = useRef(null);

  const DESKTOP_SPREADS = 46; // 46 images (1 image = 2 pages)
  const MOBILE_PAGES = 92; // single pages

  const [page, setPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [size, setSize] = useState({ width: 900, height: 600 });

  useEffect(() => {
    const updateLayout = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (mobile) {
        setSize({
          width: Math.min(window.innerWidth - 24, 420),
          height: Math.min(window.innerHeight * 0.75, 620),
        });
      } else {
        setSize({ width: 900, height: 600 });
      }
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  /**
   * 🔑 CRITICAL FIX:
   * Always return a valid array of React elements
   */
  const pages = useMemo(() => {
    const count = isMobile ? MOBILE_PAGES : DESKTOP_SPREADS;
    const folder = isMobile ? "mobile" : "desktop";

    return Array.from({ length: count }, (_, i) => (
      <div className="page" key={`${folder}-${i}`}>
        <img
          src={`${import.meta.env.BASE_URL}flipbook/${folder}/${i + 1}.png`}
          alt={`Page ${i + 1}`}
          draggable={false}
        />
      </div>
    ));
  }, [isMobile]);

  const totalPages = isMobile ? MOBILE_PAGES : DESKTOP_SPREADS;

  return (
    <div className="flipbook-wrapper">
      <HTMLFlipBook
        ref={bookRef}
        width={size.width}
        height={size.height}
        size="fixed"
        showCover
        usePortrait={isMobile}
        drawShadow={!isMobile}
        maxShadowOpacity={0.3}
        mobileScrollSupport
        onFlip={(e) => setPage(e.data)}
      >
        {pages}
      </HTMLFlipBook>

      <div className="controls">
        <button
          onClick={() => bookRef.current?.pageFlip().flipPrev()}
          disabled={page === 0}
        >
          Prev
        </button>

        <span>
          {page + 1} / {totalPages}
        </span>

        <button
          onClick={() => bookRef.current?.pageFlip().flipNext()}
          disabled={page === totalPages - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}
