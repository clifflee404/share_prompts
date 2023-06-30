import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET (read)
export const GET = async(request, { params }) => {
  try {
    await connectToDB()

    const prompt = await Prompt.findById(params.id).populate('creator')

    if(!prompt) return new Response("Prompt Not Found", { status: 404})

    return new Response(JSON.stringify(prompt), { status: 200 })
  } catch (error) {
    return new Response("Failed to fetch prompt", { status: 500 })
  }
}
// PATCH (update)
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json()
  try {
    await connectToDB()

    // find the existing prompt by ID
    const existingPrompt = await Prompt.findById(params.id)

    if(!existingPrompt){
      return new Response('Prompt not found', { status: 404 })
    }

    // update the prompt with new data
    existingPrompt.prompt = prompt
    existingPrompt.tag = tag

    await existingPrompt.save()
    
    const resData = {
      code: 0,
      msg: 'Successfully updated the prompt'
    }
    return new Response(JSON.stringify(resData), { status: 200 })
  } catch (error) {
    return new Response('Error updating prompt', { status: 500 })
  }
}

//DELETE (delete)

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB()

    // Find the prompt by id and remove it
    await Prompt.findByIdAndRemove(params.id)

    const resData = {
      code: 0,
      // Prompt deleted successfully
      msg: 'Successfully deleted the prompt'
    }

    return new Response(JSON.stringify(resData), { status: 200 })
  } catch (error) {
    return new Response("Error deleting prompt", { status: 500 })
  }
}