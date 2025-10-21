import React, { useContext } from 'react';
import './Main.css';
import { assets } from '../../assets/assets/assets.js';
import { Context } from '../../context/context.jsx';

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResults,
    loading,
    resultData,
    setInput,
    input,
    startListening,
    handleImageUpload,
  } = useContext(Context);

  return (
    <div className='main'>
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>

      <div className="main-contener">
        {!showResults ? (
          <>
            <div className="greet">
              <p><span>Hello, Dev</span></p>
              <p>How can I help you today?</p>
            </div>

            <div className="cards">
              <div className="card">
                <p>Suggest best DSA course</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>Concept of web dev</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>How to learn development</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>Current status of stock market</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        {/* Bottom input */}
        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Ask me anything..."
              onKeyDown={(e) => {
                
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  onSent(input);
                }
              }}
            />

            <div>
              {/* Gallery / image upload */}
              <label htmlFor="imageUpload">
                <img
                  src={assets.gallery_icon}
                  alt="gallery"
                  style={{ cursor: "pointer" }}
                />
              </label>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />

              {/* Mic */}
              <img
                src={assets.mic_icon}
                alt="mic"
                onClick={startListening}
                style={{ cursor: "pointer" }}
              />

              {/* Send */}
              {input && (
                <img
                  onClick={() => onSent(input)}
                  src={assets.send_icon}
                  alt="send"
                  style={{ cursor: "pointer" }}
                />
              )}
            </div>
          </div>

          <p className="bottom-info">Powered by Gemini AI Language Model</p>
        </div>
      </div>
    </div>
  );
};

export default Main;
