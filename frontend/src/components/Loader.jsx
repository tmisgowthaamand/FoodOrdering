import React from 'react';

const Loader = () => {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
            <div className="loader-container">
                <div className="cube">
                    <div className="face front"></div>
                    <div className="face back"></div>
                    <div className="face right"></div>
                    <div className="face left"></div>
                    <div className="face top"></div>
                    <div className="face bottom"></div>
                </div>
                <div className="loading-text mt-12 text-gray-400 font-medium tracking-widest text-sm uppercase">Loading</div>
            </div>
        </div>
    );
};

export default Loader;
