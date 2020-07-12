// Validate CPF
export const cpfValidator = (cpf: string): boolean => {
  let numbers, digits, sum, i, result, equal_digits;
  equal_digits = 1;

  if (cpf.length < 11) return false;

  for (i = 0; i < cpf.length - 1; i++)
    if (cpf.charAt(i) != cpf.charAt(i + 1)) {
      equal_digits = 0;
      break;
    }

  if (!equal_digits) {
    numbers = cpf.substring(0, 9);
    digits = cpf.substring(9);
    sum = 0;

    for (i = 10; i > 1; i--) sum += numbers.charAt(10 - i) * i;
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

    if (result != digits.charAt(0)) return false;

    numbers = cpf.substring(0, 10);
    sum = 0;

    for (i = 11; i > 1; i--) sum += numbers.charAt(11 - i) * i;
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

    if (result != digits.charAt(1)) return false;
    return true;
  } else return false;
};

// CPF and CNPJ mask
export const cpfCnpjMask = (v: string): string => {
  //Remove tudo o que não é dígito
  v = v.replace(/\D/g, "");

  if (v.length < 14) {
    //CPF

    //Coloca um ponto entre o terceiro e o quarto dígitos
    v = v.replace(/(\d{3})(\d)/, "$1.$2");

    //Coloca um ponto entre o terceiro e o quarto dígitos
    //de novo (para o segundo bloco de números)
    v = v.replace(/(\d{3})(\d)/, "$1.$2");

    //Coloca um hífen entre o terceiro e o quarto dígitos
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  } else {
    //CNPJ

    //Coloca ponto entre o segundo e o terceiro dígitos
    v = v.replace(/^(\d{2})(\d)/, "$1.$2");

    //Coloca ponto entre o quinto e o sexto dígitos
    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");

    //Coloca uma barra entre o oitavo e o nono dígitos
    v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");

    //Coloca um hífen depois do bloco de quatro dígitos
    v = v.replace(/(\d{4})(\d)/, "$1-$2");
  }

  return v;
};

// Clear CPF mask
export const clearCpfMask = (cpf: string): string => {
  return cpf.replace(/\D/g, "");
};

export const telephoneValidator = (telephone: string): boolean => {
  const regex = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;
  let isValid = regex.test(telephone);
  return isValid;
};

export const cellphoneMask = (v: string): string => {
  v = v.replace(/\D/g, ""); //Remove tudo o que não é dígito
  v = v.replace(/^(\d{2})(\d)/g, "($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
  v = v.replace(/(\d)(\d{4})$/, "$1-$2"); //Coloca hífen entre o quarto e o quinto dígitos

  return v;
};

export const cellphoneUnmask = (v: string): string => {
  v = v.replace(/\D/g, "");

  return v;
};
