import React, {useEffect, useState} from 'react'
import { getAllUsers } from '../Api/user'
import Button from '@material-ui/core/Button';
import styled from 'styled-components'
import FormDialog from './FormDialog';

const TableContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 90% 1fr;
  padding: 1em;
`
const Table = styled.table`
  grid-column: 2 / 3;
  border-collapse: collapse;
`
const Thead = styled.thead`
  background: black;
  color: white;
  height: 50px;
`
const BodyRow = styled.tr`
  height: 3em;
  transition: transform 0.3s;
  border-bottom: 1px solid #dddddd;
  &:nth-child(odd){
    background: #f3f3f3;
  }
`
const TData = styled.td`
  text-align: center;
`
const CountButton = styled(Button)`
  background-color: green;
`

const MainTable = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [isAdd, setIsAdd] = useState(false)
    const [currentData, setCurrentData] = useState({id: '', name: '', number: ''})
    const [count, setCount] = useState(0)

    useEffect(() => {
      if(!isEditing && !isAdd){
      async function getUsers(){
          console.log('Fetching data....')
          try{
            const users = await getAllUsers()
            if(users.data.success){
              setLoading(false)
              // console.log(users.data)
              setData(users.data.data)
            }
            else {
              setLoading(false)
              alert('Error occured while getting data')
            }
          } catch(err){
            console.log(err)
            setLoading(false)
          }
      }
        setLoading(true)
        setData([])
        getUsers()
      }
      return () => {
        
      }
    }, [isAdd, isEditing])

    const editHandler = (item) => {
      console.log(item._id)
      setIsAdd(false)
      setCurrentData({id: item._id, name: item.name, number: item.number})
      setCount(count => count + 1)
      setIsEditing(true)
    }

    const addHandler = () => {
      setIsEditing(false)
      setCurrentData({id: '', name: '', number: ''})
      setCount(count => count + 1)
      setIsAdd(true)
    }

    return (
      <>

          <TableContainer>
            <Table>
                <Thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th><Button onClick={addHandler} variant="contained" color="primary">Add</Button></th>
                    </tr>
                </Thead>
                <tbody>
                {
                    loading ? "Loading..." :
                    data?.map((item, i) => 
                    <BodyRow>
                        <TData>{i+1}</TData> 
                        <TData>{item.name}</TData>
                        <TData>{item.number}</TData>
                        <TData>
                          <Button onClick={() => editHandler(item)} variant="contained" color="secondary">Edit</Button></TData>
                      </BodyRow>
                    )
                }
                </tbody>
            </Table>
          <CountButton variant="contained" onClick={() => alert(`You have called add and update api features ${count} times`)}>Count</CountButton>
            {isEditing ? <FormDialog data={currentData} openDialog={setIsEditing} type="edit"/> : null}
            {isAdd ? <FormDialog data={currentData} openDialog={setIsAdd} type="add"/> : null}
            </TableContainer>
            </>
    )
}

export default MainTable