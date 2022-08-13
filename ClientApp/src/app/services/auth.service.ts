
import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from "@angular/router";
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    userData: any; 
    constructor(public afAuth: AngularFireAuth, public router: Router, public ngZone: NgZone,private usuarioService: UsuarioService) {
        this.afAuth.authState.subscribe((user) => {
            if (user) {
                this.userData = user;
                localStorage.setItem('user', JSON.stringify(this.userData));
                JSON.parse(localStorage.getItem('user')!);
            } else {
                localStorage.setItem('user', 'null');
                localStorage.setItem('usuario', 'null');
                JSON.parse(localStorage.getItem('user')!);
            }
        });
    }

    login(provider: any) {
        return this.afAuth
          .signInWithPopup(provider)
          .then((result) => {
            this.ngZone.run(() => {
              this.router.navigate(['/']);
            });
            this.SetUserData(result.user);
          })
          .catch((error) => {
            window.alert('Usuário não encontrado');
          });
    }

    usuarioLogado(): boolean {
        const user = JSON.parse(localStorage.getItem('user')!); //auth
        const usuario = JSON.parse(localStorage.getItem('usuario')!); //dados
        // return user !== null && user.emailVerified !== false && usuario !== null ? true : false;//TODO: uncomment
        return user !== null && usuario !== null ? true : false;
    }

    enviarEmailVerificacao(navegarVerificacao = true) {
        return this.afAuth.currentUser.then((u: any) => u.sendEmailVerification()).then(() => {
            if (navegarVerificacao)
            this.router.navigate(['verificar-email']);//TODO
        });
    }
    redefinirSenha(email:string) {
        return this.afAuth.sendPasswordResetEmail(email).then(res => {
            window.alert('E-mail de recuperação enviado.');
        }).catch(error => {
            // window.alert(error.message);
            window.alert('E-mail invalido.');
        });
    }

    signUp(email: string, password: string, navegarVerificacao = true) {
        return this.afAuth.createUserWithEmailAndPassword(email, password).then((result) => {
            this.SetUserData(result.user);
            return this.enviarEmailVerificacao(navegarVerificacao);
        }).catch((error) => {
            window.alert(error.message);
        });
    }
    criarUsuario(email: string, password: string) {
        return this.afAuth.currentUser.then((u:any) => {
            let original = u;
            return this.afAuth.createUserWithEmailAndPassword(email, password).then((result) => {
                this.SetUserData(result.user);
                return this.enviarEmailVerificacao(false).then(() => {
                    this.afAuth.updateCurrentUser(original);
                });
            }).catch((error) => {
                window.alert(error.message);
            });
        });
    } 

    signIn(email: string, password: string) {
        return this.afAuth.signInWithEmailAndPassword(email, password).then((result) => {
            this.ngZone.run(() => {
                this.usuarioService.obterUsuarioPorEmail(email).then(res => {
                    localStorage.setItem('usuario', JSON.stringify(res));
                    window.location.reload();
                });
            });
            // this.SetUserData(result.user);
          }).catch((error) => {
            // window.alert(error.message);
            window.alert('Usuário não encontrado');
        });
    }

    SetUserData(user: any) {
        console.log(user);
        // const userRef: AngularFirestoreDocument<any> = this.afs.doc(
        //   `users/${user.uid}`
        // );
        // const userData: User = {
        //   uid: user.uid,
        //   email: user.email,
        //   displayName: user.displayName,
        //   photoURL: user.photoURL,
        //   emailVerified: user.emailVerified,
        // };
        // return userRef.set(userData, {
        //   merge: true,
        // });
    }
    obterDadosUsuario() {
        let data = localStorage.getItem('usuario')
        console.log(data)
        if(data)
            return JSON.parse(data);
        return null;
    }
      
    SignOut() {
        return this.afAuth.signOut().then(() => {
            localStorage.removeItem('user');
            localStorage.removeItem('usuario');
            this.router.navigate(['login']);
        });
    }
}
  