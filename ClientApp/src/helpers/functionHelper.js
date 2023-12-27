export function getFormData(object, previewImages) {
    const formData = new FormData();
    
    Object.keys(object).forEach(key => {
      if(typeof object[key] !== "object"){
        formData.append(key, object[key])
      }
    });

    for(const image of previewImages){
      formData.append('UserImages', image)
    }

    return formData;
}

export function notify(Store, isSuccess, message) {
  if(isSuccess){
    notifySuccess(Store, message)
  }
  else{
    notifyFail(Store, message)
  }
}

function notifySuccess(Store, message) {
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

function notifyFail(Store, message){
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