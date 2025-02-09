document.querySelector('.form').addEventListener('submit', function (event) {
  event.preventDefault();

  const delay = parseInt(event.target.delay.value);
  const state = event.target.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  //   promise
  //     .then(delay => {
  //       iziToast.success({
  //         title: 'Fulfilled',
  //         message: `Promise in ${delay}ms`,
  //         position: 'center',
  //         color: 'green',
  //         icon: 'icon-check',
  //       });
  //     })
  //     .catch(delay => {
  //       iziToast.error({
  //         title: 'Rejected',
  //         message: `Promise in ${delay}ms`,
  //         position: 'center',
  //         color: 'red',
  //         icon: 'icon-cancel',
  //       });
  //     });
  promise
    .then(delay => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });
  form.delay.value = '';
});
