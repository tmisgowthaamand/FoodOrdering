import React, { useState, useEffect, useRef } from 'react';

const LazyLoadSection = ({ children, threshold = 0.1 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {
                rootMargin: '100px', // Load slightly before it comes into view
                threshold: threshold,
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [threshold]);

    return (
        <div ref={ref} className="min-h-[300px] content-visibility-auto">
            {isVisible ? children : <div className="h-[300px] w-full bg-gray-50 animate-pulse rounded-xl" />}
        </div>
    );
};

export default LazyLoadSection;
