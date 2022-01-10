import axiosInstance from "../axiosInstance/axiosInstance"
import { useQuery } from "../utils"

export const useRooms = (options) => useQuery(axiosInstance.get('/room'), options)
export const useRoomParticipants = (id) => useQuery(axiosInstance.get(`/room-participant/${id}`))
export const useRandomSign = () => useQuery(axiosInstance.get('/sign/random'))
export const useSigns = () => useQuery(axiosInstance.get('/sign'))

export const createRoom = () => axiosInstance.post('/room')