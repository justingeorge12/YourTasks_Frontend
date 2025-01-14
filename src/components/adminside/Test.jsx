import { useCallback, useState } from "react"

function Test() {

    const [ count, setCount] = useState(0)

    const increment = useCallback(() => {
        setCount((prev) => prev + 1)
    }, [])

    return(
        <div>
            {count}
            <button onClick={increment}>incre</button>
        </div>
    )
}

export default Test