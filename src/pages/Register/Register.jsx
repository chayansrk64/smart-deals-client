import React from 'react';
import SocialLogin from '../../components/SocialLogin/SocialLogin';
import { Link } from 'react-router';

const Register = () => {
    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col ">
                <div className="text-center lg:text-left">
                 
                </div>
                <h1 className="text-3xl font-bold">Register now!</h1>
                <div className="card bg-base-100 min-w-[350px]  shrink-0 shadow-2xl">
                <div className="card-body">
                    <form>
                        <fieldset className="fieldset">
                        <label className="label">Email</label>
                        <input type="email" className="input" placeholder="Email" />
                        <label className="label">Password</label>
                        <input type="password" className="input" placeholder="Password" />
                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button className="btn btn-neutral mt-4">Register</button>
                        </fieldset>
                    </form>
                    <div className=''>
                        <SocialLogin></SocialLogin>
                    </div>
                <button>Already have an Account? <Link to="/login" className='text-red-500 font-semibold underline'>Login</Link> </button>
                </div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default Register;