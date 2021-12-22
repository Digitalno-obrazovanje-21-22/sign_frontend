import { useEffect, useState } from "react"

export const useQuery = (fetchQuery, options) => {
  const [data, setData] = useState({loading: true, data: null, error: null})
  const [refetch, setRefetch] = useState(null)
  const [myInterval, setMyInterval] = useState(!!options && !!options.refetch ? 
    setInterval(() => {
      setRefetch(Math.random%10)
    }, options.refetchRate || 5000) : null)

  useEffect(() => {
    fetchQuery.then((response) => {
      setData({loading: false, data: response.data != null ? response.data : response})
    }).catch((error) => {
      setData({loading: false, data: null, error})
    })
    return () => {
      clearInterval(myInterval)
    }
  }, [refetch])

  return data
}