import React from 'react';
import {signup} from '../api/apiCall';

class UserSignUpPage extends React.Component{

    state = {
        username: null,
        displayName: null,
        password: null,
        passwordConfirm: null,
        pendingApiCall:false

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
        const { name, value } =event.target //object costructring;   event'in target objesi 
                                             //içindeki name'i al,target'daki value degerini tanımla
        this.setState({
         [name] : value                      

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

    onClickSignUp = async event => {

        event.preventDefault();

        const {username, displayName, password} = this.state;

        const body = {       //json objesi olacak
            username, //username,                 
            displayName, // displayName,           //key ve value için kullanılan isimlendirmeler aynıysa, sadece ir tanesini yazmamız yeterli olacaktır.
            password, //password
        };

        this.setState({pendingApiCall: true});

        try {

            const response = await signup(body);
            
        } catch (error) {
           this.setState({pendingApiCall: false}) ;
        }
        //axios.post('/api/1.0/users',body)
        //signup(body)
        //.then((response)=>{
         //   this.setState({pendingApiCall: false});
        //}).catch(error =>{
        //    this.setState({pendingApiCall: false});
       // })
    }; //callback function

    

    render() {

        const { pendingApiCall } = this.state;
        return (
            <div className="container"> 
            <form>
                <h1 className="text-center" >Sign Up</h1>  
                <div className="mb-3">
                    {<label>Username</label>           /*this.onChangeUsername--> */}
                    <input className="form-control" name = "username" onChange={this.onChange} />
                </div>

                <div className="mb-3">
                    <label>Display Name </label>
                    <input className="form-control" name = "displayName" onChange={this.onChange} />
                </div>
                <div className="mb-3">
                    <label>Pasword</label>
                     <input className="form-control" name ="password" onChange={this.onChange} type="password"/>
                </div>
                <div className="mb-3">
                    <label>Pasword Confirm</label>
                     <input className="form-control" name = "passwordConfirm" onChange= {this.onChange} type="password"/>
                </div>
                <div className= "text-center" >
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

