
export const FormatStringToDate = (dateCreated: string): string => {
  const date = new Date(dateCreated);
  const dia = date.getDate();
  const mes = date.getMonth() + 1;
  const ano = date.getFullYear();
  const hora = date.getHours();
  const minutos = date.getMinutes();
  
  return  `${dia}/${mes}/${ano} ${hora}:${minutos}`
}

export const FormatDateToString = () => {
  const dataAtual = new Date();
  const dia = dataAtual.getDate().toString().length === 1 ? `0${dataAtual.getDate()}` : dataAtual.getDate();
  const mes = dataAtual.getMonth() + 1;
  const ano = dataAtual.getFullYear();
  const hora = dataAtual.getHours().toString().length === 1 ? `0${dataAtual.getHours()}` : dataAtual.getHours();
  const minutos = dataAtual.getMinutes().toString().length === 1 ? `0${dataAtual.getMinutes()}` : dataAtual.getMinutes();
  const segundos = dataAtual.getSeconds().toString().length === 1 ? `0${dataAtual.getSeconds()}` : dataAtual.getSeconds();

  return `${ano}-${mes}-${dia}T${hora}:${minutos}:${segundos}.000+00:00`;
}