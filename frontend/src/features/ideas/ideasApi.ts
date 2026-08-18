import api from "../../lib/axios";



export const getIdeas = async () => {
    const response = await api.get("/ideas")
    return response.data
}


export const createIdea = async (data: { title: string; description: string }) => {
    const response = await api.post('/ideas', data)
    return response.data
}


export const updateIdea = async (
    id: string,
    data: {
        title: string;
        description: string;
    }) => {
   
   const response = await api.patch(`/ideas/${id}`, data);

    return response.data;
}

export const deleteideas = async (id:string) => {
    const response = await api.delete(`/ideas/${id}`)
    return response.data
}