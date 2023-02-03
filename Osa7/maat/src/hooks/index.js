import { useEffect, useState } from "react";


export const useCountry = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
      setValue(event.target.value)
    }
  
    return {
      type,
      value,
      onChange
    }
}