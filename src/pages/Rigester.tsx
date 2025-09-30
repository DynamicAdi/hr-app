import React, { useState } from "react";
import Wrapper from "../components/Wrapper";
import Input from "../elements/Input";
import { useAuth } from "../context/AuthContext";
import { api } from "../utils/api";
import UserProfile from "../components/UserProfile";

function Login({ login, loading }: { login: any; loading: boolean }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleClick = async () => {
    if (!email && !pass) {
      alert("Provide all credentials");
      return;
    }
    const log = await login({ email, password: pass });
    console.log(log);

    if (!log.success) {
      alert(log.message);
    }
    if (log.success) {
      window.location.reload();
    }
  };
  return (
    <div className="w-full mt-8">
      <p className="ml-2 font-light py-1.5 text-sm">Email Address</p>
      <Input
        placeholder="Enter Email"
        setValue={setEmail}
        title="Email"
        value={email}
      />

      <p className="ml-2 font-light py-1.5 text-sm mt-3">Password</p>
      <Input
        placeholder="Enter Your Password"
        type="password"
        setValue={setPass}
        title="Email"
        value={pass}
      />

      {/* <p className='w-full text-right  font-light text-sm text-primary'>Forget Password?</p> */}

      <button
        className="w-full py-2.5 text-xl bg-primary my-3 mt-8 text-white rounded-lg"
        disabled={loading}
        onClick={handleClick}
      >
        {loading ? "..." : "Login"}
      </button>
    </div>
  );
}


function RigesterForm() {
  const [name, fullName] = useState("");
  const [Email, fullEmail] = useState("");
  const [Phone, fullPhone] = useState("");
  const [Password, fullPassword] = useState("");
  const [ConfirmPass, fullConfirmPass] = useState("");
  const [Otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRigester = async () => {
    if (!name || !Email || !Phone || !Password || !ConfirmPass) {
      alert("All fields are required");
      return;
    }
    if (Password !== ConfirmPass) {
      alert("Passwords do not match");
      return;
    }
    try {
      setLoading(true);
      const res = await api.post("/auth/signup", {
        name,
        email: Email,
        phone: Phone,
        password: Password,
      });
      if (res.status === 200) {
        alert("OTP sent to your email");
        setOtpSent(true);
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!Otp) {
      alert("Enter OTP");
      return;
    }
    try {
      setLoading(true);
      const res = await api.post("/auth/verify-otp", {
        email: Email,
        otp: Otp,
      });
      if (res.status === 201) {
        alert("Account Created Successfully!");
        // window.location.reload();
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mt-8">
      {!otpSent ? (
        <>
          <p className="ml-2 font-light py-0.5 text-sm">Full Name</p>
          <Input
            placeholder="Full Name"
            setValue={fullName}
            title="FullName"
            value={name}
          />

          <p className="ml-2 font-light py-0.5 text-sm mt-3">Email</p>
          <Input
            placeholder="Enter Your Email"
            type="email"
            setValue={fullEmail}
            title="Email"
            value={Email}
          />

          <p className="ml-2 font-light py-0.5 text-sm mt-3">Phone</p>
          <Input
            placeholder="Enter Your Phone No."
            type="number"
            setValue={fullPhone}
            title="Phone"
            value={Phone}
          />

          <p className="ml-2 font-light py-0.5 text-sm mt-3">Password</p>
          <Input
            placeholder="Enter Your Password"
            type="password"
            setValue={fullPassword}
            title="Password"
            value={Password}
          />

          <p className="ml-2 font-light py-0.5 text-sm mt-3">Confirm Password</p>
          <Input
            placeholder="Re-Enter Password"
            type="password"
            setValue={fullConfirmPass}
            title="Confirm Password"
            value={ConfirmPass}
          />

          <button
            className="w-full py-2.5 text-xl bg-primary text-white rounded-lg mt-6"
            onClick={handleRigester}
            disabled={loading}
          >
            {loading ? "..." : "Register"}
          </button>
        </>
      ) : (
        <>
          <p className="ml-2 font-light py-0.5 text-sm">Enter OTP</p>
          <Input
            placeholder="Enter OTP"
            type="number"
            setValue={setOtp}
            title="OTP"
            value={Otp}
          />
          <button
            className="w-full py-2.5 text-xl bg-primary text-white rounded-lg mt-6"
            onClick={handleVerifyOtp}
            disabled={loading}
          >
            {loading ? "..." : "Verify OTP"}
          </button>
        </>
      )}
    </div>
  );
}


function Rigester() {
  const [tab, setTab] = useState(true);
  const { user, logout, loading, login } = useAuth() as any;

  return (
    <div className={`bg-gray-100 h-auto pb-28`}>
      {
        user ? <UserProfile /> : (
      <Wrapper>
        <h1 className="text-xl text-center font-bold">
          Welcome To Alpran HR Services
        </h1>
        <p className="text-base mt-1 text-center font-normal text-neutral-400">
         Join us Today and Find Your Dream Job
        </p>

        <div
          className="w-full p-2 bg-gray-200 rounded-lg flex gap-1.5 mt-6"
          onClick={() => setTab(!tab)}
        >
          <button
            className={`${
              tab ? "bg-white text-black" : "bg-transparent text-neutral-500"
            } transition-all duration-500 px-6 rounded-lg w-1/2 py-2`}
          >
            Login
          </button>
          <button
            className={`${
              !tab ? "bg-white text-black" : "bg-transparent text-neutral-500"
            }  transition-all duration-500 px-6 rounded-lg w-1/2 py-2`}
          >
            Rigester
          </button>
        </div>
        {tab ? <Login login={login} loading={loading} /> : <RigesterForm />}
      </Wrapper>
        )
      }
    </div>
  );
}

export default Rigester;
