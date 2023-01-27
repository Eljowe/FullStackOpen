import { useSelector, useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {
    const style = {
        marginBottom: 10
      }
    const dispatch = useDispatch()
    const filterfunc = (event) => {
        if (props.filter.len===0){
            props.filterChange('')
        }
        else {
            props.filterChange(event.target.value)
        }
    }
    return(
        <div style={style}>
            Filter <form onChange={filterfunc}>
                <input name="filter"/>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      filter: state.filter,
    }
  }


const mapDispatchToProps = { filterChange }
const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter)


export default ConnectedFilter;