import { FormControl } from '@angular/forms';
import {
  emailValidators,
  passwordValidators,
  stringValidators,
  yearValidators,
  ethereumPublicAddressValidators,
  ethereumPrivateAddressValidators,
  ethereumMnemonicValidators
} from './validators/validators';

/* Checks if input is a valid email */
export class EmailControl extends FormControl{
  constructor (value : string = '', disabled : boolean = false, validators? : any[]) {
    super({ value, disabled }, validators !== undefined ? validators : emailValidators);
  }
}

/* Checks if input is a valid password */
export class PasswordControl extends FormControl{
  constructor (value : string = '', disabled : boolean = false, validators? : any[]) {
    super({ value, disabled }, validators !== undefined ? validators : passwordValidators);
  }
}

/* Checks if input is a valid Ethereum private key */
export class EthereumPrivateKeyControl extends FormControl{
  constructor (value : string = '', disabled : boolean = false, validators? : any[]) {
    super({ value, disabled }, validators !== undefined ? validators : ethereumPrivateAddressValidators);
  }
}

/* Checks if input is a valid Ethereum public key */
export class EthereumPublicKeyControl extends FormControl{
  constructor (value : string = '', disabled : boolean = false, validators? : any[]) {
    super({ value, disabled }, validators !== undefined ? validators : ethereumPublicAddressValidators);
  }
}

/* Checks if input is a valid Ethereum Mnemonic */
export class EthereumMnemonicControl extends FormControl{
  constructor (value : string = '', disabled : boolean = false, validators? : any[]) {
    super({ value, disabled }, validators !== undefined ? validators : ethereumMnemonicValidators);
  }
}

/* Checks if input is a valid string */
export class StringControl extends FormControl{
  constructor (value : string = '', disabled : boolean = false, validators? : any[]) {
    super({ value, disabled }, validators !== undefined ? validators : stringValidators);
  }
}

/* Checks if input is a valid year */
export class YearControl extends FormControl{
  constructor (value : string = '', disabled : boolean = false, validators? : any[]) {
    super({ value, disabled }, validators !== undefined ? validators : yearValidators);
  }
}
