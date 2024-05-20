import { FiTrash2, FiTrash } from 'react-icons/fi'

export default function App() {
  return (
    <div className="w-full min-h-screen bg-gray-900 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-2x1">
        <h1 className="text-3xl font-medium text-white">Customers</h1>

        <form className="flex flex-col my-6">
          <label className="font-medium text-white">Name:</label>
          <input
            type="text"
            placeholder="Type your full name here:"
            className="2-full mb-5 rounded p-2"
          
          />

<label className="font-medium text-white">E-mail:</label>
          <input
            type="text"
            placeholder="Type your e-mail here:"
            className="2-full mb-5 rounded p-2"
          
          />

          <input type="submit" value="Register"
            className="cursor-pointer mb-5 p-2 bg-green-500 rounded
            font-medium"
          />
        </form>
          <h2 className="text-white p-5 flex text-pretty text-center justify-center text-2xl">Registered Customers:</h2>
        <section className="flex flex-col">
          <article
            className="w-full bg-white p-3 rounded relative hover:scale-105 duration-300">
            <p className="font-medium"><span className="">Name:</span> Thiago</p>
            <hr/>
    <p className="font-medium"><span className="">E-mail:</span> thiago@gmail.com</p><hr/>
            <p className="font-medium"><span className="">Status:</span> Active</p>
            
            <button className='bg-red-500 absolute w-7 h-7 flex items-center justify-center rounded-lg right-0 -top-4'>
              <FiTrash size={20} color='#fff'/>
              
    </button>

          </article>
        </section>




      </main>
      
  </div>
  )
}