import Swal from 'sweetalert2'

export const alertError = (text) => {
  Swal.fire({
    icon: 'error',
    text: text,
    showClass: {
      popup: 'animate__animated animate__fadeInDown',
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp',
    },
  })
}

export const alertSuccess = (text) => {
  Swal.fire({
    icon: 'success',
    text: text,
    showClass: {
      popup: 'animate__animated animate__fadeInDown',
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp',
    },
  })
}

export const alertInfo = (text) => {
  Swal.fire({
    icon: 'info',
    text: text,
    showClass: {
      popup: 'animate__animated animate__fadeInDown',
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp',
    },
  })
}
