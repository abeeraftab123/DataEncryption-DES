// import FetchService from './service/FetchService'; //from './service/FetchService';
// import FetchService from './FetchService';

// const fetchService = new FetchService();
// var formData = {
//     fname: "",
//     lname: "",
//     email: "",
//     pass: "",
//     dob: "",
//     gender: "",
//     phn: ""
// }

// document.getElementById('btnSubmit').addEventListener("click",function(e){
//     e.preventDefault();
//     submitForm();
// })

// /*Event listener*/
// const regForm=document.querySelector("#regForm");
// if(regForm){
//     regForm.addEventListener("submit",function(e){
//         submitForm(e,this);
//     });
// }

/*Function*/
async function submitForm(e){
    e.preventDefault();
    
    const formData = {
        T_name: document.getElementById('fname').value+document.getElementById('lname').value,
        T_email: document.getElementById('email').value,
        password: document.getElementById('pass').value,
        T_dob: document.getElementById('dob').value,
        T_gender: document.getElementById('gender').value,
        T_phone: document.getElementById('phn').value
    }
    console.log(formData);

    const headers = buildHeaders();
    const rawResponse = await fetch("http://localhost:5000/adduser", {
        method: "POST",
        headers:headers,
        mode:'cors',
        body: JSON.stringify(formData)
    });

    window.open(main.html);
}
function buildHeaders(authorization = null) {
    const headers = {
        "Content-Type": "application/json",
        // "Access-Control-Allow-Origin":"http://localhost:5000"
    };
    return headers;
}
function buildJsonFormData(form) {
    const jsonFormData = { };
    for(const pair of new FormData(form)) {
        jsonFormData[pair[0]] = pair[1];
    }
    return jsonFormData;
}


// app.post('/route1', function (req, res) {
//     res.send('POST request 1')
// })