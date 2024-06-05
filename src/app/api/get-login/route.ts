import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  const body = await req.json()

  console.log(body)

  try {
    const allUsers = await prisma.user.findMany()

    if (allUsers.length === 0) {
       return NextResponse.json('Usuário não encontrado' , {status: 400})
    }
    return NextResponse.json(allUsers, {status: 200})
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json("Erro em buscar usuários", { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}