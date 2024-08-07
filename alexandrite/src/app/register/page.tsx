"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Register() {
    const router = useRouter()
    const [user, setUser] = useState({
        name: "",
        username: "",
        email: "",
        password: ""
    })
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }
    const handleRegis = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(user);

        const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL  + '/api/user/register', {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const response = await res.json()

        if (!res.ok) {
            // This will activate the closest `error.js` Error Boundary
            return alert(response.message)
        }
        alert("berhasil register")
        router.push("/login")
    }
    return (
        <>
            <div className="min-h-screen bg-neutral-200 flex flex-col justify-center sm:py-12">
                <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
                    <h1 className="font-bold text-center text-2xl mb-5">Create Account</h1>
                    <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
                        <form onSubmit={handleRegis}>
                            <div className="px-5 py-7">
                                <label className="font-semibold text-sm text-gray-600 pb-1 block">Name</label>
                                <input
                                    name='name'
                                    type="text"
                                    value={user.name}
                                    onChange={handleChange}
                                    placeholder='Type here'
                                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                                <label className="font-semibold text-sm text-gray-600 pb-1 block">Username</label>
                                <input
                                    name='username'
                                    type="text"
                                    value={user.username}
                                    onChange={handleChange}
                                    placeholder='Type here'
                                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                                <label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
                                <input
                                    name='email'
                                    type="email"
                                    value={user.email}
                                    onChange={handleChange}
                                    placeholder='Type here'
                                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                                <label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
                                <input
                                    name='password'
                                    type="password"
                                    value={user.password}
                                    onChange={handleChange}
                                    placeholder='Type here'
                                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                                <button type="submit" className="mt-3 text-lg font-semibold
      bg-gray-800 w-full text-white rounded-lg
      px-6 py-3 block shadow-xl hover:text-white hover:bg-black">
                                    <span className="inline-block mr-2">Register</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="py-5">
                        <div className="grid grid-cols-2 gap-1">
                            <div className="text-center sm:text-left whitespace-nowrap">
                                <Link href="/login">
                                    <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block align-text-top">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                        </svg>
                                        <span className="inline-block ml-1">Already have account? Login</span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}