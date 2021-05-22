export const validateEmail = (email) => {
  var pattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  )
  if (!pattern.test(email)) {
    return false
  } else {
    return true
  }
}

export const validateCPF = (cpf) => {
  let Soma
  let Resto
  let valido = true
  Soma = 0
  if (cpf == '000.000.000-00') valido = false

  const cpfOnlyNumbers = cpf.replace('.', '').replace('.', '').replace('-', '')

  for (let i = 1; i <= 9; i++)
    Soma = Soma + parseInt(cpfOnlyNumbers.substring(i - 1, i)) * (11 - i)
  Resto = (Soma * 10) % 11

  if (Resto == 10 || Resto == 11) Resto = 0
  if (Resto != parseInt(cpfOnlyNumbers.substring(9, 10))) valido = false

  Soma = 0
  for (let i = 1; i <= 10; i++)
    Soma = Soma + parseInt(cpfOnlyNumbers.substring(i - 1, i)) * (12 - i)
  Resto = (Soma * 10) % 11

  if (Resto == 10 || Resto == 11) Resto = 0
  if (Resto != parseInt(cpfOnlyNumbers.substring(10, 11))) valido = false

  return valido
}
