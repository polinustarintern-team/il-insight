import logo from './assets/image/logo-il-insight.png'
import './App.css' 

function LoginPage() {

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-[#190930] p-10 rounded-3xl w-full max-w-md shadow-xl">
        
        {/* Logo + Title */}
        <div className="flex justify-center mb-8">
          <img 
            src={logo}  // ganti dengan path gambarmu
            alt="App Logo"
            className="w-40 object-contain"
          />
        </div>

        {/* Form */}
        <form className="space-y-6">

          {/* Email */}
          <div>
            <label className="text-white text-left text-sm">Email</label>
            <input
              type="email"
              placeholder="walidyxz@gmail.com"
              className="mt-1 w-full px-4 py-3 bg-gray-300 text-black rounded-lg outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-white text-sm">Password</label>
            <input
              type="password"
              placeholder="************"
              className="mt-1 w-full px-4 py-3 bg-gray-300 text-black rounded-lg outline-none"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage