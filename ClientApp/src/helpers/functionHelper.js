export function getFormData(object) {
    const formData = new FormData();
    
    Object.keys(object).forEach(key => {
        if(Array.isArray(object[key])){
          for(let i = 0; i < object[key].length; i++) {
            formData.append(`${key}`, object[key][i])
          }
        }
        else {
            formData.append(key, object[key])
        }
     
    });

    return formData;
}

export function notifySuccess(Store, message) {
    Store.addNotification({
        title: 'Success',
        message: message,
        type: 'success',
        insert: 'top',
        container: 'top-right',
        animationIn: ['animated', 'fadeIn'],
        animationOut: ['animated', 'fadeOut'],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      })
}

export function notifyFail(Store, message){
    Store.addNotification({
        title: 'Fail',
        message: message,
        type: 'danger',
        insert: 'top',
        container: 'top-right',
        animationIn: ['animated', 'fadeIn'],
        animationOut: ['animated', 'fadeOut'],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      })
}