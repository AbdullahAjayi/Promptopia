import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"

// GET (read)
export const GET = async (req, { params }) => {
  try {
    await connectToDB()
    const prompt = await Prompt.findById(params.id).populate("creator")

    if (!prompt) return new Response("Prompt not found", { status: 404 })

    return new Response(JSON.stringify(prompt), {
      status: 200,
    })
  } catch (error) {
    return new Response("Falied to fetch prompt", {
      status: 500,
    })
  }
}

// PATCH (update)
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json()
  try {
    await connectToDB()

    const exitstingPrompt = await Prompt.findById(params.id)
    if (!exitstingPrompt) return new Response("Prompt does not exit", { status: 404 })

    exitstingPrompt.prompt = prompt
    exitstingPrompt.tag = tag

    await exitstingPrompt.save()

    return new Response(JSON.stringify(exitstingPrompt), { status: 200 })
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 })
  }
}

// DELETE (delete)
export const DELETE = async (req, { params }) => {
  try {
    await connectToDB()
    await Prompt.findByIdAndDelete(params.id)

    return new Response("Deleted prompt successfully", { status: 200 })
  } catch (error) {
    return new Response("Failed to delete prompt", { status: 500 })
  }
}
