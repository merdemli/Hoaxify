import React from 'react';
import { signup } from '../api/apiCall';

class UserSignUpPage extends React.Component {

    state = {
        username: null,
        displayName: null,
        password: null,
        passwordConfirm: null,
        pendingApiCall: false,
        errors: {}

    };

    //onChange = event => {
    //const value = event.target.value;
    // const name = event.target.name;
    // this.setState({
    //     [name] : value   //name ne ise ona karsı girilen degeri state'de 
    //                      //güncelliyor olacak,generic bir yapı kuruldu
    //                      //aynı onChange fonksiyonu tüm field'lar için çalışıyor hale  geldi
    // })
    //}

    onChange = event => {
        //generic yapı
        const { name, value } = event.target //object costructring;   event'in target objesi 
        //içindeki name'i al,target'daki value degerini tanımla
        const errors = {...this.state.errors};
        errors[name] = undefined; //var olan error caseini ortadan kaldırıyoruz

        this.setState({
            [name]: value,
            errors

        });
    };

    // onChangeUsername = event => {
    //     this.setState({
    //         username: event.target.value});

    // };

    // onChangeDisplayName = event => {
    //     this.setState({
    //         displayName: event.target.value});

    // };

    // onChangePassword = event => {
    //     this.setState({
    //         password: event.target.value});

    // };

    // onChangePasswordConfirm= event => {
    //     this.setState({
    //         passwordConfirm: event.target.value});

    // };

    onClickSignUp = async event => { //async: fonx sonucunun promise oldugunu belirtir

        event.preventDefault();

        const { username, displayName, password } = this.state;

        const body = {       //json objesi olacak
            username, //username,                 
            displayName, // displayName,         //key ve value için kullanılan isimlendirmeler aynıysa, sadece ir tanesini yazmamız yeterli olacaktır.
            password, //password
        };

        this.setState({ pendingApiCall: true });

        try {

            const response = await signup(body); //sonucu promise olan fonksiyonun  bitmesini bekler
            //this.setState({pendingApiCall: false})

        } catch (error) {

            if(error.response.data.validationErrors){
                this.setState({ errors: error.response.data.validationErrors });
            }
            //this.setState({pendingApiCall: false}) ;
            
        }
        this.setState({ pendingApiCall: false });
        //axios.post('/api/1.0/users',body)

        //signup(body) //promise bir çağrı
        //.then((response)=>{
        //   this.setState({pendingApiCall: false});
        //}).catch(error =>{
        //    this.setState({pendingApiCall: false});
        // })
    }; //callback function



    render() {

        const { pendingApiCall, errors } = this.state;
        const{ username, displayName} = errors;
        return (
            <div className="container">
                <form>
                    <h1 className="text-center" >Sign Up</h1>
                    <div className="mb-3">
                        {<label>Username</label>           /*this.onChangeUsername--> */}
                        <input className={username ? 'form-control is-invalid' : 'form-control'} name="username" onChange={this.onChange} />
                        <div className="invalid-feedback">
                           {username}</div>
                    </div>

                    <div className="mb-3">
                        <label>Display Name </label>
                        <input className={displayName ? 'form-control is-invalid' : 'form-control'} name="displayName" onChange={this.onChange} />
                        <div className="invalid-feedback">
                           {displayName}</div>
                    </div>

                    <div className="mb-3">
                        <label>Pasword</label>
                        <input className="form-control" name="password" onChange={this.onChange} type="password" />
                    </div>
                    <div className="mb-3">
                        <label>Pasword Confirm</label>
                        <input className="form-control" name="passwordConfirm" onChange={this.onChange} type="password" />
                    </div>
                    <div className="text-center" >
                        <button className="btn btn-primary"
                            onClick={this.onClickSignUp}
                            disabled={pendingApiCall} >
                            {/*expression JS*/pendingApiCall && <span class="spinner-border spinner-border-sm"></span> /*conditional rendering*/}
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>

        );
    }

}

export default UserSignUpPage;

