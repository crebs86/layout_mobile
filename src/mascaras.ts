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
    let _vp = 0
    v = valor.target.value.replace(/[^0-9]/g, '')
    _vp = parseInt(v) % 10 == 0 ? parseInt(v) : parseInt(v) / 10
    v = !isNaN(_vp) ? _vp.toString() : '0'
  }

  //console.log(v, v.length)
  return v
}

export default mascara
