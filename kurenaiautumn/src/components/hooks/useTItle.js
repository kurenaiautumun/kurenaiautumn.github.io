import { useEffect } from "react"

const useTitle = title =>{
    useEffect( ()=>{
        document.title = `${title} - kurenai`
    }, [title])
}

export default useTitle;