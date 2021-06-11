import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import CloseIcon from '@material-ui/icons/Close';
import { AddUser, UpdateUser } from '../Api/user';

const InputField = styled.input`
    color: rgba(124, 141, 176, 1);
    border: 1px solid rgba(161, 176, 204, 1);
    border-radius: 4px;
    padding: 0.45em;
    font-size: 1.3rem;
    outline: none;
`
const SubmitButton = styled.button`
    border: 0.1px solid rgba(45, 45, 45, 1);
    background-color: rgba(45, 45, 45, 1);
    color: rgba(250, 250, 250, 1);
    font-size: 1.3rem;
    font-weight: 500;
    outline: none;
    cursor: pointer;
    padding: 0.45em;
    border-radius: 5px;
    &:hover{
        background-color: rgba(250, 250, 250, 1);
        color: rgba(45, 45, 45, 1);
    }
`
const Label = styled.label`
    font-size: 1rem;
    font-weight: 500;
    text-align: left;
    margin-bottom: 10px;
`

const PageBackground = styled.div`
    && {
    background-color: rgba(0,0,0,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    height: 100vh;
    width: 100vw;
    }
`
const DialogBox = styled.div`
    height: 400px;
    width: 400px;
    background-color: #fff;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
`
const DialogHeader = styled.div`
&&{
    height: 60px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    padding: 1em;
    border-radius: 8px 8px 0 0;
    margin: 0;
    > h2 {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 700;
    }
    > svg{
        cursor: pointer;
    }
}
`
const FormMain = styled.form`
    padding: 1em;
    color: #000;
    font-size: 0.9rem;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`

const ErrorField = styled.span`
    font-size: 0.7rem;
    color: red;
    height: 2em;
`

const FormDialog = ({data, openDialog, type}) => {

    const [errors, setErrors] = useState({name: '', number: ''})
    const [formData, setFormData] = useState({name: data.name, number: data.number})


    function handleFormData(e){
        setFormData(formData => ({...formData, [e.target.name]: e.target.value}))
    }

    async function submitHandler(e){
        e.preventDefault()
        if(formData.name === data.name && formData.number === data.name){
            setErrors({name: 'User already exists', number: 'User Already Exists'})
            return
        }
        if(type === 'add'){
            try{
                const time = new Date()
                const newUser = await AddUser(formData)
                const apiResTime = new Date() - time
                console.log(`The api took ${apiResTime}ms`)
                if(newUser.data.success) {
                    openDialog(false)
                } else {
                    setErrors(newUser.data.msg)
                }
            }
            catch(err){
                console.log(err)
            }
        }
        else if(type === 'edit'){
            try{
                const time = new Date()
                const updatedUser = await UpdateUser(formData, data.id)
                const apiResTime = new Date() - time
                console.log(`The api took ${apiResTime}ms`)
                if(updatedUser.data.success) {
                    openDialog(false)
                } else {
                    setErrors(updatedUser.data.msg)
                }
            }
            catch(err){
                console.log(err)
            }
        }
    }

    useEffect(() => {
        document.getElementById("user-name-input").focus()
        return () => {
            
        }
    }, [])

    return (
        <PageBackground>
            <DialogBox>
                <DialogHeader><h2>{type === 'add' ? 'Add' : 'Edit'}</h2><CloseIcon onClick={() => openDialog(false)}/></DialogHeader>
                <FormMain onSubmit={submitHandler}>
                    <Label htmlFor="user-name-input">Name</Label>
                    <InputField type="text" name="name" value={formData.name} onChange={handleFormData} placeholder="Name" id="user-name-input" required/>
                    <ErrorField>{errors.name}</ErrorField>
                    <Label htmlFor="user-number-input">Phone Number</Label>
                    <InputField type="number" name="number" value={formData.number} onChange={handleFormData} placeholder="Phone Number" id="user-number-input" min="1000000000" required/>
                    <ErrorField>{errors.number}</ErrorField>
                    <SubmitButton type="submit">Save</SubmitButton>
                </FormMain>
            </DialogBox>
        </PageBackground>
    )
}

export default FormDialog
