//import { useRef, useEffect, useState, FormEvent } from "react";
import { useRef, useEffect, useState } from "react";
import { FiTrash } from "react-icons/fi";
import { api } from "./services/api";

interface CustomerProps {
  id: string;
  name: string;
  email: string;
  status: boolean;
  created_at: string;
}

export default function App() {
  //02:
  const [customers, setCustomers] = useState<CustomerProps[]>([]);

  //Criando referência de cada cadastro do banco, isso, nameRef vai ser associado ao input do html pra pegar os dados que forem digitados lá pra enviar pra api:
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  //01--Criando a funcao que vai ler tudo do BD:
  useEffect(() => {
    loadCustomers();
  }, []);

  async function loadCustomers() {
    const response = await api.get("/customers");
    //console.log(response.data)
    setCustomers(response.data);
  }

  //Cria função que trata os dados do form:
  //async function handleSubmit(event: FormEvent) {
  async function handleSubmit() {
    //prevenir que o navegador recarregue a página:
    //event.preventDefault();

    if (!nameRef.current?.value || !emailRef.current?.value) return;
    // alert("You need fill all inputs: Name and E-mail!");
    //return; //return finaliza a funcao handleSubmit.

    const response = await api.post("/customer", {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
    });
    setCustomers((allCustomers) => [...allCustomers, response.data]);
    //alert("Cliente Criado com sucesso!");

    nameRef.current.value = "";
    emailRef.current.value = "";
  }

  async function handleDelete(id: string) {
    try {
      //prompt("Are you absolutely sure you want to delete this record forever?");
      await api.delete("/customer", {
        params: {
          //Esta parte: id: id significa: quero passar uma propriedade id e ela vai receber o id vindo dos parametros
          id: id,
        },
      });

      //Atualizar lista de usuários após deleção de um destes:
      const allCustomers = customers.filter((customer) => customer.id !== id);
      setCustomers(allCustomers);

      //alert("Usuário apagado com sucesso!");
    } catch (error) {
      console.log(error);
    }
  }

  //fim da funcao 01

  return (
    <div className="w-full min-h-screen bg-gray-900 flex justify-center px-4">
      <main className="my-10 w-full md:max-2-2xl">
        <h1 className="text-3xl font-medium text-white">Customers</h1>

        <form className="flex flex-col my-6" onSubmit={handleSubmit}>
          <label className="font-medium text-white">Name:</label>
          <input
            defaultValue={"Marcos da Silva Santos"}
            type="text"
            placeholder="Type your full name here:"
            className="2-full mb-5 rounded p-2"
            ref={nameRef}
          />

          <label className="font-medium text-white">E-mail:</label>
          <input
            defaultValue={"marcos.silva@gmail.com"}
            type="email"
            placeholder="Type your e-mail here:"
            className="2-full mb-5 rounded p-2"
            ref={emailRef}
          />

          <input
            type="submit"
            value="Register"
            className="cursor-pointer mb-5 p-2 bg-green-500 rounded
            font-medium"
          />
        </form>

        <h2 className="text-white p-5 flex text-pretty text-center justify-center text-2xl">
          Registered Customers:
        </h2>

        <section className="flex flex-col gap-4">
          {customers.map((customer) => (
            <article
              key={customer.id}
              className="w-full bg-white rounded p-2 relative
            hover:scale-105 duration-200"
            >
              <p>
                <span className="font-medium">Name:</span> {customer.name}
              </p>
              <p>
                <span className="font-medium">E-mail:</span> {customer.email}
              </p>
              <p>
                <span className="font-medium">Status:</span>{" "}
                {customer.status ? " Active" : " Inactive"}
              </p>

              <button
                className="bg-red-500 w-7 h-7 flex items-center justify-center rounded-lg absolute right-0 -top-2"
                onClick={() => handleDelete(customer.id)}
              >
                <FiTrash size={18} color="#fff" />
              </button>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
