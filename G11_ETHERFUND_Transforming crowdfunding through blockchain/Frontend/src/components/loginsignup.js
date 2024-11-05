import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope, faFacebookF, faTwitter, faGoogle, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const AuthForm = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  return (
    <div className={`container min-h-screen flex items-center justify-center bg-white`}>
      <div className={`forms-container relative w-full`}>
        <div className={`signin-signup absolute top-1/2 transform -translate-y-1/2 ${isSignUpMode ? 'left-1/2' : 'left-3/4'} w-1/2 transition-transform duration-700`}>
          <form className="sign-in-form flex flex-col items-center p-5">
            <h2 className="title text-2xl text-[#800020] mb-4">SIGN IN</h2>
            <div className="input-field mb-4 flex items-center bg-gray-800 rounded-full px-4 w-full">
              <FontAwesomeIcon icon={faUser} className="text-gray-400" />
              <input type="text" placeholder="Username" className="bg-transparent outline-none text-white w-full p-2" />
            </div>
            <div className="input-field mb-4 flex items-center bg-gray-800 rounded-full px-4 w-full">
              <FontAwesomeIcon icon={faLock} className="text-gray-400" />
              <input type="password" placeholder="Password" className="bg-transparent outline-none text-white w-full p-2" />
            </div>
            <input type="submit" value="Login" className="btn solid w-32 bg-[#800020] rounded-full text-white font-semibold py-2 mt-4" />
            <p className="social-text mt-4">Or Sign in with social platforms</p>
            <div className="social-media flex justify-center mt-2">
              <a href="#" className="social-icon bg-gray-400 text-white rounded-full h-12 w-12 flex items-center justify-center mx-2">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" className="social-icon bg-gray-400 text-white rounded-full h-12 w-12 flex items-center justify-center mx-2">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" className="social-icon bg-gray-400 text-white rounded-full h-12 w-12 flex items-center justify-center mx-2">
                <FontAwesomeIcon icon={faGoogle} />
              </a>
              <a href="#" className="social-icon bg-gray-400 text-white rounded-full h-12 w-12 flex items-center justify-center mx-2">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </div>
          </form>
          <form className={`sign-up-form flex flex-col items-center p-5 opacity-0 ${isSignUpMode ? 'opacity-100' : ''}`}>
            <h2 className="title text-2xl text-[#800020] mb-4">SIGN UP</h2>
            <div className="input-field mb-4 flex items-center bg-gray-800 rounded-full px-4 w-full">
              <FontAwesomeIcon icon={faUser} className="text-gray-400" />
              <input type="text" placeholder="Username" className="bg-transparent outline-none text-white w-full p-2" />
            </div>
            <div className="input-field mb-4 flex items-center bg-gray-800 rounded-full px-4 w-full">
              <FontAwesomeIcon icon={faEnvelope} className="text-gray-400" />
              <input type="email" placeholder="Email" className="bg-transparent outline-none text-white w-full p-2" />
            </div>
            <div className="input-field mb-4 flex items-center bg-gray-800 rounded-full px-4 w-full">
              <FontAwesomeIcon icon={faLock} className="text-gray-400" />
              <input type="password" placeholder="Password" className="bg-transparent outline-none text-white w-full p-2" />
            </div>
            <input type="submit" className="btn w-32 bg-[#800020] rounded-full text-white font-semibold py-2 mt-4" value="Sign up" />
            <p className="social-text mt-4">Or Sign up with social platforms</p>
            <div className="social-media flex justify-center mt-2">
              <a href="#" className="social-icon bg-gray-400 text-white rounded-full h-12 w-12 flex items-center justify-center mx-2">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" className="social-icon bg-gray-400 text-white rounded-full h-12 w-12 flex items-center justify-center mx-2">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" className="social-icon bg-gray-400 text-white rounded-full h-12 w-12 flex items-center justify-center mx-2">
                <FontAwesomeIcon icon={faGoogle} />
              </a>
              <a href="#" className="social-icon bg-gray-400 text-white rounded-full h-12 w-12 flex items-center justify-center mx-2">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </div>
          </form>
        </div>
      </div>

      <div className={`panels-container absolute top-0 left-0 h-full w-full grid grid-cols-2`}>
        <div className={`panel left-panel flex flex-col items-end justify-center p-10`}>
          <div className="content text-center">
            <h2 className="text-3xl text-[#800020]">Want to donate for a good cause?</h2>
            <h1 className="text-4xl font-bold text-[#800020]">Join EtherFund</h1>
            <p className="mt-2 text-[#800020]">Stay Informed. Stay Inspired.</p>
            <button className="btn transparent mt-4" onClick={() => setIsSignUpMode(true)}>Sign up</button>
          </div>
          <img src="/static/img/log(1).svg" className="image" alt="" />
        </div>
        <div className={`panel right-panel flex flex-col items-start justify-center p-10`}>
          <div className="content text-center">
            <h1 className="text-3xl font-bold text-[#800020]">One of us?</h1>
            <div className="icon-text-container flex items-center mb-2">
              <FontAwesomeIcon icon={['fas', 'user-plus']} className="text-4xl text-[#800020] mr-2" />
              <h1 className="text-xl">Follow Topics</h1>
            </div>
            <div className="icon-text-container flex items-center mb-2">
              <FontAwesomeIcon icon={['fab', 'wpexplorer']} className="text-xl text-[#800020] mr-2" />
              <h1 className="text-xl">Explore</h1>
            </div>
            <div className="icon-text-container flex items-center mb-2">
              <FontAwesomeIcon icon={['fas', 'arrow-up-from-bracket']} className="text-xl text-[#800020] mr-2" />
              <h1 className="text-xl">Share Ideas</h1>
            </div>
            <button className="btn transparent mt-4" onClick={() => setIsSignUpMode(false)}>Sign in</button>
          </div>
          <img src="/static/img/reg(1).svg" className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
