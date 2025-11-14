import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { client } from "@/lib/client"; 
console.log(client);


function Login({ open, setOpen }) {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const handleChange = (e) =>{
    const {id, value} = e.target;
    setFormData((prev)=> ({...prev, [id]: value}));
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
    // console.log("formData", formData); 
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-[420px] p-8 rounded-2xl shadow-2xl border-none bg-gradient-to-b from-[#000000] to-[#021914] text-white"
      >
        <DialogHeader className="space-y-2 text-center">
          <DialogTitle className="text-3xl font-semibold text-white">
            Welcome Back 
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            Sign in to continue your learning journey
          </DialogDescription>
        </DialogHeader>

        <form  onSubmit={handleSubmit} className="grid gap-5 mt-6">
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-sm text-gray-200">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              onChange={handleChange}
              value={formData.email}
              required
              className="bg-[#012B24] border border-[#00E6C3]/40 focus-visible:ring-[#00E6C3] text-white placeholder-gray-400"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password" className="text-sm text-gray-200">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              onChange={handleChange}
              value={formData.password}
              required
              className="bg-[#012B24] border border-[#00E6C3]/40 focus-visible:ring-[#00E6C3] text-white placeholder-gray-400"
            />
          </div>

          <div className="flex items-center justify-between text-sm text-gray-300">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-[#00E6C3]" />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-white hover:underline">
              Forgot password?
            </Link>
          </div>

          <DialogFooter className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="w-full sm:w-auto bg-transparent border border-[#00E6C3]/60 text-[#00E6C3] hover:bg-[#00E6C3]/10 hover:text-white"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="w-full sm:w-auto bg-[#00E6C3] hover:bg-[#00bfa5] text-black font-semibold"
            >
              Login
            </Button>
          </DialogFooter>

          <p className="text-center text-sm text-gray-300 mt-4">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-[#00E6C3] font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default Login;
