import React, {useContext, useRef, useState} from 'react'; 
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const SignUpModal = () => {
    // instensier le context avec du destruning  //
    const {modalState, toggleModals,signUp} = useContext (UserContext)
    // intensier l'import des hooks // 
    const navigate = useNavigate()

    //console.log(modalState, toggleModals);  
   // console.log(signUp);

    // Référencer tout les inputs ou éléments dans mon tableau //
    const inputs = useRef([])
     // Référencer pour vider (reset) les inputs //
    const formRef = useRef()

    // State //
    const [validation, setValidation]= useState('');


     const addInputs = (el)=>{
        // Si l'élément existe et qu'il n'est pas inclut dans mon tableau //
        if(el && !inputs.current.includes(el)){
            // push(rajout l'élément mon tableau)
            inputs.current.push(el)
        }
     } 
    // Validation des données // 
     const handleForm = async (e)=>{
        e.preventDefault();
        //console.log(inputs);

        if ((inputs.current[1].value.length || inputs.current[2].value.length ) < 6) {
            setValidation(" 6 characters min ")
            return;
        } else if((inputs.current[1].value !== inputs.current[2].value )){
            setValidation(" passwords does not match ! ")
           return;
        }
     // création d'un compte utilisateur //

     try {
        const created = await signUp(
            inputs.current[0].value,
            inputs.current[1].value,              
        ) 
        console.log(created);  
        // vider les inputs avec la méthode reset() //
      formRef.current.reset()
       // vider les moditifications d'erreur d'inscription des utilsateur (mot de passe trop court, pas indentique etc.....)
      setValidation('')
      //console.log(created);
      // S'il n'y pas d'erreur dans le catch , on va pouvoir naviger sur le site //
      navigate('/RoutePrive/RoutePriveHome')

     } catch (error) {
       if(error.code === "auth/invalid-email"){
        setValidation('Email format invalid')
       }
       if (error === 'auth/email-already-in-use') {
        setValidation('Email already used')

       }
     }

     }
     // fonction pour néttoyer les écritures d'érreur //
     const closeModal = ()=>{
        setValidation("");
        toggleModals('close') // Fermeture du modal après l'apparition de la route //
       
     }
    return (
        <> {modalState.signUpModal && (
            <div className='position-fixed top-0 vw-100 vh-100'>             
              <div
               onClick={closeModal}
                 className="w-100 h-100 bg-dark bg-opacity-75"> 
                 </div>
                <div className="position-absolute top-50 start-50 translate-middle" style ={{ minWidth: "400px" }}>
                    <div className="modal-dialog bg-light p-3">
                        <div className="modal-content">
                            <div className="modal-header pb-3">
                                <h5 className="modal-title text-primary ">
                                    Sign Up
                                </h5>
                                <button  
                                onClick={closeModal}
                                className="btn-close"></button>
                            </div>
                            <div className="modal-body">               
                                <form className="sign-up-form"
                                ref={formRef}
                                 onSubmit={handleForm}
                                >
                                   <div className="mb-3">
                                        <label htmlFor="SignUpEmail" className='form-label'>Email adress</label>
                                        <input ref={addInputs}     
                                        name='email'
                                        required 
                                        type="email" 
                                        className='form-control'
                                        id='signUpEmail'
                                        />
                                    </div> 
                                   <div className="mb-3">
                                        <label htmlFor="SignUpPwd" className='form-label'>Password</label>
                                        <input ref={addInputs}
                                        name='pwd'
                                        required 
                                        type="passeword" 
                                        className='form-control'
                                        id='signUpPwd'
                                        />
                                    </div> 
                                   <div className="mb-3">
                                        <label htmlFor="RepeatPwd" className='form-label'>Repeat password</label>
                                        <input ref={addInputs}
                                        name='pwd'
                                        required 
                                        type="passeword" 
                                        className='form-control'
                                        id='RepeatPwd'
                                        />
                                        <p className='text-danger mt-1'>{validation}</p>
                                    </div> 
                                    <button className="btn btn-primary">Submit</button>
                                </form>
                            </div>

                        </div>
                    </div>
              
              </div>
            </div>
        )}
          

        </>
    );
};

export default SignUpModal;