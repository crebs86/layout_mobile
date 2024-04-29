import Vmasker from 'vanilla-masker'

const mascara = (valor: any) => {
  //console.log(valor, tipo)
  let v: string = ''
  const tipo: string = valor.target.getAttribute('data-tipo')

  if (tipo === 'telefone') {
    v = valor.target.value.replace(/[^0-9]/g, '')
    v = v.replace(/^(\d{2})(\d)/g, '($1)$2')

    if (v.length <= 13) {
      v = v.replace(/(\d)(\d{4})$/, '$1-$2')
    } else {
      v = v.replace(/(\d)(\d{5})$/, '$1-$2')
    }
  }

  if (tipo === 'peso') {
    v = valor.target.value.replace(/[^0-9]/g, '')
    let vv = Vmasker(valor.target).maskPattern('99.99')

    console.log(vv, 'vv')
  }

  console.log(v, v.length)
  return v
}

export default mascara
