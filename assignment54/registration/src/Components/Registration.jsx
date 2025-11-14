import React, { useState } from "react";
import "../App.css";
import { supabase } from "../supabaseClient";


const Registration = () => {
 

  // const [data, setData] = useState([])
  const [inputs, setInputs] = useState({
    fullname: "",
    email: "",
    cnic: "",
    password: "",
    car: "Audi",
    gender: "",
    newsletter: false,
    terms: false,
    details: "",
  });
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])


  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    if (
      inputs.fullname && inputs.email && inputs.cnic && inputs.password && inputs.car && inputs.gender && inputs.terms && inputs.details
    ) {
      try {
        const { error } = await supabase
      .from("reactForm")
      .insert([inputs]);
      // .insert([
      //   {
      //     fullname: inputs.fullname,
      //     email: inputs.email,
      //     cnic: inputs.cnic,
      //     password: inputs.password,
      //     car: inputs.car,
      //     gender: inputs.gender,
      //     newsletter: inputs.newsletter,
      //     terms: inputs.terms,
      //     details: inputs.details,
      //   },
      // ]);

    // setData((prev)=> ([...prev, inputs]))
    // console.log(inputs);
    // console.log(data);
    // if(inputs.fullname && inputs.email && inputs.cnic && inputs.password && inputs.car && inputs.gender && inputs.terms && inputs.newsletter && inputs.details){
    //   alert("Form submitted successfully")
    // } else{
    //   alert("Please fill all the fields")
    // }

    if (error) {
      alert("Error submitting form: " + error.message);
    } else {
      alert("Form submitted successfully");
      setData((prev) => ([...prev, inputs]))
      setInputs({
        fullname: "",
        email: "",
        cnic: "",
        password: "",
        car: "Audi",
        gender: "",
        newsletter: false,
        terms: false,
        details: "",
      });
    }
        
      } catch (error) {
        console.log(error);
      }
    }else{
      alert("Please fill all the fields")
    }
    setIsLoading(false)
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto mt-10 p-8 bg-white rounded-2xl shadow-lg border border-gray-300 transition-all duration-300 hover:shadow-2xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Registration Form
        </h2>

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          type="text"
          name="fullname"
          placeholder="Your full name"
          value={inputs.fullname}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 rounded-lg border border-gray-400 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={inputs.email}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 rounded-lg border border-gray-400 bg-gray-50 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-all"
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">
          CNIC Number
        </label>
        <input
          type="number"
          name="cnic"
          placeholder="Your cnic"
          value={inputs.cnic}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 rounded-lg border border-gray-400 bg-gray-50 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all"
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          name="password"
          placeholder="Your password"
          value={inputs.password}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 rounded-lg border border-gray-400 bg-gray-50 focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none transition-all"
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Choose Car
        </label>
        <select
          name="car"
          value={inputs.car}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 rounded-lg border border-gray-400 bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all"
        >
          <option value="BMW">BMW</option>
          <option value="Audi">Audi</option>
          <option value="Ford">Ford</option>
          <option value="V8">V8</option>
        </select>

        <span className="block text-sm font-medium text-gray-700 mb-2">
          Gender
        </span>
        <div className="flex items-center gap-4 mb-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={inputs.gender == "male"}
              onChange={handleChange}
              className="w-4 h-4 text-blue-500 border-gray-400 focus:ring-blue-500"
            />
            <span className="text-gray-700">Male</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={inputs.gender == "female"}
              onChange={handleChange}
              className="w-4 h-4 text-pink-500 border-gray-400 focus:ring-pink-500"
            />
            <span className="text-gray-700">Female</span>
          </label>
        </div>

        <label className="flex items-center gap-2 mb-3 cursor-pointer">
          <input
            type="checkbox"
            name="newsletter"
            checked={inputs.newsletter}
            onChange={handleChange}
            className="w-4 h-4 text-indigo-600 rounded border-gray-400 focus:ring-indigo-500"
          />
          <span className="text-gray-700">Sign up for our newsletter</span>
        </label>

        <label className="flex items-center gap-2 mb-4 cursor-pointer">
          <input
            type="checkbox"
            name="terms"
            checked={inputs.terms}
            onChange={handleChange}
            className="w-4 h-4 text-green-600 rounded border-gray-400 focus:ring-green-500"
          />
          <span className="text-gray-700">
            I agree to the terms and conditions
          </span>
        </label>

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Additional Details
        </label>
        <textarea
          name="details"
          value={inputs.details}
          onChange={handleChange}
          className="w-full h-24 mb-6 px-4 py-2 rounded-lg border border-gray-400 bg-gray-50 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-all resize-none"
        ></textarea>

        <button
          type="submit"
          disabled={isLoading}  
        className="w-full py-3 px-6 font-semibold rounded-lg bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-md hover:shadow-xl transition-transform"
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </>
  );
};

export default Registration;
