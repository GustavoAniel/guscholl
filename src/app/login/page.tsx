"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { CircleUserRound, LoaderCircle } from "lucide-react"

const formSchema = z.object({
  cpf: z.string().length(11, {
    message: "O cpf deve conter 11 dígitos",
  }),
  senha: z.string().min(5, {
    message: "A senha deve conter pelo menos 5 dígitos"
  })
})

export default function Login() {
  const [onLogin, setOnLogin] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cpf: "",
      senha: ""
    },

  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setOnLogin(true)
    if(values){
      await fetch("/api/get-login", {
      }).then((response) => {
        response.json().then((data) => {
          console.log(data)
        })
      })
    }
    setOnLogin(false)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-900">
      {onLogin ?
        <div className="flex flex-col items-center text-white gap-2">
          <h1>Carregando</h1>
          <LoaderCircle className="animate-spin" size={30}/>
        </div>
      :
        <div className="flex flex-col items-center">
        <CircleUserRound size={80} className="text-emerald-500 mb-4"/>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-white">CPF</FormLabel>
                  <FormControl className="outline-none pl-2">
                    <input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="senha"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                <FormLabel className="text-white">Senha</FormLabel>
                <FormControl className="outline-none pl-2">
                  <input type="password" {...field} />
                </FormControl>
                
                <FormMessage />
              </FormItem>
              )}
            >

            </FormField>
            <Button type="submit" className="bg-emerald-500 hover:bg-emerald-800">Entrar</Button>
          </form>
        </Form>
        </div>
      
      }
    </main>
  )
}
