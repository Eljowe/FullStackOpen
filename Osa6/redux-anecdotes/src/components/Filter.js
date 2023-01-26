import { useSelector, useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()
    const filterfunc = (event) => {
        
        if (event.target.value.len===0){
            dispatch(filterChange(''))
        }
        else {
            dispatch(filterChange(event.target.value))
        }
    }
    return(
        <div>
            Filter
            <form onChange={filterfunc}>
                <input name="filter"/>
            </form>
        </div>
    )
}

export default Filter;