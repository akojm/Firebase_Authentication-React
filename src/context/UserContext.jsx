
import { createContext, useEffect, useState } from 'react';

//Importation les méthodes d'inscription d'un utilisateur depuis Firebase Auth //
import {
signInWithEmailAndPassword, // Pour s'inscrire (Email et Password)
createUserWithEmailAndPassword, // Pour créer (Email et Passoword) d'un utilsateur
onAuthStateChanged // Pour prendre en compte le changement (mise à jour)
} from 'firebase/auth';

// Importation de notre authentification //
import { auth } from '../firebase-config';

export const UserContext = createContext();

// Composent d'ordre supérieur pour fournir à mes enfants (children) les données du context crée //
export function UserContextProvider(props){



// Création d'une méthode pour l'inscription d'un utilisateur //
const signUp = (email, password) => createUserWithEmailAndPassword(auth, email,password)
// Création d'une méthode pour l'inscription d'un utilisateur //
const signIn = (email, password) => signInWithEmailAndPassword(auth, email,password)
//console.log(signUp);

// Création d'un compte utilisateur //
const [currentUser, setCurrentUser] = useState();
const [loadingData, setLoadingData] = useState(true); // Temps d'attente de la base de données Firebase // 


// useeffect sera un écouteur (observor) pour savoir si on s'est bien connecté, bien inscrit et... //
useEffect(()=>{

  const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
    setCurrentUser(currentUser);
    setLoadingData(false);
  }) 

  return unsubscribe;

},[])

//const signUp = (email, passeword) => createUserWhithEmailAndPassword(auth, email, passeword)
// Modal //
  const [modalState, setModalState] = useState({
        signUpModal : false,
        signInModal : false,
    })

    // création d'une méthode toggle avec les conditions //
   const toggleModals = (modal)=> {
      if(modal === "signIn"){
        setModalState({
            signUpModal : false,
            signInModal : true,
        })
      }
      if(modal === "signUp"){
        setModalState({
            signUpModal : true,
            signInModal : false,
        })
      }
      if(modal === "close"){
        setModalState({
            signUpModal : false,
            signInModal : false,
        })
      }
      
    }
    return(
        // Passer la valeur du modalState au context supérieur //
        // Creation d'une méthode toggle pour ouvrir ou fermer notre modal //
        <UserContext.Provider value ={{modalState, toggleModals, signUp, currentUser, signIn}}  >
        { !loadingData &&  props.children}
        </UserContext.Provider>
    )
}