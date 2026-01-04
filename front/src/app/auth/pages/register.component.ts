import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngxs/store';
import { Register, AuthState } from '../state/auth.store';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, AsyncPipe],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h2>Créer un compte</h2>
          <p>Rejoignez-nous dès maintenant</p>
        </div>

        @if (error$ | async; as error) {
          <div class="error-message">
            {{ error }}
          </div>
        }

        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
          <div class="form-row">
            <div class="form-group">
              <label for="nom">Nom *</label>
              <input 
                id="nom" 
                type="text" 
                formControlName="nom"
                placeholder="Votre nom"
                [class.invalid]="registerForm.get('nom')?.invalid && registerForm.get('nom')?.touched"
              />
              @if (registerForm.get('nom')?.invalid && registerForm.get('nom')?.touched) {
                <div class="error">Le nom est requis</div>
              }
            </div>

            <div class="form-group">
              <label for="prenom">Prénom *</label>
              <input 
                id="prenom" 
                type="text" 
                formControlName="prenom"
                placeholder="Votre prénom"
                [class.invalid]="registerForm.get('prenom')?.invalid && registerForm.get('prenom')?.touched"
              />
              @if (registerForm.get('prenom')?.invalid && registerForm.get('prenom')?.touched) {
                <div class="error">Le prénom est requis</div>
              }
            </div>
          </div>

          <div class="form-group">
            <label for="login">Login *</label>
            <input 
              id="login" 
              type="text" 
              formControlName="login"
              placeholder="Choisissez un login (lettres et chiffres, max 20)"
              [class.invalid]="registerForm.get('login')?.invalid && registerForm.get('login')?.touched"
            />
            @if (registerForm.get('login')?.invalid && registerForm.get('login')?.touched) {
              <div class="error">
                @if (registerForm.get('login')?.errors?.['required']) {
                  Le login est requis
                }
                @if (registerForm.get('login')?.errors?.['pattern']) {
                  Le login doit contenir uniquement des lettres et chiffres (max 20 caractères)
                }
              </div>
            }
          </div>

          <div class="form-group">
            <label for="pass">Mot de passe *</label>
            <input 
              id="pass" 
              type="password" 
              formControlName="pass"
              placeholder="Choisissez un mot de passe (min 4 caractères)"
              [class.invalid]="registerForm.get('pass')?.invalid && registerForm.get('pass')?.touched"
            />
            @if (registerForm.get('pass')?.invalid && registerForm.get('pass')?.touched) {
              <div class="error">
                @if (registerForm.get('pass')?.errors?.['required']) {
                  Le mot de passe est requis
                }
                @if (registerForm.get('pass')?.errors?.['minlength']) {
                  Le mot de passe doit contenir au moins 4 caractères
                }
                @if (registerForm.get('pass')?.errors?.['pattern']) {
                  Le mot de passe doit contenir uniquement des lettres et chiffres
                }
              </div>
            }
          </div>

          <div class="form-group">
            <label for="confirmPass">Confirmer le mot de passe *</label>
            <input 
              id="confirmPass" 
              type="password" 
              formControlName="confirmPass"
              placeholder="Confirmez votre mot de passe"
              [class.invalid]="registerForm.get('confirmPass')?.invalid && registerForm.get('confirmPass')?.touched"
            />
            @if (registerForm.get('confirmPass')?.invalid && registerForm.get('confirmPass')?.touched) {
              <div class="error">
                @if (registerForm.get('confirmPass')?.errors?.['required']) {
                  Veuillez confirmer le mot de passe
                }
              </div>
            }
            @if (registerForm.errors?.['passwordMismatch'] && registerForm.get('confirmPass')?.touched) {
              <div class="error">Les mots de passe ne correspondent pas</div>
            }
          </div>

          <button 
            type="submit" 
            [disabled]="registerForm.invalid || (loading$ | async)"
            class="btn-primary"
          >
            @if (loading$ | async) {
              Création en cours...
            } @else {
              Créer mon compte
            }
          </button>
        </form>

        <div class="auth-footer">
          <p>
            Vous avez déjà un compte ? 
            <a routerLink="/login" class="link">Se connecter</a>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      min-height: calc(100vh - 200px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .auth-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
      padding: 3rem;
      max-width: 550px;
      width: 100%;
    }

    .auth-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .auth-header h2 {
      margin: 0 0 0.5rem 0;
      color: #333;
      font-size: 2rem;
    }

    .auth-header p {
      margin: 0;
      color: #666;
      font-size: 1rem;
    }

    .error-message {
      background-color: #fee;
      color: #c33;
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 1.5rem;
      text-align: center;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #555;
    }

    input {
      width: 100%;
      padding: 0.875rem;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.2s;
      box-sizing: border-box;
    }

    input:focus {
      outline: none;
      border-color: #667eea;
    }

    input.invalid {
      border-color: #c33;
    }

    .error {
      color: #c33;
      font-size: 0.875rem;
      margin-top: 0.5rem;
    }

    .btn-primary {
      width: 100%;
      padding: 1rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s;
      margin-top: 1rem;
    }

    .btn-primary:hover:not(:disabled) {
      transform: translateY(-2px);
    }

    .btn-primary:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }

    .auth-footer {
      margin-top: 2rem;
      text-align: center;
      color: #666;
    }

    .auth-footer p {
      margin: 0;
    }

    .link {
      color: #667eea;
      text-decoration: none;
      font-weight: 600;
    }

    .link:hover {
      text-decoration: underline;
    }
  `]
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly store = inject(Store);

  readonly error$ = this.store.select(AuthState.error);
  readonly loading$ = this.store.select(AuthState.loading);

  readonly registerForm = this.fb.nonNullable.group({
    nom: ['', [Validators.required]],
    prenom: ['', [Validators.required]],
    login: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9]{1,20}$/)]],
    pass: ['', [Validators.required, Validators.minLength(4), Validators.pattern(/^[A-Za-z0-9]+$/)]],
    confirmPass: ['', [Validators.required]]
  }, {
    validators: this.passwordMatchValidator
  });

  passwordMatchValidator(form: any) {
    const pass = form.get('pass')?.value;
    const confirmPass = form.get('confirmPass')?.value;
    
    if (pass !== confirmPass) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    const { nom, prenom, login, pass } = this.registerForm.getRawValue();
    
    this.store.dispatch(new Register(nom, prenom, login, pass)).subscribe(() => {
      const isAuthenticated = this.store.selectSnapshot(AuthState.isAuthenticated);
      if (isAuthenticated) {
        this.router.navigate(['/pollutions']);
      }
    });
  }
}
