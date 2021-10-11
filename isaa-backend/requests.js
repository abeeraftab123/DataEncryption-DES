
import axios from "axios"
async function addUser(event){
    event.preventDefault();
    const formData = {
        T_name: document.getElementById('fname').value+document.getElementById('lname').value,
        T_email: document.getElementById('email').value,
        password: document.getElementById('pass').value,
        T_dob: document.getElementById('dob').value,
        T_gender: document.getElementById('gender').value,
        T_phone: document.getElementById('phn').value
    }
    const result=await axios.post("http://localhost:5000/adduser",formData);
    console.log(result);
}
